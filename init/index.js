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
   initData.data =  initData.data.map((obj)=>({...obj , owner:"658f158c14b9a5f3e3e8dfdf"}));
   await Listing.insertMany(initData.data)
   console.log("data was initialized")
   console.log(initData.data);
}
initDb();