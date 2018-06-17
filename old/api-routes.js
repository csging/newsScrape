// var request = require("request");
// var cheerio = require("cheerio");
// var Note = require("../models/Note.js");
// var Article = require("../models/Article.js");
// let articles = [];

// module.exports = function(app) {
//     app.get("/", function(req, res) {
//       res.render("main", { articles });
//     });

// app.get("/", function(req, res){ 
//     request('https://news.ycombinator.com', function (error, response, html){
//       if(!error && response.statusCode == 200) {
//         var $ = cheerio.load(html);
//         var results = [];
//         $('span.comhead').each(function(i, element){
//           var a = $(this).prev();
//           results.title = a.text();
//           results.url = a.attr('href');
//           var subtext = a.parent().parent().next().children('.subtext').children();
//           results.time = $(subtext).eq(2).text();
//           results.author = $(subtext).eq(1).text();
//           var metadata = {
//             title: results.title,
//             url: results.url,
//             time: "posted: " + results.time,
//             author: "by " + results.author
//           }
//           db.Article.create(metadata)
//             .then(function(dbArticle){
//               console.log(dbArticle); // <----------------------------
//             })
//             .catch(function(err){
//               return res.json(err);
//             });
//         // console.log(Article);
//         });
//         console.log("SCRAPE COMPLETE");
//       }
//     });
//     });
    
//     app.get("/articles", function(req, res) {
//       db.Article.find({})
//         .then(function(dbArticle) {
//           res.json(dbArticle);
//         })
//         .catch(function(err) {
//           res.json(err);
//         });
//     });
    
//     // Route for saving/updating an Article's associated Note
//     app.post("/articles/:id", function(req, res) {
//       // Create a new note and pass the req.body to the entry
//       db.Note.create(req.body)
//         .then(function(dbNote) {
//           // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
//           // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//           // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//           return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//         })
//         .then(function(dbArticle) {
//           res.json(dbArticle);
//         })
//         .catch(function(err) {
//           res.json(err);
//         });
//     });

//     };