import mongoose,{Schema} from "mongoose";
const messageSchema=new Schema(
    {
        content:{
            type:String
        },
        senderId:{
            type:Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        conversationId:{
            type:Schema.Types.ObjectId,
            ref:"conversation",
            required:true
        },
       
        attachments:[
            {
                public_id:{
                    type:String,
                    required:true
                },
                url:{
                    type:String,
                    required:true
                }
            }
        ],
       
    },
    {
        timestamps:true
    })
    export const Message=mongoose.model('Message',messageSchema);