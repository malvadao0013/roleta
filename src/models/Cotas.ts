import mongoose, { Schema, model, Document } from "mongoose";

const schema = new mongoose.Schema({
  id:String,
  numero:String,
  id_rifa:String,
  quantidade:String,
  valor:{ type: Number, default: 0.0 },
  nome:String,
  email:String,
  cpf:String

})



const Cotas = mongoose.model('cotas', schema)


export default Cotas