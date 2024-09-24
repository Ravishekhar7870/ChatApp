import {createSlice} from '@reduxjs/toolkit'
import { useEffect } from 'react';

const authSlice=createSlice({
    name:"auth",
    initialState:{
        
        token:null
    },
    reducers:{
        setCredentials:(state,action)=>{
          const {AccessToken}=action.payload;
          
          state.token=AccessToken
          
        },
        logout:(state,actions)=>{
            
            state.token=null
        }
    }
})


export const authActions=authSlice.actions
export default authSlice;

export const selectCurrentToken=(state)=>state.auth.token;