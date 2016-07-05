//Module Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var app = express();
var PORT = 3000;
var orm = require('./config/orm.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// =============ROUTES===============
app.get('/', function(req,res) {
  orm.selectAll('burgers', callback);
  function callback(data) {
    console.log(data)
    //Check if burger is devoured
    data.forEach(function(value,index) {
      if (value.devoured === 1) {
        console.log('ate')
      }
    })
    res.render('index', {sent: data});
  }
})
app.post('/create', function(req,res) {
  console.log(req.body);
  var insertBurger = req.body.burger_name;
  orm.insertOne('burgers', insertBurger, true, callback);
  function callback(data) {
    console.log(data);
    res.redirect('/');
  }
})

app.delete('/delete', function(req,res) {
  console.log(req.body);
  var deleteId = req.body.id;

  orm.deleteOne('burgers', deleteId, callback)
  function callback(data) {
    console.log(data)
    res.redirect('/')
  }

})
//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT);
});