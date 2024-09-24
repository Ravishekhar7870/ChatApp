import jwt  from 'jsonwebtoken'
import { user } from '../models/user.models.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { Apierror } from '../utils/Apierror.js'
export const verifyjwt=asyncHandler(async(req,res,next)=>{
    try {
        const token=req.cookies?.AcessToken
        
        
        if(!token){
            throw new Apierror(401,"invalid Acesss")
        }
            const verifiedtoken=jwt.verify(token,"gdflgjkfhsgdufhgeurthhfsdgjksbgjksbgdjkbghjkdsbfjkskhlhhdjkghsdgkdhg");
            const loggedinuser=await user.findById(verifiedtoken._id);
            if(!loggedinuser){
                throw new Apierror(401,"user is not valid");
            }
            req.user=loggedinuser;
            next();
        
    } catch (error) {
        throw  new Apierror(401,error)
    }
})
