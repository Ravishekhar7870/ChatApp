import express from 'express'
import dotenv from "dotenv"
dotenv.config()
import { dbconnect } from './db/index.js';
import { app } from './app.js';
import { server } from './app.js';




dbconnect()
.then(()=>{
    server.listen(process.env.PORT || 9000,()=>{
        //console.log(`app is listening on ${process.env.PORT}`)
    })
})
.catch((err)=>{
//console.log("connecton failed",err);
})