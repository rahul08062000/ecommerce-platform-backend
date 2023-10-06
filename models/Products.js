import mongoose, { Schema } from "mongoose";

let productSchema= new Schema({
    id:{type:String},
    title:{type:String},
    description:{type:String},
    price:{type:Number},
    discountPercentage:{type:Number},
    rating:{type:Number},
    stock:{type:Number},
    brand:{type:String},
    category:{type:String},
    thumbnail:{type:String},
    images:{type:[String]},
},{timestamps:true})

let Products=mongoose.model('Products',productSchema);


export default Products;