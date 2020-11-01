const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const md5 = require("md5");
const {Client} = require("@googlemaps/google-maps-services-js");
const port = 5000;
const app_folder = 'dist/place-matters';
const IncomingForm = require('formidable').IncomingForm;
const csv = require('csv-parser');
const fs = require('fs');
const db = require("./database.js");
const auth = require("./auth.middleware");
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(auth)


// ---- API Routing ---- //
async function geocodeResource(client, address) {
    return await client.geocode({
        params: {
            address: address,
            key: 'AIzaSyANSJ6reLpFMp4Edp8i6bvZ5cBGMoH8XR8'
        }
    }).then((geocoded) => geocoded.data.results[0].geometry)

}

/**********************************************/
/*         Resource Category API Routes       */
/**********************************************/
app.get("/api/categories", (req, res, next) => {
    let sql = "SELECT * from resource_category";
    let params = []

    db.all(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({"error": err.message});
            return;
        }

        res.status(200).json({"data": rows});
    });
});

app.get("/api/categories/:id", (req, res, next) => {
    let sql = "select * from resource_category where id = ?"
    let params = [req.params.id];
    db.get(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }

        res.status(200).json({
            data: rows
        });
    });
});

app.post("/api/categories/", (req, res, next) => {
    console.log("POSTING Category");
    let errors = []
    let cat = req.body.category;

    if (!cat.name) {
        errors.push("No category name is specified.");
    }

    let sql = 'INSERT INTO resource_category (name) VALUES (?)';
    let params = [
        cat.name
    ];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({success: false, errors: err.message});
            return;
        }

        res.status(200).json({success: true});
    });
});

app.put("/api/categories/:id", (req, res, next) => {
    let category = req.body.category;
    console.log(req.body);
    let sql = 'UPDATE resource_category SET name = ? WHERE id = ?'
    let params = [category.name, category.id];
    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({success: false, errors: err.message});
            return;
        }

        res.status(200).json({success: true});
    });
});

app.delete("/api/categories/:id", (req, res, next) => {
    let sql = "DELETE FROM resource_category WHERE id = ?"
    let params = [req.params.id];

    db.run(sql, params, (err) => {
        if(err)
            res.status(400).json({success: false, error: err.message});

        res.status(200).json({success:true});
    })
})
/**********************************************/
/*              Resource API Routes           */
/**********************************************/
app.get("/api/resources/", (req, res, next) => {
    let sql = 'select * from resource';
    let params = [];
    db.get(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }

        res.status(200).json({"data": rows});
    });
});

app.get("/api/resources/:id", (req, res, next) => {
    let sql = "select * from resource where id = ?"
    let params = [req.params.id];
    db.get(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }

        res.status(200).json({
            data: rows
        });
    });
});

app.get("/api/counties", (req, res, next) => {
    let sql = "SELECT * FROM county";
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err)
            res.status(400).json({success: false, error: err.message})

        res.status(200).json({success: true, data: rows});
    });
})

app.post('/api/resources/upload', (req, res, next) => {
    const form = new IncomingForm();

    form.on('file', (field, file) =>{
        console.log(file.name);
        let parsed = [];
        fs.createReadStream(file.path).pipe(csv())
            .on('data', (data) => {
                parsed.push(data);
            })
            .on('header', (headers) => console.log(headers))
            .on('error', (err) => {
                res.json({error: err});
            })
            .on('end', () => res.json({data: parsed}));

    });

    form.on('error', (err) => {
        res.json({error: err});
    })

    form.parse(req);
})

