import mongoose,{Schema} from "mongoose";
const conversationSchema=new Schema(
    {
        
        participants:[
            {
                type:Schema.Types.ObjectId,
                ref:'user',
                required:true
            }
        ],
     
    },
    {})
    export const conversation=mongoose.model('conversation',conversationSchema);