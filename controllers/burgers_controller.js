var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var orm = require('../config/orm.js');
var app = express();

module.exports = function(app) {
	
	app.get('/', function(req,res) {
	  orm.selectAll('burgers', callback);
	  function callback(data) {
	    console.log(data)
	    res.render('index', {sent: data,
	      helpers: {
	        Eaten: function(burger) {
	        if (burger.devoured === 1) {
	          return burger.id + ": " + burger.burger_name;
	        }
	        },
	        notEaten: function(burger) {
	          if (burger.devoured === 0) {
	            return burger.id + ": " + burger.burger_name;
	          }
	        }
	      }
	    });
	  }
	})
	app.post('/create', function(req,res) {
	  console.log(req.body);
	  var insertBurger = req.body.burger_name;
	  orm.insertOne('burgers', insertBurger, false, callback);
	  function callback(data) {
	    console.log(data);
	    res.redirect('/');
	  }
	})

	app.put('/update', function(req,res) {
	  console.log(req.body);
	  var updateId = req.body.id;

	  orm.updateOne('burgers', updateId, callback)
	  function callback(data) {
	    console.log(data)
	    res.redirect('/')
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
}