const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema & model
const DbSchema = new Schema({
   productName: {
       type: String,
       required: [true, 'Name field required']
   },
   quantity: {
       type: Number
   },
   price: {
       type: Number
   }

   //add geo location
});

const Passengers = mongoose.model('passengers', DbSchema); // from collections

module.exports = Passengers; 
