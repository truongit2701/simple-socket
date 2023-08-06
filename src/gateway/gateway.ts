import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { log } from 'console';
import { Server } from 'socket.io'

@WebSocketGateway()
export class MyGateway implements OnModuleInit {

    @WebSocketServer()
    server: Server


    onModuleInit() {
        this.server.on('connection', (socket) => {
            log(socket.id, ' :id này đã connect')
        })
    }


    // lắng nghe tin nhắn 
    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body:any){
        console.log(body, ' : tin nhắn');
        // nhận được tin ở trên => emit lên server
        this.server.emit('onMessage', {
            msg: "New Message",
            content: body
        })
    }



}

