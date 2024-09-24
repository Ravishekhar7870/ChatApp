import { createSlice } from "@reduxjs/toolkit";
const FriendSlice=createSlice({
    name:'friendlist',
    initialState:{
        friendlist:[],
    },
    reducers:{
        
        AddFriendlist:(state,actions)=>{
            const {newfriend}=actions.payload;
           
                state.friendlist.push(newfriend)
              
            
        },
        AddFriend:(state,actions)=>{
             const {newfriend}=actions.payload;
             state.friendlist.push(newfriend)
        },
        DeleteFriend:(state,actions)=>{
            const {userid}=actions.payload
            const currlist=state.friendlist;
             const newlist=currlist.filter((item)=>{
                return item._id!==userid;
             })
             state.friendlist=newlist

        },
        Logout:(state,actions)=>{
           state.friendlist=[]
        }
    }
})
export const FriendActions=FriendSlice.actions
export default FriendSlice