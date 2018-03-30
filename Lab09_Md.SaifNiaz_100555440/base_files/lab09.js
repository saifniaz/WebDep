var express = require('express')
var app = express()
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('view engine', 'pug');

var usernames = ['admin', 'bsmith', 'rfortier'];

function nameExist(toFind){
    for(var i = 0; i < usernames.length; i++){
        if(usernames[i] == toFind){
            return true;
        }
    }
    return false;
}

app.get('/', function (req, res) {
  res.render('enterUsername', {title: 'Lab 09', message: 'Please enter a username to check'})
});

app.get('/checkUsername', function (req, res) {
  res.render('enterUsername', {title: 'Lab 09', message: 'Please enter a username to check'})
});

app.post('/checkUsername', function(req, res){
    var uname = req.body.username;
    if(nameExist(uname)){
        res.render('enterUsername', {message: 'This username already exists. Please try another.'})
    }else{
        res.render('enterUsername', {message: 'That username is available.'})
    }
});

app.post('/', function(req, res){
    var uname = req.body.username;
    if(nameExist(uname)){
        res.render('enterUsername', {message: 'This username already exists. Please try another.'})
    }else{
        res.render('enterUsername', {message: 'That username is available.'})
    }
});
  
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});