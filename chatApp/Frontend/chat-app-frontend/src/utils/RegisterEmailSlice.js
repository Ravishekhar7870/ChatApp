import { ApiSlice } from "./ApiSlice";
export const RegisterEmailSlice=ApiSlice.injectEndpoints({
     endpoints:(builder)=>({
        registeremail:builder.mutation({
            query:credentials=>({
                url:'/api/v1/users/RegisterEmail',
                method:'POST',
                body:{...credentials}
            })
        })
     })
})
export const {useRegisteremailMutation}=RegisterEmailSlice