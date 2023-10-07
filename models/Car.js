const { Schema, model } = require("mongoose");

const carSchema = new Schema({
  Serie: String,
  color: String,
  price: Number,
});

const Car = model("Car", carSchema);

module.exports = Car;
