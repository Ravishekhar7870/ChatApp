
import { useDispatch } from 'react-redux'
import { authActions } from '../Store/AuthSlice'
import { useLogoutMutation } from '../utils/LogoutApiSlice'
import { useNavigate } from 'react-router-dom'
import { FriendActions } from '../Store/FriendsSlice'
import {PendingRequestActions} from '../Store/PendingRequestSlice'
import { userActions } from '../Store/UserSlice'
import toast from 'react-hot-toast'
import { getSocket } from '../Socket'
const useLogout=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [logout,{isloading}]=useLogoutMutation();
    const socket=getSocket();
    const Logout=async()=>{
        try {
            const res=await logout().unwrap();
            
            dispatch(authActions.logout());
            dispatch(FriendActions.Logout());
            dispatch(PendingRequestActions.logout());
            dispatch(userActions.Logout());
            socket.disconnect();
            navigate('/login')
         } catch (error) {
            const htmlContent=error.data;
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            const preTagContent = doc.querySelector('pre').innerHTML;
            const errorMessage = preTagContent.split('<br>')[0].replace('Error:', '').trim();
             toast.error(errorMessage)
         }
    }
    return {Logout}
    
}
export default useLogout