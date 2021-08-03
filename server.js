// web server
const express = require("express");
// parse the data inside of the post request to the server. Middleware
const bodyParser = require("body-parser");
// connects to MongoDB
const mongoose = require("mongoose");
// create user-friendly IDs as ID
const shortid = require("shortid");


// create a web server using express
const app = express();
app.use((req, res, next) => {
  console.log(req.url);
  next();
});
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// so we can use 'x-www-form-urlencoded', but it shouldn't be necessary?

// initialize mongoose database
mongoose.connect("mongodb://localhost/cosplay-cleric-db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, err => err && console.log("mongoose.connect error: ", err));

// define model
const Product = mongoose.model(
  "Products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    image_url: String,
    type: String,
    title: String,
    description: String,
    availableSizes: [String],
    price: Number
  })
);

// define port
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log("server at http://localhost:" + port)
);

// define end points, write handlers
app.get("/api/products", async (req, res) => {
  // Product.find is a MongoDB function
  // We're sending that result straight through Express to the http client
  // This is how the two different applications connect
  // http client = makes request/parses response
  // Express(web framework) = tube btwn http client and my handler
  // my handler = what to do with MongoDB + how to handle it's response
  // MongoDB = DB that just chills until my handler comes to talk to it
  const products = await Product.find({});
  res.send(products);
});
app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});
app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});
