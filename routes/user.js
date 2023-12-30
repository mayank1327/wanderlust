const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

router.get("/signup",(req,res)=>{
    res.render("listings/users/signup.ejs");
});

router.post("/signup", wrapAsync (async(req,res)=>{
   try{
    let {username , email , password} = req.body;
    const newUser = new User({username , email})
  
 let registeredUser =  await User.register(newUser,password);
    console.log(registeredUser);
    req.flash("success", " successful registered");
     res.redirect("/listings") 
   } catch(e) {
      req.flash("error", e.message);
      res.redirect("/signup")
   }
    
} ) );

router.get("/login",(req,res)=>{
    res.render("listings/users/login.ejs")
});

router.post("/login", passport.authenticate("local",{
    failureRedirect:"/login",
     failureFlash: true
}),(req,res)=>{
    req.flash("success","welcome back to wanderlust you're logged in");
    res.redirect("/listings");
});

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err) {
            return next(err);
        }
    
        req.flash("success","you are logged out !!");
        res.redirect("/listings");
    })
})

module.exports = router;