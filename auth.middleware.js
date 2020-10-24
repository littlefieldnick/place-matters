const jwt = require("jsonwebtoken");
const md5 = require("md5");
const db = require("./database");

const APP_SECRET = "placemattersecret";
const auth_mappings = {
    get: ["/api/users", "/api/users/:id"],
    post: ["/api/resources", "/api/categories", "/auth/verify", "/api/users/"],
    put: ["/api/users/:id", "/api/resources/:id", "/api/categories/:id"]
}

function requiresAuthentication(method, endpoint) {
    return (auth_mappings[method.toLowerCase()] || [])
        .find(p => endpoint.startsWith(p)) !== undefined;
}

module.exports = function (req, res, next) {
    //Login user
    if (req.url.endsWith("/auth/login") && req.method == "POST") {
        if (req.body) {
            let email = req.body.email;
            let password = req.body.password;
            let sql = 'SELECT email, password FROM user WHERE email = ? LIMIT 1'
            let params = [email];
            db.get(sql, params, function(err, rows) {
                if (err) {
                    res.json({errors: err});
                    return;
                }
                console.log(rows);
                if (rows !== undefined && rows.email == email && rows.password == md5(password)) {
                    let token = jwt.sign({data: rows.email, expiresIn: "1h"}, APP_SECRET);
                    res.status(200).json({success: true, token: token})
                    return;
                } else {
                    res.status(401).json({
                        success: false,
                        errors: "User could not be logged in. The email or password provided was incorrect"
                    });
                    return;
                }
            });
        } else {
            res.status(401).json({
                success: false,
                errors: "User could not be logged in. Either an email or password were not provided."
            });
        }
        return;
    } else if(req.url.endsWith("/auth/verify") && req.method == "POST"){
        let token = req.headers["authorization"] || "";
        if (token.length == 0){
            res.status(401).json({success: false, errors: "There is no JWT token to verify."})
            return;
        }

        if(token.startsWith("Bearer ")){
            token = token.substring(7, token.length);
            try{
                jwt.verify(token, APP_SECRET);
                res.send({success:true});
                return;
            } catch (err) {
                res.status(401).send({success:false, errors: err});
                return;
            }
        }

        res.status(401).json({success:false, errors: "Token cannot be verified."})
        return;
    }
    else if (requiresAuthentication(req.method, req.url)) { //authentication needed
        let token = req.headers["authorization"] || "";
        if (token.startsWith("Bearer ")) {
            token = token.substring(7, token.length);
            try {
                jwt.verify(token, APP_SECRET);
                console.log("Verification successful")
                next()
                return;
            } catch (err) {
                res.status(401).send({success:false, errors: err});
                console.log("Verification failed!");
            }
        }

        res.status = 401;
        return;
    }
    next()
}
