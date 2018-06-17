var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var PORT =  process.env.PORT || 5000;
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines"; 
var exphbs = require('express-handlebars');
var router = express.Router();
// var path = require("path");
var logger = require("morgan");
// var request = require("request");
// var cheerio = require ("cheerio");
// let results = [];
// var Note = require('./models/Note.js');
// var Article = require('./models/Article.js');

app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

app.use(logger("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

require("./config/routes")(router);

mongoose.connect(db, function(error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("mongoose connection successful!")
  }
});

app.listen(PORT, function() {
  console.log("App listening on http://localhost:" + PORT);
});




















// app.get("/", function(req, res){
//   res.render("main", {results})
// });

// app.get("/scrape", function(req, res){ 
//   results = [];
//   request('https://news.ycombinator.com', function (error, response, html){
//   if(!error && response.statusCode == 200) {
//     var $ = cheerio.load(html);
//     $('span.comhead').each(function(i, element){
//       var articles = {};
//       var a = $(this).prev();
//       articles.title = a.text();
//       articles.url = a.attr('href');
//       var subtext = a.parent().parent().next().children('.subtext').children();
//       articles.time = $(subtext).eq(2).text();
//       articles.author = $(subtext).eq(1).text();
//       var metadata = {
//         title: articles.title,
//         url: articles.url,
//         time: "posted: " + articles.time,
//         author: "by " + articles.author
//       }
//       // var domain =$(this).children(".domain").text();
//       results.push(articles);
//       var entry = new Article (articles);
//       entry.save(function(err, doc) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(doc)
//         }
//       });
//       res.redirect('/');
//       // db.Article.create(metadata)
//       //   .then(function(dbArticle){
//       //     console.log('-------------My db Article',dbArticle)
//       //     // articleArray.push(dbArticle);
//       //     // res.render("mainPage", results);
//       //     console.log("Scraping articles..."); // <----------------------------
//       //   })
//       //   .catch(function(err){
//       //     console.log(err);
//       //     return res.json(err);
//       //   });
//     // console.log(Article);
//     // results.push(articles);
//     });
//     res.render("main", {results} );
//     console.log("SCRAPE COMPLETE");
   
//   }
// });
// // var dbArticle = db.Article;
// // res.render("article", dbArticle );
// res.render("main")
// });
// app.get("/articles", function(req, res) {
//   db.Article.find({})
//     .then(function(dbArticle) {
//       res.render("main", dbArticle )
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });
// app.post("/articles/:id", function(req, res) {
//   db.Note.create(req.body)
//     .then(function(dbNote) {
      
//       return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//     })
//     .then(function(dbArticle) {
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });

// // app.get("/", function (req, res){
// //   res.render
// // });

// app.post('/scrape', function(req, res) {
//   Article.find().sort({_id: -1})
//       .exec(function(err, doc) {
//           if(err){
//               console.log(err);
//           } else{
//               var artToDom = {article: doc};
//               res.render('main', artToDom);
//           }
//   });
// });



