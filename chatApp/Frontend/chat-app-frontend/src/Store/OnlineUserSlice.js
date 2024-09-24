import { createSlice } from "@reduxjs/toolkit";
const OnlineUserSlice=createSlice({
    name:'OnlineUser',
    initialState:{
       OnlineUser:[]
    },
    reducers:{
        UpdateOnlineUser:(state,action)=>{
            state.OnlineUser=action.payload.OnlineUser
        }
    }
})
export const OnlineUserActions=OnlineUserSlice.actions
export default OnlineUserSlice