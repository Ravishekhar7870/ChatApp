import { user } from "../models/user.models.js";
import { Apierror } from "../utils/Apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
 const SocketAuth=asyncHandler(async(err,socket,next)=>{
        try {
            
            if(err){
               return next(err)
            }
            const token=socket.request.cookies.AcessToken;
            
            const verifiedtoken=jwt.verify(token,"gdflgjkfhsgdufhgeurthhfsdgjksbgjksbgdjkbghjkdsbfjkskhlhhdjkghsdgkdhg")
            const loggedinuser=await user.findById(verifiedtoken._id).select('-password');
            if(!loggedinuser){
                throw new Apierror(401,'token is expired')
            }
           
            socket.user=loggedinuser
            return next();

        } catch (error) {
            //console.log(error.message);
          throw new Apierror(401,error.message)
        }
 })
export {SocketAuth}