import { useDispatch } from "react-redux";
import { ApiSlice } from "../utils/ApiSlice";
import { PendingRequestActions } from "../Store/PendingRequestSlice";
import { useEffect,useRef } from "react";
import { useSelector } from "react-redux";
const getpendinglist=()=>{
   
   const pendinglist=useSelector((store)=> store.PendingRequest.pendinglist);
   const dispatch=useDispatch();
   const hasRenderd=useRef(false);
    const [TriggerGetPendingList]=ApiSlice.endpoints.GetPendingList.useLazyQuery();
    useEffect(() => {
        const getlist = async () => {
            try {
                const response = await TriggerGetPendingList();
                const plist=response?.data?.data
               
                plist?.map((item) => {
                   
                    if(!pendinglist.includes(item.userRequest)){
                    dispatch(PendingRequestActions.AddPendingList({newPending:item?.userRequest}))
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
export default getpendinglist