const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

module.exports = async function (req, res, next) {
    if (req.url.endsWith("/auth/login") && req.method == "POST") {
        if (req.body) {
            let email = req.body.email;
            let password = req.body.password;

            let user = (await db.models.user.findOne({
                where: {
                    email: email
                },
                include: [{
                    model: db.models.role,
                    include: [{
                        model: db.models.permission
                    }]
                }]
            })).toJSON();

            if (user && await bcrypt.compare(password, user.password)) {
                jwt.sign({
                    data: user.email,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60)
                }, APP_SECRET, {}, (err, token) => {
                    if (err) {
                        res.status(401).json({success: false, errors: err});
                    } else {
                        res.status(200).json({success: true, user:user, token: token});
                    }
                });
            } else {
                res.status(401).json({
                    success: false,
                    errors: "User could not be logged in. The email or password provided was incorrect."
                });
            }
        } else {
            res.status(401).json({
                success: false,
                errors: "User could not be logged in. Either an email or password were not provided."
            });
        }
    } else if (req.url.endsWith("/auth/verify") && req.method == "POST") {
        let token = req.headers["authorization"] || "";
        if (token.length == 0) {
            res.status(401).json({success: false, errors: "There is no JWT token to verify."})
            return;
        }

        if (token.startsWith("Bearer ")) {
            token = token.substring(7, token.length);

            jwt.verify(token, APP_SECRET, {}, (err, decoded) => {
                if (err)
                    res.status(401).json({success: false, error: err})
                else
                    res.status(200).json({success: true, decoded: decoded})
            });
        } else {
            res.status(401).json({success: false, error: "JWT Token provided is invalid."})
        }
    } else if (requiresAuthentication(req.method, req.url)) { //authentication needed
        console.log(req.url);
        let token = req.headers["authorization"] || "";

        if (token.startsWith("Bearer ")) {
            token = token.substring(7, token.length);

            jwt.verify(token, APP_SECRET, {}, (err, decoded) => {
                if (err)
                    res.status(401).json({success: false, error: err})
                else
                    next()
            });
        } else {
            res.status(401).json({success: false, error: "JWT Token provided is invalid."})
        }
    } else {
        next();
    }
}
