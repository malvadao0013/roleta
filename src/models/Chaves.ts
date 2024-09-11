import mongoose, { Schema, model, Document } from "mongoose";

const schema = new mongoose.Schema({
  chavepix:String
})



const Chaves = mongoose.model('chaves', schema)


export default Chaves