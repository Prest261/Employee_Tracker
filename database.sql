DROP DATABASE IF EXISTS tracker_db;
CREATE database tracker_db;

USE tracker_db;

CREATE TABLE department
(
    id INT
    AUTO_INCREMENT,
    name VARCHAR
    (30),
    PRIMARY KEY
    (id)
);

    CREATE TABLE role
    (
        id INT
        AUTO_INCREMENT,
    title VARCHAR
        (30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY
        (department_id) REFERENCES department
        (id),
    PRIMARY KEY
        (id)
);

        CREATE TABLE employee
        (
            id INT
            AUTO_INCREMENT primary key,
    first_name VARCHAR
            (30),
    last_name VARCHAR
            (30),
    role_id INT,
    FOREIGN KEY
            (role_id) REFERENCES role
            (id),
    manager_id INT,
    FOREIGN KEY
            (manager_id) REFERENCES employee
            (id)
    
)

            SELECT *
            FROM department;
            SELECT *
            FROM role;
            SELECT *
            FROM employee