app.post("/api/resources/", async (req, res, next) => {
    let resources = req.body.resource;
    let sql = "INSERT INTO resource(name, street, city, zipcode, state, county, " +
        "category, description, website, latitude, longitude) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    let client = new Client({})
    let params = []
    let geoError = false;
    //Reverse geocode location addresses and build params array for each entry
    for (const r of resources) {
        let address = r.street + ", " + r.city + ", " + r.state + ", " + r.zipcode;
        let coords = await geocodeResource(client, address).catch((error) => {
            res.status(400).json({success: false, error: "Could not geocode resource location!"});
            geoError = true;
        });

        if (geoError)
            break;

        params.push([r.name, r.street, r.city, r.zipcode, r.state, r.county,
            r.category, r.description,
            r.website, coords.location.lat,
            coords.location.lng]);
    }

    db.serialize(function () {
        db.run("begin transaction");
        params.forEach((entry) => {
            db.run(sql, entry, function (err) {
                if (err) {
                    res.json({success: false, error: err.message});
                    return;
                }
            });
        });
        db.run("commit");
    });

    await res.json({success: true});
})

app.put("/api/resources/:id", (req, res, next) => {
    let r = req.body.resource;
    let sql = 'UPDATE resource SET name = ?, street = ?, city = ?, zipcode = ?, state = ?, county = ?, category = ?, description = ?, website = ? WHERE id = ?'
    let params = [r.name, r.street, r.city, r.zipcode, r.state, r.county,
        r.category, r.description,
        r.website, req.params.id];

    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({success: false, errors: err.message});
            return;
        }

        res.status(200).json({success: true});
    });
})

app.delete("/api/resource/:id", (req, res, next) => {
    let sql = "DELETE FROM resource WHERE id = ?"
    let params = [req.params.id];

    db.run(sql, params, (err) => {
        if(err)
            res.status(400).json({success: false, error: err.message});

        res.status(200).json({success:true});
    })
})


/**********************************************/
/*              User API Routes               */
/**********************************************/
app.get("/api/users/:id", (req, res, next) => {
    let sql = "select * from user where id = ?"
    let params = [req.params.id];
    db.get(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }

        res.status(200).json({
            data: rows
        });
    });
});

app.get("/api/users", (req, res, next) => {
    let sql = 'select * from user';
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }

        res.status(200).json({"data": rows});
    });
});

app.post("/api/users/", (req, res, next) => {
    console.log("POSTING USER");
    let errors = []
    let user = req.body.user;

    if (!user.firstName) {
        errors.push("No first name is specified.");
    }

    if (!user.lastName) {
        errors.push("No last name is specified.")
    }

    if (!user.email) {
        errors.push("No email is specified.")
    }

    if (!user.password || user.password.length < 8) {
        errors.push("A password is either not specified or does not meet the length requirements");
    }

    if (user.password != user.confirmPassword) {
        errors.push("Passwords provided do not match.")
    }

    if (errors.length) {
        res.status(400).json({success: false, errors: errors})
        return;
    }

    let sql = 'INSERT INTO user (firstName, lastName, email, password, confirmPassword) VALUES (?, ?, ?, ?, ?)';
    let params = [user.firstName,
        user.lastName,
        user.email,
        md5(user.password),
        md5(user.confirmPassword)
    ];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({success: false, errors: err.message});
            return;
        }

        res.status(200).json({success: true});
    });
});


app.put("/api/users/:id", (req, res, next) => {
    let user = req.body.user;
    let sql = 'UPDATE user SET firstName = ?, lastName = ?, email = ? WHERE id = ?'
    let params = [user.firstName, user.lastName, user.email, user.id];
    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({success: false, errors: err.message});
            return;
        }

        res.status(200).json({success: true});
    });
});

app.delete("/api/users/:id", (req, res, next) => {
    let sql = "DELETE FROM user WHERE id = ?"
    let params = [req.params.id];

    db.run(sql, params, (err) => {
        if(err)
            res.status(400).json({success: false, error: err.message});

        res.status(200).json({success:true});
    })
})

// ---- Serve static files ---- //
app.get('*.*', express.static(app_folder, {maxAge: '1y'}));

// ---- Serve application path ---- //
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: app_folder});
});

// ---- Start the Node server  ---- //
app.listen(port, function () {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + port);
});