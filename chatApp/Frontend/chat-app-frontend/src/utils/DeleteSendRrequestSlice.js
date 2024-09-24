import { ApiSlice } from "./ApiSlice";
export const deleteSendRequestSlice=ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        deletesendrequest:builder.mutation({
            query:credentials=>({
                url:'/api/v1/friends/deleteSendRequest',
                method:'POST',
                body:{...credentials}
            })
        })
    })
})
export const {useDeletesendrequestMutation}=deleteSendRequestSlice