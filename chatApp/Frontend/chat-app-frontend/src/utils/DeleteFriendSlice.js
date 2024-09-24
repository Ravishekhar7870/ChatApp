import { ApiSlice } from "./ApiSlice";
export const  DeleteFriendSlice=ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        deletefriend:builder.mutation({
            query:credentials=>({
                url:'/api/v1/friends/RemoveFriend',
                method:'POST',
                body:{...credentials}
            })
        })
    })
})
export const {useDeletefriendMutation}=DeleteFriendSlice