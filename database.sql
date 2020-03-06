DROP DATABASE IF EXISTS tracker_db;
CREATE database tracker_db;

USE tracker_db;

CREATE TABLE department
(
    id INT,
    name VARCHAR
    (30),
    PRIMARY KEY
    (id)
);

CREATE TABLE role
(
    id INT,
    title VARCHAR
        (30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY
        (id)
);

CREATE TABLE employee
(
    id INT,
    first_name VARCHAR
            (30),
    last_name VARCHAR
            (30),
    role_id INT,
    manager_id INT
)

SELECT *
FROM department;
SELECT *
FROM role;
SELECT *
FROM employee

