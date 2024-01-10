const express = require("express");
const app = express();

const mongoose = require("mongoose");
const mongoUrl = "mongodb://127.0.0.1:27017/wanderlust";

const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname , "views"));
 
app.use(express.urlencoded({extended:true}))

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

 const ejsMate = require("ejs-mate");
 app.engine("ejs",ejsMate);

app.use(express.static(path.join(__dirname,"/public")));

const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

 const session = require("express-session");
 const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const users = require("./routes/user.js");

main()
 .then(()=>{
    console.log("connected to Db")
 }).catch((err)=>{
    console.log(err)
 });

 async function main(){
   await mongoose.connect(mongoUrl);
};

app.get("/testlisting",  async (req,res)=>{
  let sampleListing = new Listing (
    {
        title:"My new villa",
        description:"By the beach",
        price:1200,
        location:"calangute, goa",
        country:"India"
    }
  );

    await sampleListing.save();
   console.log("sample was saved");
  res.send("successful testing")
});

const sessionOption = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
}

// app.get("/",(req,res)=>{
//   res.send("Hi i am root");
// });

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curUser = req.user;
  next();
});

app.get("/demouser",async (req,res) => {
  let fakeUser = new User(
    {
      email: "student@gmail.com",
      username:"student"
    }
  )
  let registeredUser = await User.register(fakeUser,"helloworld");
  res.send(registeredUser);
})


app.use("/listings",listings);
app.use("/listings/:id/reviews", reviews);
app.use("/",users);

//VALIDATION MIDDLEWARE







  
    // MIDDLEWARE FUNCTION....
    // ERROR HANDLING MIDDLEWARE.... 

    app.all("*",(req,res,next)=>{
     next(new ExpressError(404,"page not found!!"))
    })

    app.use((err,req,res,next)=>{
      let {status=301,message="something went wrong"} = err;
        res.status(status).render("./listings/error.ejs",{message})
    });

    // LISTENING ON PORT.....

app.listen(8080,()=>{
    console.log("server is running on port")
});