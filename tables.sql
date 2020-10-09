CREATE TABLE user(id INTEGER PRIMARY KEY AUTOINCREMENT,
                  first_name TEXT,
                  last_name TEXT,
                  email TEXT UNIQUE,
                  password TEXT,
                  CONSTRAINT email_unique UNIQUE(email));

CREATE TABLE resource_category(id INTEGER PRIMARY KEY AUTOINCREMENT,
                               name TEXT
)

CREATE TABLE resource(id INTEGER PRIMARY KEY AUTOINCREMENT,
                      name TEXT,
                      address TEXT,
                      category INTEGER,
                      description TEXT,
                      website TEXT,
                      latitude FLOAT,
                      longitude FLOAT,
                      FOREIGN KEY(category) REFERENCES resource_category(id)
)
