import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"
dotenv.config()
import cors from 'cors'
import {Server} from 'socket.io'
import {createServer} from 'http'
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from './Constant/Event.js';
import { ONLINE_USER } from './Constant/Event.js'
import { Message } from './models/message.model.js';
import { SocketAuth } from './middlewares/SocketAuth.middleware.js'
const app=express();

const server=createServer(app);
const io=new Server(server,{
  cors:{
    origin:process.env.FRONTEND_URL,
    credentials: true
  }
})
app.set('io',io)
app.use(cors(
    {
        origin:process.env.FRONTEND_URL,
        credentials: true
      }
))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static('public'))
app.use(cookieParser());
import userrouter from './routes/user.routes.js'
import messagerouter from './routes/message.route.js'
import friendroute from './routes/friend.route.js'
app.use('/api/v1/users',userrouter)
app.use('/api/v1/messages',messagerouter)
app.use('/api/v1/friends',friendroute)
const UsersSocketIds=new Map();
const onlineUser=new Set();
io.use((socket,next)=>{
    cookieParser()(socket.request,socket.request.res,async(err)=>await SocketAuth(err,socket,next)   
    )
})
io.on('connection',(socket)=>{
    const User=socket.user
    
        onlineUser.add(User?._id.toString());
    
    
    io.emit(ONLINE_USER,Array.from(onlineUser))
    UsersSocketIds.set(User?._id.toString(),socket.id);
    socket.on(NEW_MESSAGE,async({chatId,message,members})=>{
      
        const MessageForRealtime={
            content:message,
            attachments:[],
           sender:{ _id:User._id,
            fullname:User.fullname,
            profilepic:User.profilepic
           },
           chat:chatId,
           createdAt: new Date().toISOString(),

        };
        const MessageForDb={
            content:message,
            senderId:User._id,
            conversationId:chatId,

        }
        
        const memberSocket=members.map((user)=> UsersSocketIds.get(user?.toString()));
        io.to(memberSocket).emit(NEW_MESSAGE,{
            chatId:chatId,
            message:MessageForRealtime
        })
        io.to(memberSocket).emit(NEW_MESSAGE_ALERT,{
            chatId:chatId,
            senderId:User._id
        })
        try {
            await Message.create(MessageForDb);
        } catch (error) {
            
        }
    })
    socket.on('disconnect',()=>{
        UsersSocketIds.delete(User._id.toString());
        onlineUser.delete(User._id.toString());
        io.emit(ONLINE_USER,Array.from(onlineUser))
    })
})
export {app,server,UsersSocketIds}

