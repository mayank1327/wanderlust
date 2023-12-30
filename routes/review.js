const express = require("express");
const router = express.Router({mergeParams: true}) ;
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const Schema = require("../schema2.js");

const validateReview = (req,res,next)=>{
    console.log(req.body);
  const {error} = Schema.validate(req.body);
   if(error) {
    throw new ExpressError(400, error);
   } else {
    next();
   }
}

 //REVIEWS.....

 router.post("/", validateReview ,  wrapAsync(async (req,res)=>{
    let listing = await Listing.findById(req.params.id);
     let newReview =  new Review(req.body.reviews);
       listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();
        req.flash("success", "new review created");
        res.redirect(`/listings/${listing.id}`);
    })
);

module.exports = router;
