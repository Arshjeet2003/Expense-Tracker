const mongoose= require('mongoose');
const {Schema} = mongoose;

const StockSchema = new mongoose.Schema(
  {
    assetStock:String,
    valueStock:Number,
  date:{
    type: Date,
    default: Date.now
},
  }
)
const Stock = mongoose.model('stocks',StockSchema);
module.exports = Stock;