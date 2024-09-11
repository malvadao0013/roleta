import mongoose, { Schema, model, Document } from "mongoose";




interface User extends Document {
  nome:string;
  usuario:string;
  senha:string;
  token:string;
}



const schema = new mongoose.Schema({
  nome:String,
  usuario:String,
  senha:String,
  token:String
})



const User = mongoose.model<User>('users', schema)


export default User