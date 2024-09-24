import { ApiSlice } from "./ApiSlice";
export const DeleteRequestSlice=ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        deleterequest:builder.mutation({
            query:credentials=>({
                url:'/api/v1/friends/DeleteRequest',
                method:'POST',
                body:{...credentials}
            }),
        }),
    }),
    overrideExisting: true,
})
export const {useDeleterequestMutation}=DeleteRequestSlice;