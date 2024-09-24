import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { authActions } from "../Store/AuthSlice";
import { ApiSlice } from "../utils/ApiSlice";
import { userActions } from "../Store/UserSlice";
const useInitialAuth=(setloading)=>{
    const dispatch=useDispatch();
    const token=useSelector((state)=>state.auth.token)
    const [triggerRefreshAccessToken] = ApiSlice.endpoints.RefreshAcessToken.useLazyQuery()
    // //console.log(token)
    useEffect(()=>{
        const refreshAccessToken=async()=>{
            if(!token){
                try {
                    const result=await triggerRefreshAccessToken()
                   
                    if(result?.data){
                        
                        dispatch(authActions.setCredentials({AccessToken:result.data.data.AccessToken}))
                        dispatch(userActions.AddUser({curruser:result.data.data.user}))
                        setloading(false);
                    }

                    else{
                        dispatch(authActions.logout())
                        setloading(false);
                    }
                } catch (error) {
                    setloading(false);
                    dispatch(authActions.logout())
                }
            }
        }
        refreshAccessToken()
    },[dispatch,triggerRefreshAccessToken])
};
export default useInitialAuth