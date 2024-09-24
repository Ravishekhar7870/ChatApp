import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { authActions } from '../Store/AuthSlice'
import { userActions } from '../Store/UserSlice';
const baseQuery=fetchBaseQuery({
    baseUrl:import.meta.env.VITE_URL_SERVER,
    credentials:'include',
    prepareHeaders:(headers,{getState})=>{
        const token=getState().auth.token;
        if(token){
            headers.set('authorization',`Bearer ${token}`)
        }
        
        return headers
    }
})
const baseQueryWithReAuth=async(args,api,extraOptions)=>{
    let result=await baseQuery(args,api,extraOptions)
    // console.log(result)
    if(result?.error?.originalStatus===401){
        const refreshResult=await baseQuery('/api/v1/users/refreshAccessToken',api,extraOptions);
      
       if(refreshResult?.data){
        const user=api.getState().auth.user;
        api.dispatch(authActions.setCredentials({AccessToken:refreshResult.data.data.AccessToken}))
        api.dispatch(userActions.AddUser({curruser:refreshResult.data.data.user}))
        result=await baseQuery(args,api,extraOptions)
       }
       else{
        api.dispatch(authActions.logout())
       }
    }
    return result
}
export const ApiSlice=createApi({
    baseQuery:baseQueryWithReAuth,
    endpoints:builder=>({
        RefreshAcessToken:builder.query({
            query:()=>({
                url:'/api/v1/users/refreshAccessToken',
                method:'GET'
            })
        }),
        GetFriendList:builder.query({
            query:()=>({
                url:'/api/v1/friends/GetUserFriends',
                method:'GET'
            })
        }),
        GetPendingList:builder.query({
            query:()=>({
                url:'/api/v1/friends/GetFriendRequest',
                method:'GET'
            })
        }),
        GetChatdetails:builder.query({
            query:({id})=>({
               url: `/api/v1/friends/getChatdetils/${id}`,
               method:"GET"
            })
        }),
        GetChatMessage:builder.query({
            query:({id,page})=>({
               url: `/api/v1/messages/getMessage/${id}?page=${page}`,
               method:"GET",
               
            }),
            keepUnusedDataFor:0,
        }),
        Sendattachment:builder.mutation({
            query:(data)=>({
                url:'/api/v1/messages/sendMessage',
                method:"POST",
                credentials:"include",
                body:data,
            }),
            
        }),
        ChangeProfilePic:builder.mutation({
            query:(data)=>({
                url:'/api/v1/users/changeProfilePic',
                method:"POST",
                credentials:"include",
                body:data,
            }),
            
        })
    }),
    
    
})

export const{
    useGetChatdetailsQuery,useGetChatMessageQuery,useSendattachmentMutation,useChangeProfilePicMutation
}=ApiSlice