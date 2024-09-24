import mongoose,{Schema} from "mongoose";
const PendingRequestSchema=new Schema({
       userRequest:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
       },
       currUser:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
       }
},{
  timestamps:true
})
export const PendingRequest=mongoose.model('PendingRequest',PendingRequestSchema)