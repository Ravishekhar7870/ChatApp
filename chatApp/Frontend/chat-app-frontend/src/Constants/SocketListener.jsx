import React from 'react'
import { DELETE_CONVERSATION, DELETE_PENDINGREQUEST, NEW_MESSAGE_ALERT, ONLINE_USER, REFETCH_FRIENDLIST, REFETCH_PENDINGREQUEST } from './Events'
import { useEffect } from 'react'
import { getSocket } from '../Socket'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { PendingRequestActions } from '../Store/PendingRequestSlice'
import { useSelector } from 'react-redux'
import { FriendActions } from '../Store/FriendsSlice'
import getRoute from '../Features/getLocation'
import { MessageAlertActions } from '../Store/MessageAlertSlice'
import { OnlineUserActions } from '../Store/OnlineUserSlice'
const SocketListener=()=>{
    const socket=getSocket();
    const dispatch=useDispatch();
   //console.log("listened");
   
    const handlePendingRefetch=useCallback((data)=>{
          //console.log("listened socket event",data);
          dispatch(PendingRequestActions.AddPendingList({newPending:data?.userRequest}))
    },[socket])
  //   const socketEvents={
  //     [REFETCH_PENDINGREQUEST]:handlePendingRefetch
  //  }
  const handleDeleteRequest=useCallback((data)=>{
    //console.log("delete request listened",data);
    dispatch(PendingRequestActions.DeletePendingRequest({userid:data?.userId}))
  },[socket])
 const handleAddFriend=useCallback((data)=>{
      //console.log("add friend request listend",data)
      dispatch(FriendActions.AddFriend({newfriend:data}))

 },[socket])
 const handleDeleteFriend=useCallback((data)=>{
       //console.log("delete friend",data);
       dispatch(FriendActions.DeleteFriend({userid:data.conversationId}))
 },[socket])
 const handleMessageAlert=useCallback((data)=>{
  const route=window.location.pathname;
     //console.log("in route",route)
if (!route.startsWith('/Message')) {
     dispatch(MessageAlertActions.AddMessageAlert({chatId:data?.chatId}))
} else {
  
  const id = route.split('/')[2]; 
  if(data?.chatId!==id){
    //console.log("message alert",data)
    dispatch(MessageAlertActions.AddMessageAlert({chatId:data?.chatId}))
  }
}

 },[socket])
 const handleOnlineUser=useCallback((data)=>{
     dispatch(OnlineUserActions.UpdateOnlineUser({OnlineUser:data}))
 },[socket])
    useEffect(()=>{
      socket.on(REFETCH_PENDINGREQUEST,handlePendingRefetch)
      socket.on(DELETE_PENDINGREQUEST,handleDeleteRequest);
      socket.on(REFETCH_FRIENDLIST,handleAddFriend);
      socket.on(DELETE_CONVERSATION,handleDeleteFriend)
      socket.on(NEW_MESSAGE_ALERT,handleMessageAlert);
      socket.on(ONLINE_USER,handleOnlineUser);
   return ()=>{
     
         
         socket.off(REFETCH_PENDINGREQUEST,handlePendingRefetch);
         socket.off(DELETE_PENDINGREQUEST,handleDeleteRequest);
         socket.off(REFETCH_FRIENDLIST,handleAddFriend);
         socket.off(DELETE_CONVERSATION,handleDeleteFriend);
         socket.off(NEW_MESSAGE_ALERT,handleMessageAlert);
         socket.off(ONLINE_USER,handleOnlineUser);
   }
    },[socket])
 
  return (
    <></>
  )
}


export default SocketListener