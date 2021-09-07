const inquirer = require("inquirer")
const mysql = require("mysql2")
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "tracker"
})

connection.connection(function(error){
    if (error){
        console.log(error)
    }
    displayMenu()
})
// , , , , , , and 
function displayMenu () {
   inquirer.prompt([{
       type: "list",
       message: "Choose the Following",
       choices: ["view all departments", "view all roles","view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
       name: "selection"
  
    }])
}