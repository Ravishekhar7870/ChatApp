import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import { ApiSlice } from "../utils/ApiSlice";
import FriendSlice from "./FriendsSlice";
import PendingRequestSlice from "./PendingRequestSlice";
import MessageAlertSlice from "./MessageAlertSlice";
import UserSlice from "./UserSlice";
import OnlineUserSlice from "./OnlineUserSlice";

const chatAppStore=configureStore({
    reducer:{
        [ApiSlice.reducerPath]:ApiSlice.reducer,
        auth:authSlice.reducer,
        friend:FriendSlice.reducer,
        Curruser:UserSlice.reducer,
        PendingRequest:PendingRequestSlice.reducer,
        MessageAlert:MessageAlertSlice.reducer,
        OnlineUser:OnlineUserSlice.reducer
    }
    ,
    middleware:getDefaultMiddleware=>
        getDefaultMiddleware().concat(ApiSlice.middleware),
    devTools:true
})

export default chatAppStore