const mongoose = require('mongoose');
var dotenv = require('dotenv')

dotenv.config();
const mongoURI = process.env.MONGO_URL;

async function connectToMongo(){
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }
  
module.exports = connectToMongo;