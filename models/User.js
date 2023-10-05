import mongoose from "mongoose";

let userSchema=new mongoose.Schema({
    name:{type : String,required:true},
    email:{type : String,required:true,unique:true},
    password:{type : String,required:true},
    isAdmin:{type : Boolean,default:false}
},{timestamps:true});

let User=mongoose.model("User",userSchema);

export default User;