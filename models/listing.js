const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  image: {
    filename: String,
    url: String
  },
  city: String,
  location: String,
  board:String,
  type:String
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
