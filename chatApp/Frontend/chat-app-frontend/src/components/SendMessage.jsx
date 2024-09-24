import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BsSend } from "react-icons/bs"
import { BiPlusCircle } from "react-icons/bi";
import { getSocket } from '../Socket';
import { NEW_MESSAGE,NEW_MESSAGE_ALERT } from '../Constants/Events';

import Messages from './Messages'
import { useGetChatMessageQuery } from '../utils/ApiSlice';
import  {useInfiniteScrollTop} from '6pp'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast'
import { useSendattachmentMutation } from '../utils/ApiSlice';
function SendMessage({chatid,member,friend}) {
  const curruser=useSelector((store)=> store.Curruser.user)
    const containerRef=useRef();
   const message=useRef();
  const [ Sendattachment]=useSendattachmentMutation();
   const socket=getSocket();
  const [newmessages,setnewMessages]=useState([]);
  const [page,setpage]=useState(1)
  const bottomRef=useRef();
  const oldmessage=useGetChatMessageQuery({id:chatid,page}, {refetchOnMountOrArgChange: true});
 
  const {data:totalMessage,setData:setTotalMessage}=useInfiniteScrollTop(
    containerRef,
    oldmessage?.data?.data?.totalPages,
    page,
    setpage,
    oldmessage?.data?.data?.messages
  )
  // useEffect(() => {
   

  //   return () => {
  //     setnewMessages([]);
  //     setpage(1);
      
  //   };
  // }, [chatid]);
  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [newmessages]);
  const submitHandler=(event)=>{
    event.preventDefault();
    const currMessage=message.current.value;
    if(!currMessage.trim()){
      return;
    }
    socket.emit(NEW_MESSAGE,{chatId:chatid,message:currMessage,members:member})
    
    message.current.value="";
    
  }
  const handleAttachment=async(e)=>{
    
    const files=Array.from(e.target.files);
    if(files.length>5){
      toast.error("You can't send more than 5 file at one time");
  
    }
    const toastid=toast.loading("Sending files");
    try {
      const myForm=new FormData();
      myForm.append("chatid",chatid)
      files.forEach((file)=>{
        myForm.append("files",file);
      })
      const res=await Sendattachment(myForm);
      if(res?.data){
        toast.success("file sent sucessfully",{id:toastid})
      }
      else{
        toast.error("file failed to send",{id:toastid})
      }
    } catch (error) {
      toast.error("failed to send",{id:toastid})
    }

  }
  const handlenewMessageEvent=useCallback((data)=>{
      if(data.chatId!==chatid){
        return;
      }
      if(data && data.message){
       //console.log("message",data.message)
        setnewMessages((prev)=> [...prev,data.message])
      }
     
  },[chatid])
 
  
  useEffect(()=>{
    socket.on(NEW_MESSAGE,handlenewMessageEvent)
    return () => {
      socket.off(NEW_MESSAGE, handlenewMessageEvent);
    };
  },[socket,handlenewMessageEvent])
 
 const allMessages=[...totalMessage,...newmessages]

  return oldmessage.isLoading ? <></> :(
   <div className="flex flex-col h-screen">
      {/* Header (To: User Name) */}
      <div className="sticky top-0 bg-gray-800 text-white p-4 z-10">
      To: <span className="font-bold">{friend && friend?.fullname}</span>
      </div>

      {/* Messages Container */}
      <div className="flex-grow overflow-y-auto p-4" ref={containerRef}>
        {allMessages.map((item, index) => (
          <Messages key={index} message={item} user={curruser}/>
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* Form Component (Message Input) */}
      <form className="sticky bottom-0 flex items-center bg-gray-200 p-3 w-full rounded-lg" onSubmit={submitHandler}>
        {/* Plus Button */}
        <button
          type="button"
          className="flex items-center justify-center px-3 text-gray-500 hover:text-gray-700"
          onClick={() => document.getElementById('file-input').click()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>

        {/* Hidden file input */}
        <input id="file-input" type="file" className="hidden" multiple onChange={(e)=>handleAttachment(e)}/>

        {/* Message Input */}
        <input
          type="text"
          ref={message}
          className="flex-grow mx-3 p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          placeholder="Type a message"
        />

        {/* Send Button */}
        <button
          type="submit"
          className="flex items-center justify-center px-3 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12l7-7m0 0l7 7m-7-7v14"
            />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default SendMessage