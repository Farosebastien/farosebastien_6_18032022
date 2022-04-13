//requires
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

//security requires
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

//importations
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

const app = express();

//limiter for request
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

//mongoDB connection
mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//security
app.use(helmet());
app.use(limiter);

//request parsing
app.use(express.json());
app.use(bodyParser.json());

//cors headers
app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Access-Control-Allow-Headers");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

//routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);


module.exports = app;