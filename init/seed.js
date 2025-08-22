const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// DB Connection URL
const mongo_url = "mongodb+srv://ashutosh:ashutosh123@cluster0.d5vvguk.mongodb.net/odisha_schools?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
  await mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

main()
  .then(async () => {
    console.log("✅ Connected to DB");

    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);

    console.log("🎉 Data Initialized!");

    mongoose.connection.close(); // ✅ Close DB connection
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
  });
