const init = require("connect-session-sequelize")
const inquirer = require("inquirer")
const mysql = require("mysql2")
require("console.table")
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "tracker"
})

connection.connect(function (error) {
    if (error) {
        console.log(error)
    }
    
})
// , , , , , , and 
function displayMenu() {
    inquirer.prompt([{
        type: "list",
        message: "Choose the Following",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee"],
        name: "selection"

    }])
        .then(response => {
            if (response.selection === "view all departments") {
                viewDepartments()
            }
            if (response.selection === "view all roles") {
                viewRoles()
            }
            if (response.selection === "view all employees") {
                viewEmployees()
            }
            if (response.selection === "add a department") {
                addDepartment()
            }
            if (response.selection === "add a role") {
                addRole()
            }
            if (response.selection === "add an employee") {
                addEmployee()
            }
            if (response.selection === "update an employee") {
                updateEmployee()
            }
        })
}

function viewDepartments() {
    connection.query("select * from department", function (error, data) {
        console.table(data)
        displayMenu()
    })
}

function viewRoles() {
    connection.query("select * from role", function (error, data) {
        console.table(data)
        displayMenu()
    })
}

function viewEmployees() {
    connection.query("select * from employee", function (error, data) {
        console.table(data)
        displayMenu()
    })
}

function addDepartment() {
    inquirer.prompt([{
        type: "input",
        message: "What is the new department name",
        name: "departmentName"
    }])
        .then(response => {
            connection.query("insert into department(name) values(?)", response.departmentName, function (error, data) {
                console.log("new department has been added")
                displayMenu()
            })
        })
}

function addRole() {
    inquirer.prompt([{
        type: "input",
        message: "What is the new role name",
        name: "newRole"
    },
    {
        type: "input",
        message: "What is the salary",
        name: "addSalary"
    },
    {
        type: "input",
        message: "What is the department id",
        name: "addId"
    }
    ]).then(response => {
        connection.query("insert into role(title,salary,department_id) values(?,?,?)", [response.newRole, response.addSalary, response.addId], function (error, data) {
            console.log("new role added")
            displayMenu()
        })
    })
}


function addEmployee() {
    inquirer.prompt([{
        type: "input",
        message: "What is the employee first name",
        name: "firstName"
    },
    {
        type: "input",
        message: "What is the employee last name",
        name: "lastName"
    },
    {
        type: "input",
        message: "what is the role id",
        name: "roleId"
    }]).then(response => {
        connection.query("insert into employee(first_name,last_name,role_id)values (?,?,?)", [response.firstName, response.lastName, response.roleId], function (error, data) {
            console.log("new employee added")
            displayMenu()
        })
    })
}

function updateEmployee() {
    inquirer.prompt([
        {
          type: 'number',
          name: 'updateEmployee',
          message: 'Enter employees ID number you wish to update!',
          validate: (answer) => {
            if (answer) {
              return true;
            } else {
              console.log('Please enter employee ID!');
              return false;
            }
          }
        },
        {
          type: 'number',
          name: 'updateRole',
          message: 'Please update the employees new role',
          validate: (answer) => {
            if (answer) {
              return true;
            } else {
              console.log('Please input a new role id!');
              return false;
            }
          }
        }
      ])

        .then((answer) => {
          connection.query(
            `UPDATE employee SET role_id = ${answer.updateRole} WHERE id = ${answer.updateEmployee}`, (err, res) => {
              if (err) throw err;
              console.log('Employee Updated');
              displayMenu();
            })
        });
    };

displayMenu()