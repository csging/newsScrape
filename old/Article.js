var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// app.get("/scrape", function(req, res){ 
//   request('https://news.ycombinator.com', function (error, response, html){
//     if(!error && response.statusCode == 200) {
//       var $ = cheerio.load(html);
//       var results = [];
//       $('span.comhead').each(function(i, element){
//         var a = $(this).prev();
//         results.title = a.text();
//         results.url = a.attr('href');
//         var subtext = a.parent().parent().next().children('.subtext').children();
//         results.time = $(subtext).eq(2).text();
//         results.author = $(subtext).eq(1).text();
//         var metadata = {
//           title: results.title,
//           url: results.url,
//           time: "posted: " + results.time,
//           author: "by " + results.author
//         }
//         db.Article.create(metadata)
//           .then(function(dbArticle){
//             return dbArticle; // <----------------------------
//           })
//           .catch(function(err){
//             return res.json(err);
//           });
//       // console.log(Article);
//       });
//       console.log("SCRAPE COMPLETE");
//     }
//   });
//   });


var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Article = mongoose.model("Article", ArticleSchema);

// var source = $("articles").html();
// var template = Handlebars.compile(source);

// $("#main").html(articles(dbArticle));

module.exports = Article;
