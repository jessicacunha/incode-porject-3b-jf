var express = require("express");
var app = express();
var data = require("./data");
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var crypto = require('crypto');
var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home',{layout: false});
});


app.get("/", (req, res) => {
  res.send("Welcome to our schedule website");
});

app.get("/users", (req, res) => {
  res.send(data.users);
});

app.get("/schedules", (req, res) => {
  res.send(data.schedules);
});

app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  if (data.users[id]) {
    res.json(data.users[id]);
  } else {
    res.json("Unknown");
  }
});

app.get("/users/:userId/schedules", (req, res) => {
  let newSchedules = data.schedules.filter((obj) => {
    return req.params.userId == obj.user_id;
  });
  console.log(newSchedules);
  res.send(newSchedules);
});

app.post("/users", (req, res) => {
 
  var hash = crypto.createHash('sha256').update(req.body.password).digest('base64');
  var newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hash
  };
  data.users.push(newUser);
  res.send(newUser);

});

app.listen(3000, function () { });


