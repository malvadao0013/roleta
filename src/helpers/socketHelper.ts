import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';



interface Item {
    id: string;
    nome:string;
    mensagem:string;
    verificado:boolean
    imagem:string
    // Other properties of the 'item' object, if applicable
  }

interface Onlines {
  id:string,
  nome:string,
  verificado:boolean,
  tag:string,
  imagem:string
}

export async function addListOnline(id:String, user:any, array:any) {

}


export function disconnectListaUsuario(id:string, array: Item[]){
    return array.filter(item => item.id != id);
  }
export function findOneUser(id:string, array: Item[]){
    const newArray =  array.filter(item => item.id == id);
    return newArray[0];
}
export function verifyToken(socket: Socket){
    const cookie = socket.handshake.headers.cookie
    const token = extractTokenFromString(cookie as string)
    if(!token || token === null){
       
        
        return false;
    }

    jwt.verify(token, '1234567', (err:any, decoded:any)=>{
        if(err){
            
            
            return false;
        }
    })
    return true;
}

export function extractTokenFromString(inputString:string) {
  if (typeof inputString !== 'string') {
    // Handle the case when inputString is not a string
    return null; // Or throw an error, depending on your use case
  }
    const regex = /token=([^;]+)/; // Expressão regular para extrair o valor após "token="
    const match = inputString.match(regex);
  
    if (match && match[1]) {
      return match[1]; // Retorna o valor do token encontrado
    } else {
      return null; // Retorna nulo se o token não for encontrado na string
    }
  }