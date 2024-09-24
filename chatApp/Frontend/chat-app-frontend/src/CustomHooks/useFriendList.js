import { ApiSlice } from "../utils/ApiSlice"
import { useSelector } from "react-redux"
import { FriendActions } from "../Store/FriendsSlice"
import { useDispatch } from "react-redux"

import { useEffect ,useRef} from "react"
const FriendList = () => {
    const [TriggerGetFriendList] = ApiSlice.endpoints.GetFriendList.useLazyQuery();
  const list=useSelector((store)=> store.friend.friendlist)
 
  const hasRenderd=useRef(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const getlist = async () => {
            try {
                const response = await TriggerGetFriendList()
                const flist = response?.data?.data;
                
                flist?.map((item) => {
                   //console.log("in friend",item)
                    if(!list.includes(item)){
                      
                    dispatch(FriendActions.AddFriendlist({ newfriend: item }))
                    }
                })
            } catch (error) {
                //console.log(error.message)
            }
        }
        if(hasRenderd.current){
            getlist();
        }
        else{
            hasRenderd.current=true;
        }
       
    }, [])




}
export default FriendList;