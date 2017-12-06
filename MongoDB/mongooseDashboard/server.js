var express = require('express')
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/mongoose_dashboard');
var AnimalSchema = new mongoose.Schema({
    name: String,
    animal: String,
    species: String,
    numberOfLegs: Number
}, {timestamps: true});
mongoose.model('Animal', AnimalSchema);
var Animal = mongoose.model('Animal');
mongoose.Promise = global.Promise;

app.get('/', function (req, res) {
    Animal.find({}, function (err, animals) {
        res.render('index', {animals: animals});
    })
});

app.get('/mongoose/new', function (req, res) {
    res.render('form')
})

app.post('/mongoose/new', function (req, res) {
    console.log("POST DATA", req.body);
    var animal = new Animal({ name: req.body.name, animal: req.body.animal, species: req.body.species, numberOfLegs: req.body.numberOfLegs});
    animal.save(function (err) {
        if (err) {
            console.log('Something went wrong!');
        }else {
            console.log('Successfully added an animal!');
            res.redirect('/')
        }
    });
});

app.get('/mongoose/:id', function(req, res){
    Animal.find({_id:req.params.id}, function (err, animals) {
        console.log(req.params.id);
        res.render('animal', {animals: animals})
    });
});

app.get('/mongoose/edit/:id', function(req, res){
    Animal.find({_id: req.params.id}, function(err, animals){
        console.log(req.params.id);
        res.render('modanimal', {animals: animals})
    });
});

app.post('/mongoose/edit', function(req, res){
    console.log(`ID = ${req.body.id}`);
    Animal.update({_id: req.body.id },{name: req.body.name, animal: req.body.animal, species: req.body.species, numberOfLegs: req.body.numberOfLegs}, function(err){
        if(err){
            console.log(`This is the error: ${err}`);
        }else {
            res.redirect('/')
        }
    })
    // Animal.find({_id: req.body._id}, function(err, animal){
    //     console.log(animal);
    //     animal.name = req.body.name
    //     animal.animal = req.body.animal
    //     animal.species = req.body.species
    //     animal.numberOfLegs = req.body.numberOfLegs
    //     animal.save(function(err) {
    //         if (err) {
    //             console.log(err);
    //
    //         }else {
    //             res.redirect('/')
    //         }
    //     })
    //     // res.render('modanimal', {animals: animals})
    // });
});

app.listen(8000, function() {
    console.log("listening on port 8000");
});

// Query to update from console
// db.animals.updateOne({_id: ObjectId("objectId goes here")}, {type of action you wanna do here ->$set: {name of the key you wanna modify ->species: value you want to modify ->"Osito"}})
