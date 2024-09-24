import { ApiSlice } from "./ApiSlice";
export const RegisterApiSlice=ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(formdata)=>{
                console.log(formdata)
                return {
                url:'/api/v1/users/registerUser',
                method:'POST',
                headers: {
                    'Content-Type': 'multipart/form-data;'
                  },
                body:{formdata},
                formdata:true
                };
            }
        })
    })
})
export const {useRegisterMutation}=RegisterApiSlice