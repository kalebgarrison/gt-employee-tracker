INSERT INTO department (name)
VALUES ("Sales"),("Engineering"),("Product"),("Marketing"),("Finance"),("Legal"),("Support");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Person", 55000, 1), ("Senior Software Engineer", 110000, 2), ("Product Manager", 85000, 3), ("Marketing Assistant", 60000, 4), ("Finance Manager", 60000, 5), ("Legal Attorney", 150000, 6), ("Support Advocate", 45000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kaleb", "Garrison", 2, null), ("Maggie", "Hearn", 6, null), ("Benjamin", "Adams", 3, null), ("Joshua", "Southerland", 4, 3), ("Leah", "Miner", 7, 5);


SELECT employee.id, employee.first_name AS First, employee.last_name AS Last, role.title AS Title, department.name AS Department, role.salary AS Salary, employee.manager_id AS Manager
FROM employee 
LEFT JOIN department ON
department.name = department.name
LEFT JOIN role ON
role.title = role.title
AND
role.salary = role.salary;

SELECT department.name FROM department;


-- SELECT employee.id, employee.first_name, employee.last_name, department.name, department.id, role.title, role.salary  FROM employee RIGHT JOIN department ON employee.id = department.id ORDER BY employee.id;
