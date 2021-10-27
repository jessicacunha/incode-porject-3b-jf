var express = require("express");
var app = express();
var data = require("./data");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
var crypto = require('crypto');

//Loads the handlebars module
const handlebars = require('express-handlebars');
//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({
  layoutsDir: __dirname + '/views/layouts',
}));


app.get('/', (req, res) => {
  res.render('hp', {layout: 'index'})
})

app.get('/users', (req, res) => {
  let usersData = data.users
  res.render('users', {layout: 'index', usersData})
})

app.get('/schedules', (req, res) => {
  res.render('schedules', {layout: 'index'})
})

app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  if (data.users[id]) {
    let usersData = data.users[id]
    res.render('user', {layout: 'index', usersData})
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

app.post('/schedules', (req, res) => {
  let scheduleObject = {
      user_id: req.body.user_id, 
      day: req.body.day, 
      start_at: req.body.start_at, 
      end_at: req.body.end_at
  }
  data.schedules.push(scheduleObject)
  res.send(scheduleObject)
})

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