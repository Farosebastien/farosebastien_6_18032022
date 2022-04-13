//requires
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//schéma utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
});

//vérification que l'utilisateur est unique
userSchema.plugin(uniqueValidator);

//exportation du schéma user
module.exports = mongoose.model("User", userSchema);