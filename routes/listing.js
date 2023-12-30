const express = require("express");
const router = express.Router() ;
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const  Schema = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");

const validateListing = (req,res,next)=>{
  console.log(req.body);
  let { error }= Schema.validate(req.body);
   if(error) {
    let errMsg = error.details.map((el)=> el.message.join(","))
    throw new ExpressError(400, errMsg);
   } else {
    next();
   }
};

// INDEX ROUTE

router.get("/", wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({});
    // console.log(allListings);
    res.render("listings/index.ejs",{allListings});
  }));
  
  
  
  // NEW ROUTE....
  
  router.get("/new", isLoggedIn ,(req,res)=>{
    
    res.render("listings/new.ejs");
    
  })
  
  
  // SHOW ROUTE....
  
  router.get("/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
     const listing = await Listing.findById(id).populate("reviews");
     if(!listing) {
      req.flash("error","Listing you requested for does not exits")
      res.redirect("/listings")
     }
     res.render("listings/show.ejs",{listing})
   }))
  
  // CREATE ROUTE....
  
  router.post("/", validateListing , wrapAsync(async(req,res,next)=>{
     const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "new listing created");
    res.redirect("/listings");
    
    // console.log(req.body.listing);
  }));
  
  
  // EDIT OR UPDATE ROUTE.....
  
  router.get("/:id/edit",isLoggedIn , wrapAsync(async (req,res)=>{
    let {id} = req.params;
      const listing = await Listing.findById(id);
      if(!listing) {
        req.flash("error","Listing you requested for does not exits")
        res.redirect("/listings")
       }
    res.render("./listings/edit.ejs" , {listing});
  }));
  
  
  router.put("/:id", validateListing , wrapAsync(async (req,res)=>{
     let {id} = req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing}); // DECONSTRUCT OUR LISTING
     req.flash("success", " listing updated");
     res.redirect(`/listings/${id}`);
    }));
  
  
    // DELETE ROUTE.....
  
    router.delete("/:id",isLoggedIn , wrapAsync(async (req,res)=>{
      let {id} = req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("success", "listing deleted");
         res.redirect("/listings");
      }));
  
      module.exports = router ;