import express from 'express'
import {user} from '../models/user.models.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import {Apierror} from '../utils/Apierror.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import mongoose from 'mongoose'
import { PendingRequest } from '../models/PendingRequest.model.js'
import { EmitEvent } from '../utils/Emit.js'
import { DELETE_CONVERSATION, DELETE_PENDINGREQUEST, REFETCH_PENDINGREQUEST } from '../Constant/Event.js'
import { REFETCH_FRIENDLIST } from '../Constant/Event.js'
import { conversation } from '../models/conversation.model.js'
const AcceptFriendRequest=asyncHandler(async(req,res)=>{
    try {
        const {userid}=req.body;
        const loggedinuser=req.user._id;
        
       if(!userid){
        throw new Apierror(400,"no user found");
       }
      
       const usertobeAccepted=await user.findById(userid);
       if(!usertobeAccepted){
        throw new Apierror(400,"no user found");
       }
       const pendingrequest=await PendingRequest.findOne({
        $and:[{
          userRequest:usertobeAccepted._id
          
        },
        {
          currUser:loggedinuser
        }
      ]
       })
       if(!pendingrequest){
        throw new Apierror(400,"no such Request found");
       }
       
       
       await PendingRequest.deleteOne({
          $and:[{
            userRequest:usertobeAccepted._id
            
          },
          {
            currUser:loggedinuser
          }
        ]
       })
      const conv= await conversation.create({
        participants:[
          usertobeAccepted._id,
          loggedinuser
        ]
       })
       EmitEvent(req,REFETCH_FRIENDLIST,conv.participants,{_id:conv._id,currUser:usertobeAccepted})
       return res.status(200).json(
        new ApiResponse("users successfully became friend",200,conv)
       )
    } catch (error) {
        return new Apierror(500,error.message);
        ////console.log("something went wrong",error.message)
    }
})
const SendFriendRequest=asyncHandler(async(req,res)=>{
    try {
        const {userid}=req.body;
        const loggedinuser=req.user._id;
        const userRequest=await user.findById(loggedinuser)
        const userToRequest=await user.findById(userid);
        if(!userToRequest){
            throw new Apierror("user doesnt Exist");
        }
        const newRequest= await PendingRequest.create({
            userRequest:loggedinuser,
            currUser:userToRequest._id
        })
        EmitEvent(req,REFETCH_PENDINGREQUEST,[userToRequest._id],{userRequest:userRequest});
        return res.status(200).json(
            new ApiResponse("friend Request sent",200,newRequest)
        )

    } catch (error) {
        throw new Apierror(500,"something went wrong",error.message);
        //console.log("something went wrong",error.message);
    }
})
const getuserFriends=asyncHandler(async(req,res)=>{
     try {
      const email=req.user.email
      const Friends=await conversation.aggregate(
        [
          {
            $lookup: {
              from: 'users',
              localField: 'participants',
              foreignField: '_id',
              as: "userdetails"
            }
          },
          {
            $match: {
              "userdetails.email":email
            }
          },
          {
            $addFields: {
              
              userdetails:{
                $filter:{
                  input:"$userdetails",
                  as:"friend",
                  cond:{$ne:["$$friend.email", email]}
                }
              }
              
            }
          },
          {
            $addFields: {
                    currUser:{
                      $arrayElemAt:["$userdetails",0]
                    }
                  }
          },
          {
            $project: {
              currUser:1
            }
          }
        ]
      )
     
     return res.status(200).json(
      new ApiResponse("friend list successfully fetched",200,Friends)
     )
     } catch (error) {
      throw new Apierror(500,"something went wrong",error.message)
     }
})
const getfriendRequest=asyncHandler(async(req,res)=>{
  try {
    const email=req.user.email
  
   const Pendingrequest= await PendingRequest.aggregate(
      [
        {
          $lookup: {
            from: "users",
            localField :"currUser",
            foreignField: "_id",
            as: "currUser"
          }
        },
        {
          $addFields: {
            currUser:{
              $arrayElemAt:["$currUser",0]
            }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "userRequest",
            foreignField: "_id",
            as: "userRequest"
          }
        },
        {
          $addFields: {
            userRequest:{
              $arrayElemAt:["$userRequest",0]
            }
          }
        },
        {
          $match: {
            "currUser.email":email
          }
        },
        {
          $project: {
            userRequest:1
          }
        }
        
      ]
    )
   
    return res.status(200).json(
      new ApiResponse("user list fetched Sucessfully",200,Pendingrequest)
    )
  } catch (error) {
    throw new Apierror(500,"something went wrong",error.message)
  }
})
const deleteRequest=asyncHandler(async(req,res)=>{
  
    const {userid}=req.body;
    const loggedinuser=req.user;
    const userrequesttobedeleted=await user.findById(userid);
    if(!userrequesttobedeleted){
      throw new Apierror(400,"couldnt find user");
    }
    const pendingrequest=await PendingRequest.findOne({
      $and:[{
        userRequest:userrequesttobedeleted._id
        
      },
      {
        currUser:loggedinuser
      }
    ]
     })
     if(!pendingrequest){
      throw new Apierror(400,"no such Request found");
     }
    await PendingRequest.deleteOne({
      $and:[{
        userRequest:userrequesttobedeleted._id
        
      },
      {
        currUser:loggedinuser
      }
    ]
    })
    return res.status(200).json(
      new ApiResponse("request sucessfully deleted",200,{})
    )
  
})
const RemoveFriend=asyncHandler(async(req,res)=>{
    const friendid=req.body.userid;
    if(!friendid){
      throw new Apierror(400,"no id provided");
    }
    const currConv=await conversation.findById(friendid);
    if(!currConv){
      throw new Apierror(400,"no such Conversation exists");
    }
    await conversation.findByIdAndDelete(currConv._id);
    EmitEvent(req,DELETE_CONVERSATION,currConv.participants,{conversationId:currConv._id})
    return res.status(200).json(
      new ApiResponse("conversation successfully delete",200,{})
    )
})
const checkFriend=asyncHandler(async(req,res)=>{
      

})
const checkPendingRequest=asyncHandler(async(req,res)=>{
    const {userid}=req.body;
    const loggedinuser=req.user._id;
    const curruser=await user.findById(userid);
    if(!curruser){
      throw new Apierror(400,"no user found");
    }
    const pendingrequest=await PendingRequest.findOne({
      $and:[
        {
          userRequest:loggedinuser
        },
        {
          currUser:curruser._id
        }
      ]
    })
    if(!pendingrequest){
      throw new Apierror(400,"no such request exists");
    }
    res.status(200).json(
      new ApiResponse("request found successfully",200,pendingrequest)
    )
})
const deleteSendRequest=asyncHandler(async(req,res)=>{
    const {userid}=req.body
    const userrequest= await user.findById(userid);
    if(!userrequest){
      throw new Apierror(400,"user doesnt exist");
    }
    const loggedinuser=req.user._id;
    const pendingreq=await PendingRequest.findOne({
      $and:[
        {
          userRequest:loggedinuser
        },
        {
          currUser:userrequest._id
        }
      ]
    })
    if(!pendingreq){
      throw new Apierror(400,"such request does not exist");
    }
    await PendingRequest.findByIdAndDelete(pendingreq._id);
    EmitEvent(req,DELETE_PENDINGREQUEST,[userrequest._id],{userId:loggedinuser})
    res.status(200).json(
      new ApiResponse("request sucessfully deleted",200,{})
    )

})
const getChatDetails=asyncHandler(async(req,res)=>{
  const convId=req.params.id;
  const userid=req.user._id;
  if(!convId){
    throw new Apierror(200,"conv_id required")
  }
  
  const conversationId= new mongoose.Types.ObjectId(convId);
  const curruserId=new mongoose.Types.ObjectId(userid)
  const chatdetails= await conversation.aggregate([
    {
      $match:{
        "_id":conversationId
      }
    },
    {
        $addFields:{
          friend:{
            $filter: {
              input: "$participants",
              as: "participant",
              cond: { $ne: ["$$participant", curruserId] } // Exclude current user ID
            }
          }
        }
    },
    {
      $lookup:{
          from:"users",
          localField:"friend",
          foreignField:"_id",
          as:"friend"
      }
    }
  ])
 
  res.status(200).json(
    new ApiResponse("chat details succcessfully fetched",200,chatdetails)
  )

})
export {AcceptFriendRequest,SendFriendRequest,getuserFriends,getfriendRequest,deleteRequest,RemoveFriend,checkFriend,checkPendingRequest,deleteSendRequest,getChatDetails}