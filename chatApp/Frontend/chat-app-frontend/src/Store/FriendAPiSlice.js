import { ApiSlice } from "../utils/ApiSlice";
export const FriendApiSlice=ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getfriendlist:builder.query({
            query:()=>'/api/v1/users/getfriendList',
            keepUnusedDataFor:'10s'
        })
    })
})
export const {
    useGetFriendList
}=FriendApiSlice