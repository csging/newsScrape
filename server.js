var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require ("cheerio");

var PORT =  process.env.PORT || 3000;
var db = require("./models");

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: "main"}));

app.set('view engine', 'handlebars');
app.use(logger("dev"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/scrapedNews");

app.get("/", function(req, res){ 
request('https://news.ycombinator.com', function (error, response, html){
  if(!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var results = [];
    $('span.comhead').each(function(i, element){
      
      var articles = {};
      var a = $(this).prev();
      articles.title = a.text();
      articles.url = a.attr('href');
      var subtext = a.parent().parent().next().children('.subtext').children();
      articles.time = $(subtext).eq(2).text();
      articles.author = $(subtext).eq(1).text();
      var metadata = {
        title: articles.title,
        url: articles.url,
        time: "posted: " + articles.time,
        author: "by " + articles.author
      }
      
      db.Article.create(metadata)
        .then(function(dbArticle){
          res.render("main", dbArticle )
          console.log("Scraping articles..."); // <----------------------------
        })
        .catch(function(err){
          return res.json(err);
        });
    // console.log(Article);
    // results.push(articles);
    });
    console.log("SCRAPE COMPLETE");
  }
//  res.render("main", articles )
});
// var dbArticle = db.Article;
// res.render("article", dbArticle );
});

app.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.render("articles", dbArticle )
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {
  db.Note.create(req.body)
    .then(function(dbNote) {
      
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// app.get("/", function (req, res){
//   res.render
// });


app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });