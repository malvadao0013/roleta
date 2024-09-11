import 'express';
import 'express-recaptcha';

declare module 'express' {
  interface Request {
    user?: any;
  }
}

declare module 'socket.io' {
  interface Socket {
    user?: any; // Use a interface SocketUser para tipar a propriedade user
  }
}

declare module 'express' {
  interface Request {
    recaptcha?: any;
  }
}