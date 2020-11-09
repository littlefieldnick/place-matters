create TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT,
                                firstName TEXT,
                                lastName TEXT,
                                email TEXT UNIQUE,
                                password TEXT,
                                confirmPassword TEXT,
                                CONSTRAINT email_unique UNIQUE(email));

create TABLE IF NOT EXISTS resource_category(id INTEGER PRIMARY KEY AUTOINCREMENT,
                                             categoryName TEXT);

create TABLE IF NOT EXISTS resource(id INTEGER PRIMARY KEY AUTOINCREMENT,
                                    name TEXT,
                                    street TEXT,
                                    city TEXT,
                                    zipcode TEXT,
                                    state TEXT,
                                    countyName INTEGER,
                                    categoryName INTEGER,
                                    description TEXT,
                                    website TEXT,
                                    latitude FLOAT,
                                    longitude FLOAT,
                                    FOREIGN KEY(countyName) REFERENCES county(id),
                                    FOREIGN KEY(categoryName) REFERENCES resource_category(id));

create TABLE IF NOT EXISTS county(id INTEGER PRIMARY KEY AUTOINCREMENT,
                                  countyName TEXT);

insert into  user(firstName, lastName, email, password, confirmPassword)
    VALUES ("Default", "Admin", "admin@admin.org", "482c811da5d5b4bc6d497ffa98491e38", "482c811da5d5b4bc6d497ffa98491e38");

insert into resource_category(categoryName) values ("Community Reintegration");
insert into resource_category(categoryName) values ("Early Intervention");
insert into resource_category(categoryName) values ("Intensive Intervention");
insert into resource_category(categoryName) values ("Intervention");
insert into resource_category(categoryName) values ("Out of Home Treatment");
insert into resource_category(categoryName) values ("Prevention");

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