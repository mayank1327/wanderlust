const express = require("express");
const router = express.Router({mergeParams: true}) ;
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview} = require("../middleware.js");
const reviewController = require("../controller/review.js")

 //REVIEWS.....

 // POST ROUTE 
 router.post("/", validateReview ,  wrapAsync(reviewController.createReview)
);

// DELETE ROUTE 
router.delete("/:reviewId", wrapAsync(async(req,res)=>{
  let { id , reviewId} = req.params;
  await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}})
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);
}))

module.exports = router;
