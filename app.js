const express=require("express");
const session = require("express-session");
const path=require("path");
const Listing=require("./models/listing.js");
const mongoose=require("mongoose");


const app=express();




app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(session({
  secret:"schoolfinder-secret",
  resave:false,
  saveUninitialized:true
}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));




// MongoDB Connection

// DB Connection URL
const mongo_url = "mongodb+srv://ashutosh:ashutosh123@cluster0.d5vvguk.mongodb.net/odisha_schools?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
  await mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}


main()
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// ROUTES

app.get("/",(req,res)=>{
  res.render("Home.ejs");
});




app.get("/search", async (req, res) => {
  let cityName = req.query.cityFromSearch;
  try{
    const schools = await Listing.find({ city: cityName });
    res.render("schools.ejs", { city: cityName, schools });
  } catch (err) {
    res.status(500).send("Error fetching schools");
  }
});


app.get("/schools/:id", async (req, res) => {
  try {
    const school = await Listing.findById(req.params.id);
    console.log(school);
    if (!school) {
      return res.status(404).send("School not found");
    }
    res.render("school_details.ejs", { school });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading school details");
  }
});


const port=8080;
app.listen(port,()=>{
    console.log(`Server is running on http//:localhost:${port}`);
});