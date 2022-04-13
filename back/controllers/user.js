//requires
const User = require("../models/User");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailvalidator = require("email-validator");
const passwordValidator = require("password-validator");

// création d'un schéma pour le password
const passwordSchema = new passwordValidator;
passwordSchema
.is().min(8)
.has().uppercase()
.has().lowercase()
.has().digits(1)
.has().symbols()
.has().not().spaces();
/*
8 caractères minimum
minuscule
majuscule
1 chiffre
caractère spécial
pas d'espace
*/

//fonction signup
exports.signup = (req, res, next) => {
    //si l'email n'est pas valide
    if(!emailvalidator.validate(req.body.email)) {
        throw {
            error: "le mail d'identification n'est pas valide",
        };
    //si le mot de passe n'est pas valide
    } else if(!passwordSchema.validate(req.body.password)) {
        throw {
            error: "le mot de passe n'est pas valide"
        };
    //si email et mot de passe sont valide
    } else {
        //hachage et salage du password
        bcrypt.hash(req.body.password, 10)
        .then (hash => {
            //création d'un nouvel utilisateur
            const user = new User({
                email: req.body.email,
                password: hash
            });
            //sauvegarde du user dans la db
            user.save()
            .then(() => res.status(201).json({ message: "utilisateur crée" }))
            .catch(error => res.status(400).json({ message: "erreur lors de la création de l'utilisateur" }));
        })
        .catch(error => res.status(500).json({ error }));
    }
};

//fonction login
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        //si l'utilisateur n'existe pas
        if(!user) {
            return res.status(401).json({ message: "utilisateur non trouvé" });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            //si le mot de passe n'est pas valide
            if(!valid) {
                return res.status(401).json({ message: "mot de passe incorrect" });
            }
            //si tout est ok création d'un token
            res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

