import mongoose, { Schema, model, Document } from "mongoose";

const schema = new mongoose.Schema({
  id:String,
  titulo:String,
  descricao:String,
  valor:{ type: Number, default: 0.0 },
  data_sorteio:String,
  foto:String,
  primeiroLugar:String,
  segundoLugar:String,
  terceiroLugar:String

})



const Rifa = mongoose.model('rifas', schema)


export default Rifa