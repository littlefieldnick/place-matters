CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT,
                                first_name TEXT,
                                last_name TEXT,
                                email TEXT UNIQUE,
                                password TEXT,
                                CONSTRAINT email_unique UNIQUE(email));

CREATE TABLE IF NOT EXISTS resource_category(id INTEGER PRIMARY KEY AUTOINCREMENT,
                                             name TEXT);

CREATE TABLE IF NOT EXISTS resource(id INTEGER PRIMARY KEY AUTOINCREMENT,
                                    name TEXT,
                                    address TEXT,
                                    category INTEGER,
                                    description TEXT,
                                    website TEXT,
                                    latitude FLOAT,
                                    longitude FLOAT,
                                    FOREIGN KEY(category) REFERENCES resource_category(id));
