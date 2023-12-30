const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const  initData = require("./data.js")

const mongoUrl = "mongodb://127.0.0.1:27017/wanderlust";

main()
 .then(()=>{
    console.log("connected to Db")
 }).catch((err)=>{
    console.log(err)
 });

 async function main(){
   await mongoose.connect(mongoUrl);
};


const initDb = async ()=>{
   await Listing.deleteMany({});  //pura khali kar diya 
   await Listing.insertMany(initData.data)
   console.log("data was initialized")
   console.log(initData.data);
}
initDb();