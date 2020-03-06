// require npm packages
var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');
console.log('my app');
// create connection to sql database
var connection = mysql.createConnection({
    host: 'localhost',
    // Your port
    port: 3306,
    // Your username
    user: 'root',
    // Your password
    password: 'Boots31094!',
    database: 'tracker_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connection');
    start();
});

function start() {
    console.log('start');
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'Add Employee',
                'Add Department',
                'Add Role',
                'View all Employees',
                'View Department',
                'View all Employees by Manager',
                'Update Employee Role',
                'Update Employee Manager',
                'Remove Employee'
            ]
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View all Employees':
                    viewEmployee();
                    break;
                case 'View Department':
                    viewDepart();
                    break;
                case 'View Role':
                    viewRole();
                    break;
                case 'View all Employees by Role':
                    viewEmpRole();
                    break;
                case 'Update Employee Role':
                    updateEmployRole();
                    break;
                case 'Update Employee Manager':
                    updateManager();
                    break;
                case 'Remove Employee':
                    removeEmployee();
                    break;
            }
        });
}

function addEmployee() {}

function addDepartment() {
    inquirer
        .prompt({
            name: 'name',
            type: 'input',
            message: 'What is the Department name?'
        })
        .then((answer) => {
            connection.query('INSERT INTO department SET ?', answer, function(
                error,
                db
            ) {
                console.log(error);
                console.log(db);
                console.log('department created');
                start();
            });
        });
}

function addRole() {
    connection.query('select * from department', function(error, db) {
        var depChoices = db.map((e) => {
            return {
                name: e.name,
                value: e.id
            };
        });

        inquirer
            .prompt([{
                    name: 'title',
                    type: 'input',
                    message: 'What is the role name?'
                },
                {
                    name: 'salary',
                    type: 'number',
                    message: 'What is the salary?'
                },
                {
                    name: 'department_id',
                    type: 'list',
                    message: 'What is the Department name?',
                    choices: depChoices
                }
            ])
            .then((answer) => {
                console.log(answer);

                // insert
                connection.query('INSERT INTO role SET ?', answer, function(err, db) {
                    console.log('insert into role');
                    start();
                });
            });
    });
}

function viewEmployee() {}

function viewDepart() {
    connection.query('SELECT * FROM department', function(err, db) {
        console.table(db);
        start();
    });
}

function viewEmpRole() {}

function viewRole() {}

function updateEmployRole() {}

function updateManager() {}

function removeEmployee() {}