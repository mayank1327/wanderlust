const express = require("express");
const router = express.Router() ;
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage })

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'), validateListing, wrapAsync(listingController.CreateListings));

router.get("/new", isLoggedIn ,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.ShowListings))
.put(isLoggedIn,isOwner, validateListing , wrapAsync(listingController.UpdateListings))
.delete(isLoggedIn ,isOwner, wrapAsync(listingController.DeleteListings));
  

// EDIT  ROUTE.....
   router.get("/:id/edit",isLoggedIn ,isOwner, wrapAsync(listingController.EditListings));
  
   module.exports = router;