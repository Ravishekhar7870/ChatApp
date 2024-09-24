import { createSlice } from "@reduxjs/toolkit";
import getOrSaveFromStorage from "../Features/SaveAndGetLocalStorage";
import { NEW_MESSAGE_ALERT } from "../Constants/Events";
const MessageAlertSlice=createSlice({
    name:"MessageAlert",
    initialState:{
      MessageAlert:  getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,get:true}) || [
            {
                chatId:"",
                count:0
            }
        ]
    },
    reducers:{
        AddMessageAlert:(state,actions)=>{
             const ind=state.MessageAlert.findIndex(
                (item)=> item.chatId===actions.payload.chatId
             )
             if(ind!==-1){
                state.MessageAlert[ind].count+=1;
             }
             else{
                state.MessageAlert.push(
                    {
                        chatId:actions.payload.chatId,
                        count:1
                    }
                )
             }
             getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,value:state.MessageAlert,get:false});

        },
        ResetMessage:(state,actions)=>{
            const ind=state.MessageAlert.findIndex(
                (item)=> item.chatId===actions.payload.chatId
             )
             if(ind!==-1 && state.MessageAlert[ind].count!=0){
                state.MessageAlert[ind].count=0;
             }
             getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,value:state.MessageAlert,get:false});

        }
    }

})
export const MessageAlertActions=MessageAlertSlice.actions
export default MessageAlertSlice