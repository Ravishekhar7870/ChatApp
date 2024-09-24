import { ApiSlice } from "./ApiSlice";
export const AcceptRequestSlice=ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        acceptrequest:builder.mutation({
            query:credentials=>({
                url:'/api/v1/friends/AcceptFriendrequest',
                method:'POST',
                body:{...credentials}
            })
        })
    })
})
export const {useAcceptrequestMutation}=AcceptRequestSlice