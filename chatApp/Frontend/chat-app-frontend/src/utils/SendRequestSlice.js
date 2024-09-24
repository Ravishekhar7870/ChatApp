import { ApiSlice } from "./ApiSlice";
export const SendRequestSlice=ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        sendrequest:builder.mutation({
            query:credentials=>({
                url:'/api/v1/friends/SendFriendRequest',
                method:'POST',
                body:{...credentials}
            })
        })
    })
})
export const {useSendrequestMutation}=SendRequestSlice