const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json())

const HTML_tag = (text, color) => {
  return `<h1 style="color: ${color};">${text}</h1>`
}

app.get('/API', (req, res) => {res.send('get')})
app.post('/API', (req, res) => {res.send('post')})
app.delete('/API', (req, res) => {res.send('delete')})
app.put('/API', (req, res) => {res.send('put')})
app.patch('/API', (req, res) => {res.send('patch')})

app.get("/", (req, res) => {
  res.send('Hello world !!');
});

app.get("/products", (req, res) => {
  res.send('Products');
});

app.get("/products/tv", (req, res) => {
  res.send('Products - TV');
});

app.get("/products/tv/:id", (req, res) => {
  const { id } = req.params;
  res.send('TV id : ' + id);
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

app.get('/toJSON', (req, res) => {
  res.json({
    name : "zakaria",
    age : 50
  })
})

app.get('/HTMLcode', (req, res) => {
  res.send(HTML_tag("zakaria", "red"))
})

app.get('/HTMLfile', (req, res) => {
  res.sendFile(__dirname + "/views/view_one.html")
})

app.get('/EJSfile', (req, res) => {
  res.render("view_two.ejs", {
    name : "zakaria"
  })
})








// Any path
app.get("/*", (req, res) => {
  res.send('Not found');
});

app.listen(process.env.PORT, () => {
  console.log("Running on localhost:" + process.env.PORT);
});