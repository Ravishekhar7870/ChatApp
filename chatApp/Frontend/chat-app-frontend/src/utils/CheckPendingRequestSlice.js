import { ApiSlice } from "./ApiSlice";
export const checkPendingRequestSlice=ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        checkpending:builder.mutation({
            query:credentials=>({
                url:'/api/v1/friends/checkPendingRequest',
                method:'POST',
                body:{...credentials}
            })
        })
    })
})
export const {useCheckpendingMutation}=checkPendingRequestSlice;