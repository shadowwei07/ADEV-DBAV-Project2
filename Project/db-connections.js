//import the mysql12 library
var mysql= require('mysql2');

//Create connnection to the database
var connection = mysql.createConnection({
	host:'localhost',
	port:'3306',
	user:'root',
	password:'adev',
	database: 'vending_machine'
});

connection.connect(err =>{
	if(err) throw err;
	console.log("connected to DB");
});

module.exports = connection;


