var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({ extended: true}));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/quoting_dojo');
var QuoteSchema = new mongoose.Schema({
	name: String,
	quote: String
});

mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');
mongoose.Promise = global.Promise;

app.get('/', function(req, res) {
	res.render('index')

});

app.post('/new', function(req, res) {
	console.log("POST DATA", req.body);
	var quote = new Quote({name: req.body.name, quote: req.body.quote});
	quote.save(function(err){
		if (err) {
			console.log('Something went wrong!')
		}else {
			console.log('successfully added a user!')
			res.redirect('/quotes')
		}
	})
});

app.get('/quotes', function(req, res){
	Quote.find({},function(err, quotes){
		if (err) {
			console.log(err);
		}
		console.log(quotes);
		res.render('quotes', {quotes: quotes});
	})
});

app.listen(8000, function() {
	console.log("listening on port 8000");
});
