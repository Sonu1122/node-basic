var fs = require('fs');
var express = require('express');
var app = express();
var body = require('body-parser');
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded());

app.get('/', function(req, res) {
  res.render(__dirname + '/views/home.ejs');
});

app.get('/signup', function(req, res) {
  res.render(__dirname + '/views/signup.ejs');
});

app.get('/about', function(req, res) {
  res.render(__dirname + '/views/about.ejs');
});

app.post('/signup', function(req, res) {
  var fullname = req.body.fullname;
  var email = req.body.email;
  var password = req.body.password;
  var dataFetch = { name: fullname, email: email, password: password };
  var obj = {};
  obj.userData = [];
  fs.readFile('user.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      if (data != '') {
        obj = JSON.parse(data);
      }
      console.log(obj);
      obj.userData.push(dataFetch);
      var json = JSON.stringify(obj);
      fs.writeFile('user.json', json, 'utf8', function() {
        console.log(json);
        res.render(__dirname + '/views/signup.ejs');
      });
    }
  });
});

app.get('/login', function(req, res) {
  res.render(__dirname + '/views/login.ejs');
});

app.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  fs.readFile('user.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      if (data != '') {
        obj = JSON.parse(data);
        login = false;
        for (var i = 0; i < obj.userData.length; i++) {
          var userData = obj.userData[i];
          if (userData.email == email && userData.password == password) {
            login = true;
            break;
          }
        }
        if (login == true) {
          res.render(__dirname + '/views/profile.ejs', { name: userData.name });
        } else {
          res.render(__dirname + '/views/login.ejs');
        }
      } else {
        res.render(__dirname + '/views/login.ejs');
      }
    }
  });
});

app.get('/logout', function(req, res) {
  res.render(__dirname + '/views/home.ejs');
});

app.listen(3500, '127.0.0.1');
console.log('listening to port 3000');
