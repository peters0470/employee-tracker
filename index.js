const inquirer= require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

var connection = mysql.createConnection({
    host: "localhost", 
    port: 3306,
    user: "root",
    password: "Snicker13@",
    database: "employees".db
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("\n WELCOME TO EMPLOYEE TRACKER \n");
    
  });



  
  