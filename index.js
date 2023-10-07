require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const bodyParser = require("body-parser");

const Product = require("./models/Product");
const Car = require("./models/Car");

app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    process.env.DB ||
      "mongodb+srv://kyros:2IaesiQfesCdFlj8@learnmongo.nbnuvai.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Success");
  })
  .catch(() => {
    console.log("Error");
  });

app.use(express.json());

const HTML_tag = (text, color) => {
  return `<h1 style="color: ${color};">${text}</h1>`;
};

app.get("/API", (req, res) => {
  res.send("get");
});
app.post("/API", (req, res) => {
  res.send("post");
});
app.delete("/API", (req, res) => {
  res.send("delete");
});
app.put("/API", (req, res) => {
  res.send("put");
});
app.patch("/API", (req, res) => {
  res.send("patch");
});

app.get("/", (req, res) => {
  res.send("Hello world !!");
});

app.get("/products_", (req, res) => {
  res.send("Products");
});

app.get("/products/tv", (req, res) => {
  res.send("Products - TV");
});

app.get("/products/tv/:id", (req, res) => {
  const { id } = req.params;
  res.send("TV id : " + id);
});

// ex : /products/phone?color=red
app.get("/products/phone", (req, res) => {
  const { color } = req.query;
  res.send("Phone color : " + color);
});

app.get("/products/pc", (req, res) => {
  // important : app.use(express.json()) => on TOP
  const { price } = req.body;
  res.send("Pc price : " + price);
});

app.get("/toJSON", (req, res) => {
  res.json({
    name: "zakaria",
    age: 50,
  });
});

app.get("/HTMLcode", (req, res) => {
  res.send(HTML_tag("zakaria", "red"));
});

app.get("/HTMLfile", (req, res) => {
  res.sendFile(__dirname + "/views/view_one.html");
});

app.get("/EJSfile", (req, res) => {
  res.render("view_two.ejs", {
    name: "zakaria",
  });
});

//Form :
app.get("/addproduct", (req, res) => {
  res.render("addProduct.ejs");
});

//Model :
app.post("/product", async (req, res) => {
  const newProduct = new Product();
  const { title, color, price } = req.body;

  newProduct.title = title || "No title";
  newProduct.color = color || "No color";
  newProduct.price = price || 0;
  await newProduct.save();

  res.redirect("/showproducts");
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json(product);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  res.json(product);
});

app.get("/showproducts", async (req, res) => {
  const products = await Product.find();
  res.render("products.ejs", { products });
});

// Any path
app.get("/*", (req, res) => {
  res.send("Not found");
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Running on localhost:" + port);
});
