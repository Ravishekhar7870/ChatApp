import { createSlice } from "@reduxjs/toolkit";
const PendingRequestSlice=createSlice({
    name:'PendingRequest',
    initialState:{
        pendinglist:[],
    },
    reducers:{
        AddPendingList:(state,action)=>{
            const {newPending}=action.payload;
            state.pendinglist.push(newPending)
        },
        DeletePendingRequest:(state,action)=>{
            const {userid}=action.payload;
            const currPendinglist=state.pendinglist;
            const newlist=currPendinglist.filter((item)=>{
                return item._id!==userid
            })
            state.pendinglist=newlist
        },
        logout:(state,action)=>{
            state.pendinglist=[]
        }
    }
})
export const PendingRequestActions=PendingRequestSlice.actions
export default PendingRequestSlice;