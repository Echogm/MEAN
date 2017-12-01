const express = require("express");
const session = require('express-session');
const app = express();

app.use(session({secret: 'imsupersecret'}));
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    res.render('index', {title: "my Express project"});
});

// app.get("/users", function (request, response){
//     // hard-coded user data
//     var users_array = [
//         {name: "Michael", email: "michael@codingdojo.com"},
//         {name: "Jay", email: "jay@codingdojo.com"},
//         {name: "Brendan", email: "brendan@codingdojo.com"},
//         {name: "Andrew", email: "andrew@codingdojo.com"}
//     ];
//     response.render('users', {users: users_array});
// })
app.post('/users', function (req, res){
    // set the name property of session.
    req.session.name = req.body.name;
    console.log(req.session.name);
    //code to add user to db goes here!
    // redirect the user back to the root route.
    res.redirect('/');
});

app.post('/new', function(req, res){
    // code to add user to db here!
    res.redirect('/')
});
app.listen(8880, function(){
    console.log("Listening on 8880");
});
console.log(__dirname);
