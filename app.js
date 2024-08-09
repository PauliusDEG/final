const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const methodOverride = require('method-override');
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require('./routes/productRoutes');

const app = express();


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'))

app.set("view engine", "ejs")

const dbURI = "mongodb+srv://pauliusdegutis1:5qUVGpJMkQ5N5RfT@cluster0.wagyfka.mongodb.net/Node3";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {app.listen(3000);
  })
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/partsList", requireAuth, (req, res) => res.render("partsList"));
app.use(authRoutes);
app.use(productRoutes);




