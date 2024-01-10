const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req,res)=>{
    let listing = await Listing.findById(req.params.id);
     let newReview =  new Review(req.body.reviews);
       listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();
        req.flash("success", "new review created");
        res.redirect(`/listings/${listing.id}`);
    }