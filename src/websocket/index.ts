import {io} from 'socket.io-client';

let socket:any
export function initMessage(){
     socket = io("http://localhost:3300");

    socket.on('connect',()=>{
        console.log("连击成功");
    })
}

// emit on

export const message = {
    emit(...args:any[]){
    return socket.emit(...args);
    },
    on(...args:any[]){
        return socket.on(...args);
    }
}