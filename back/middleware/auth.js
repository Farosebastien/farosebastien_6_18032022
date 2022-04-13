//requires
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        //si il n'y a pas d'authentification
        if(!req.headers.authorization) {
            throw "veuillez vous connecter";
        }
        //si on est authentifié on décode le token
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decodedToken.userId;
        //si il n'y a pas de user id et qu'il ne coïncide pas avec celui du token
        if(req.body.userId && req.body.userId !== userId) {
            throw "identifiant non valable";
        //si tout est ok
        } else {
            next();
        }
    } catch(error) {
        res.status(403).json({
            error: new Error(" unauthorized request")
        });
    }
};