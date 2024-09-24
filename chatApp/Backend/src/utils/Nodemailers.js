import express from 'express'
import nodemailer from 'nodemailer'
const sendEmail=async({from,to,subject,text})=>{
    try {
        const mailoptions=({
            from,
            to,
            subject,
            text
        })
        const Transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                password:process.env.PASS
            }
        });
        return await Transporter.sendMail(mailoptions)
    } catch (error) {
        console.log("something went wrong",error.message);
    }
}
export default sendEmail