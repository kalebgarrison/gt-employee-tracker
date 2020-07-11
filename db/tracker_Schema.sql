DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL, 
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL, 
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL NOT NULL, 
    department_id INT NOT NULL, 
    PRIMARY KEY (id)
);


CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT NOT NULL, 
    manager_id INT, 
    PRIMARY KEY (id) 
);

SELECT * FROM department;


-- Left Join to show all employees.

SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title AS title, department.name AS department, role.salary, employee.manager_id
FROM employee
LEFT JOIN role 
ON employee.role_id = role.id
LEFT JOIN department 
ON role.department_id = department.id;