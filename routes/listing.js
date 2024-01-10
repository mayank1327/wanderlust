const express = require("express");
const router = express.Router() ;
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controller/listing.js");

// INDEX ROUTE

   router.get("/", wrapAsync(listingController.index));

// NEW ROUTE....
  
   router.get("/new", isLoggedIn ,listingController.renderNewForm);
  
// SHOW ROUTE....
  
   router.get("/:id",wrapAsync(listingController.ShowListings));
  
// CREATE ROUTE....
  
   router.post("/", validateListing , wrapAsync(listingController.CreateListings) );

// EDIT  ROUTE.....
  
   router.get("/:id/edit",isLoggedIn ,isOwner, wrapAsync(listingController.EditListings));
  
// UPDATE ROUTE....

   router.put("/:id",isLoggedIn,isOwner, validateListing , wrapAsync(listingController.UpdateListings));
  
// DELETE ROUTE.....
  
   router.delete("/:id",isLoggedIn ,isOwner, wrapAsync(listingController.DeleteListings));
  
   module.exports = router;