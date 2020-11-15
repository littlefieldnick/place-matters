CREATE SCHEMA placematters;
use `placematters`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `confirmPassword` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `county` (
  `id` int NOT NULL AUTO_INCREMENT,
  `countyName` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `resource` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `street` varchar(250) DEFAULT NULL,
  `city` varchar(250) DEFAULT NULL,
  `zip` varchar(250) DEFAULT NULL,
  `countyName` int NOT NULL,
  `categoryName` int DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `website` varchar(250) DEFAULT NULL,
  `latitude` decimal(5,0) DEFAULT NULL,
  `longitude` decimal(5,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `countyName_idx` (`countyName`),
  KEY `categoryName_idx` (`categoryName`),
  CONSTRAINT `categoryName` FOREIGN KEY (`categoryName`) REFERENCES `category` (`id`),
  CONSTRAINT `countyName` FOREIGN KEY (`countyName`) REFERENCES `county` (`id`)
);

insert into  user(firstName, lastName, email, password, confirmPassword)
    VALUES ("Default", "Admin", "admin@admin.org", "482c811da5d5b4bc6d497ffa98491e38", "482c811da5d5b4bc6d497ffa98491e38");

insert into category(categoryName) values ("Community Reintegration");
insert into category(categoryName) values ("Early Intervention");
insert into category(categoryName) values ("Intensive Intervention");
insert into category(categoryName) values ("Intervention");
insert into category(categoryName) values ("Out of Home Treatment");
insert into category(categoryName) values ("Prevention");

insert into  county(countyName) values("Androscoggin County");
insert into  county(countyName) values("Aroostook County");
insert into  county(countyName) values("Cumberland County");
insert into  county(countyName) values("Franklin County");
insert into  county(countyName) values("Hancock County");
insert into  county(countyName) values("Kennebec County");
insert into  county(countyName) values("Knox County");
insert into  county(countyName) values("Lincoln County");
insert into  county(countyName) values("Oxford County");
insert into  county(countyName) values("Penobscot County");
insert into  county(countyName) values("Piscataquis County");
insert into  county(countyName) values("Sagadahoc County");
insert into  county(countyName) values("Somerset County");
insert into  county(countyName) values("Waldo County");
insert into  county(countyName) values("Washington County");
insert into  county(countyName) values("York County");