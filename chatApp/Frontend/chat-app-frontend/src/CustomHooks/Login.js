import { useDispatch } from "react-redux";
import { useLoginMutation } from "../Store/AuthApiSlice";
import { authActions } from "../Store/AuthSlice";
import { FriendActions } from "../Store/FriendsSlice";
import { ApiSlice } from "../utils/ApiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userActions } from "../Store/UserSlice";
const useLogin=()=>{
   const dispatch=useDispatch();
   const [login,{isloading}]=useLoginMutation();
   const navigate=useNavigate();
   const [TriggerGetFriendList] = ApiSlice.endpoints.GetFriendList.useLazyQuery();
   const [TriggerGetPendingList]=ApiSlice.endpoints.GetPendingList.useLazyQuery();
   const list=useSelector((store)=> store.friend.friendlist)
   const pendinglist=useSelector((store)=> store.PendingRequest.pendinglist);
   const Login=async(userinput)=>{
      if(!verifyUserinput(userinput)){
        return;
      }
      try {
        const {email,password}=userinput;
        const res=await login({email,password}).unwrap()
        
        dispatch(authActions.setCredentials({AccessToken:res.data.AccessToken}));
        dispatch(userActions.AddUser({curruser:res.data.user}))
       await getlist();
      await getpendinglist();
        navigate('/')
       
       } catch (error) {
        const htmlContent=error.data;
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const preTagContent = doc.querySelector('pre').innerHTML;
        const errorMessage = preTagContent.split('<br>')[0].replace('Error:', '').trim();
         toast.error(errorMessage)
      
       }
   }
   function verifyUserinput(userinput){
    const {email,password}=userinput;
    if(!email || !password){
      toast.error("please enter all the details")
      return false;
    }

    return true;
}
const getlist = async () => {
  try {
      const response = await TriggerGetFriendList()
      const flist = response?.data?.data;
     
      flist.map((item) => {
         
          if(!list.includes(item)){
              
          dispatch(FriendActions.AddFriendlist({ newfriend: item }))
          }
      })
  } catch (error) {
      //console.log(error.message)
  }
}
const getpendinglist=async()=>{
  try {
    const response = await TriggerGetPendingList();
                
                const plist=response.data.data
                plist?.map((item) => {
                   
                    if(!pendinglist.includes(item.userRequest)){
                        
                    dispatch(PendingRequestActions.AddPendingList({newPending:item.userRequest}))
                    }
                })
  } catch (error) {
    //console.log(error.message);
  }
}

return {Login}
}
export default useLogin