var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/');

var Schema = mongoose.Schema;

var userSchema = new Schema({
        Username: String,
        Password: String
}, {collection: 'user'});

var User = mongoose.model('user', userSchema);


app.get('/', function (req, res) {
  res.render('enterUsername', {title: 'Lab 10', message: 'Please enter a username to check'})
});

app.get('/checkUsername', function (req, res) {
  res.render('enterUsername', {title: 'Lab 10', message: 'Please enter a username to check'})
});

app.post('/checkUsername', function(req, res){
    var uname = req.body.username;
    User.find({Username: uname}).then(function(result){
        if(result.length > 0){
            res.render('enterUsername', {title: 'Lab 10', message: 'This username already exists. Please try another.'})
        }else{
            res.render('enterUsername', {title: 'Lab 10', message: 'That username is available.'})
        }
    });
});

app.post('/', function(req, res){
    var uname = req.body.username;
    User.find({Username: uname}).then(function(result){
        if(result.length > 0){
            res.render('enterUsername', {title: 'Lab 10', message: 'This username already exists. Please try another.'})
        }else{
            res.render('enterUsername', {title: 'Lab 10', message: 'That username is available.'})
        }
    });
});
  
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});