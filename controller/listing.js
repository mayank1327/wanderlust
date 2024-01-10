const Listing = require("../models/listing.js");
module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
  };

  module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs") }

    module.exports.ShowListings = async (req,res)=>{
        let {id} = req.params;
         const listing = await Listing.findById(id).populate("reviews").populate("owner");
         if(!listing) {
          req.flash("error","Listing you requested for does not exits")
          res.redirect("/listings")
         }
         
         res.render("listings/show.ejs",{listing})
       };

module.exports.CreateListings = async(req,res,next)=>{
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
   await newListing.save();
   req.flash("success", "new listing created");
   res.redirect("/listings");
   
 };     

 module.exports.EditListings = async (req,res)=>{
    let {id} = req.params;
      const listing = await Listing.findById(id);
      if(!listing) {
        req.flash("error","Listing you requested for does not exits")
        res.redirect("/listings")
       }
    res.render("./listings/edit.ejs" , {listing});
  }

  module.exports.UpdateListings = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success", " listing updated");
    res.redirect(`/listings/${id}`);
   }
   module.exports.DeleteListings = async (req,res)=>{
    let {id} = req.params;
      await Listing.findByIdAndDelete(id);
      req.flash("success", "listing deleted");
       res.redirect("/listings");
    };