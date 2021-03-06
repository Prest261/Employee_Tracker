// require npm packages
var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');
// console.log('my app');
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
    // console.log('connection');
    start();
});

function start() {
    // console.log('start');
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
                'View Role',
                'View all Employees by Role',
                'Update Employee Role',
                'Remove Employee',
                'Remove Department'
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
                case 'Remove Department':
                    removeDepartment();
                    break;
            }
        });
}

function addEmployee() {
    connection.query('SELECT * FROM role', function(error, db) {
        var roleChoices = db.map((e) => {
            return {
                name: e.title,
                value: e.id
            };
        });
        inquirer
            .prompt([{
                    name: 'first_name',
                    type: 'input',
                    message: 'What is the first name of the employee?'
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: 'What is the last name of the employee?'
                },
                {
                    name: 'role_id',
                    type: 'list',
                    message: 'What is the employee role?',
                    choices: roleChoices
                }
            ])
            .then((answer) => {
                connection.query('INSERT INTO employee SET ?', answer, function(
                    error,
                    db
                ) {
                    console.log(error);
                    console.log(db);
                    console.log('employee created');
                    start();
                });
            });
    });
}

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
    connection.query('SELECT * FROM department', function(error, db) {
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

function viewEmployee() {
    connection.query(
        'SELECT first_name, last_name, role.title, role.salary, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id',
        function(err, db) {
            console.table(db);
            start();
        }
    );
}

function viewDepart() {
    connection.query('SELECT * FROM department', function(err, db) {
        console.table(db);
        start();
    });
}

function viewRole() {
    connection.query('SELECT * FROM role', function(err, db) {
        console.table(db);
        start();
    });
}

function viewEmpRole() {
    // need to join the employees first_name & last_name to be shown in the role too
    connection.query(
        'SELECT first_name, last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id',
        function(err, db) {
            console.table(db);
            start();
        }
    );
}

function updateEmployRole() {
    connection.query('SELECT * FROM employee', function(err, db) {
        if (err) throw err;

        var employeeChoices = db.map((e) => {
            return {
                name: e.first_name + ' ' + e.last_name,
                value: e.id
            };
        });

        connection.query('SELECT * FROM role', function(err, db) {
            if (err) throw err;

            var RoleChoices = db.map((e) => {
                return {
                    name: e.title,
                    value: e.id
                };
            });

            inquirer
                .prompt([{
                        name: 'employee',
                        type: 'list',
                        message: 'Which Employee would you like to update?',
                        choices: employeeChoices
                    },
                    {
                        name: 'role',
                        type: 'list',
                        message: 'What is the updated role for the employee?',
                        choices: RoleChoices
                    }
                ])
                .then(function(answer) {
                    connection.query(
                        'UPDATE employee SET role_id=? WHERE id=?', [answer.role, answer.employee],
                        function(err, db) {
                            if (err) throw err;
                            start();
                        }
                    );
                });
        });
    });
}

function removeDepartment() {
    connection.query('SELECT id, name FROM department', function(err, db) {
        if (err) throw err;
        var departmentChoices = db.map((e) => {
            return {
                name: e.name,
                value: e.id
            };
        });
        inquirer
            .prompt([{
                name: 'name',
                type: 'list',
                message: 'What department would you like to remove?',
                choices: departmentChoices
            }])
            .then((answer) => {
                connection.query(
                    'DELETE FROM department WHERE id=?', [answer.name],
                    function(err, db) {
                        console.log('removed department' + answer.name);
                        start();
                    }
                );
            });
    });
}

function removeEmployee() {
    connection.query('SELECT first_name, last_name, id FROM employee', function(
        err,
        db
    ) {
        if (err) throw err;
        var employChoices = db.map((e) => {
            return {
                name: e.first_name + ' ' + e.last_name,
                value: e.id
            };
        });
        inquirer
            .prompt([{
                name: 'name',
                type: 'list',
                message: 'Who is the employee you would like to remove?',
                choices: employChoices
            }])
            .then((answer) => {
                connection.query(
                    'DELETE FROM employee WHERE id=?', [answer.name],
                    function(err, db) {
                        console.log('removed employee' + answer.name);
                        start();
                    }
                );
            });
    });
}