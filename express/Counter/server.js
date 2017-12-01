// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
var ejs = require('ejs')
var session = require("express-session")

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'imasecret'}));

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if (!("counter" in req.session)) {
        req.session.counter = 1
        res.render("index", {counter: req.session.counter});
        return
    }
    if ("counter" in req.session) {
        req.session.counter += 1;
        res.render("index", {counter: req.session.counter});
        return
    };
});

app.post('/add', function(req, res) {
    if ("counter" in req.session)
        req.session.counter += 1;

        res.redirect('/');
})

app.post('/reset', function(req, res) {
    if ("counter" in req.session)
        req.session.counter = 0;

        res.redirect('/');
})

app.listen(8000, function() {
    console.log("listening on port 8000");
});
