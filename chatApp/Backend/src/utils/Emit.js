import { UsersSocketIds } from "../app.js";
const EmitEvent=(req,event,users,data)=>{
   const io=req.app.get('io');
   console.log(`emmitting event ${event} with user ${users}`)
   const membersockets=users.map((user)=>UsersSocketIds.get(user?.toString()));
   console.log(`emitting to ${membersockets}`)
   io.to(membersockets).emit(event,data);
}
export {EmitEvent}