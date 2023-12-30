const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
    {
        title: {
            type : String,
            require: true,
        },
        description : {
            type: String ,
        },
        image: {
            type:String,
            default:"https://images.unsplash.com/photo-1695632844647-d9252f33100d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            set: (v) => v ===""? 
            "https://images.unsplash.com/photo-1695632844647-d9252f33100d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            :v
        },
         price:Number,
        location:String,
        country:String,
         reviews:[
            {
                type : Schema.Types.ObjectId,
                ref : "Review"
            }
        ]
    }
);
const Listing = mongoose.model("Listing",listingSchema);

 module.exports = Listing;


