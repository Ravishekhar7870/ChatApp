import { ApiSlice}  from "../utils/ApiSlice";
export const AuthApiSlice=ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login: builder.mutation({
            query:credentials=>({
                url:'/api/v1/users/loginUser',
                method:'POST',
                body:{...credentials}
            })
        })
    })
})
export const {useLoginMutation}=AuthApiSlice