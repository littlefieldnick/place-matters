create TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT,
                                firstName TEXT,
                                lastName TEXT,
                                email TEXT UNIQUE,
                                password TEXT,
                                confirmPassword TEXT,
                                CONSTRAINT email_unique UNIQUE(email));

create TABLE IF NOT EXISTS resource_category(id INTEGER PRIMARY KEY AUTOINCREMENT,
                                             name TEXT);

create TABLE IF NOT EXISTS resource(id INTEGER PRIMARY KEY AUTOINCREMENT,
                                    name TEXT,
                                    street TEXT,
                                    city TEXT,
                                    zipcode TEXT,
                                    state TEXT,
                                    county INTEGER,
                                    category INTEGER,
                                    description TEXT,
                                    website TEXT,
                                    latitude FLOAT,
                                    longitude FLOAT,
                                    FOREIGN KEY(county) REFERENCES county(id),
                                    FOREIGN KEY(category) REFERENCES resource_category(id));

create TABLE IF NOT EXISTS county(id INTEGER PRIMARY KEY AUTOINCREMENT,
                                  name TEXT);

insert into  user(firstName, lastName, email, password, confirmPassword)
    VALUES ("Default", "Admin", "admin@admin.org", "482c811da5d5b4bc6d497ffa98491e38", "482c811da5d5b4bc6d497ffa98491e38");
insert into  county(name) values("Androscoggin County");
insert into  county(name) values("Aroostook County");
insert into  county(name) values("Cumberland County");
insert into  county(name) values("Franklin County");
insert into  county(name) values("Hancock County");
insert into  county(name) values("Kennebec County");
insert into  county(name) values("Knox County");
insert into  county(name) values("Lincoln County");
insert into  county(name) values("Oxford County");
insert into  county(name) values("Penobscot County");
insert into  county(name) values("Piscataquis County");
insert into  county(name) values("Sagadahoc County");
insert into  county(name) values("Somerset County");
insert into  county(name) values("Waldo County");
insert into  county(name) values("Washington County");
insert into  county(name) values("York County");