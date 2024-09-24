import { ApiSlice } from "./ApiSlice";
export const LogoutApiSlice=ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        logout:builder.mutation({
            query:credentials=>({
                url:'/api/v1/users/logoutUser',
                method:'POST',
                body:{...credentials}
            })
        })
    })
})
export const {useLogoutMutation}=LogoutApiSlice