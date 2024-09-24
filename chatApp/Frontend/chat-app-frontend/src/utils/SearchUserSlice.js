import { ApiSlice } from "./ApiSlice";
export const SearchUserSlice=ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        searchuser:builder.mutation({
            query:credentials=>({
                url:'/api/v1/users/getRequestUser',
                method:'POST',
                body:{...credentials}
            })
        })
    })
})
export const {useSearchuserMutation}=SearchUserSlice