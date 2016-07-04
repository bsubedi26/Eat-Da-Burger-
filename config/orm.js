var connection = require('./connection.js');

//Object relational Mapper
var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = 'SELECT * FROM ' + tableInput;
        connection.query(queryString, function(err, result) {
            cb(result);
        });
    },
    insertOne: function(tableInput, nameInput, devourInput, cb) {
        var queryString = 'INSERT INTO ' + tableInput + ' SET ?' 
        connection.query(queryString, {burger_name: nameInput, devoured: devourInput}, function(err, result) {
            cb(result);
        });
    },
    updateOne: function(tableInput, nameInput, idInput, cb) {
        var queryString = 'UPDATE ' + tableInput + ' SET ? WHERE ?'
        connection.query(queryString, [{burger_name: nameInput}, {id: idInput}], function(err, result) {
            cb(result);
        });
    }
};

module.exports = orm;