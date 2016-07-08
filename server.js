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

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

//Burger controller routes
require('./controllers/burgers_controller.js')(app);

app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT);
});