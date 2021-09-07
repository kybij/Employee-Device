Drop database if exists tracker;
create database tracker;
use tracker; 

create table department(
    id INT not null auto_increment primary key,
    name varchar(30)

);

create table role(
    id INT not null auto_increment primary key,
    title varchar(30),
    salary decimal,
    department_id INT, 
    foreign key(department_id) references department(id)
);

create table employee(
    id INT not null auto_increment primary key,
    first_name varchar(30),
    last_name varchar(30),
    role_id INT,
    foreign key(role_id) references role(id),
    manager_id INT,
    foreign key(manager_id) references employee(id)
)

