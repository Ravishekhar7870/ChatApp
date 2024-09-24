import React from 'react'
import PendingItem from '../components/PendingItem'
import { useSelector } from 'react-redux'
import { PendingRequestActions } from '../Store/PendingRequestSlice'
import { useDispatch } from 'react-redux'
import { useDeleterequestMutation } from '../utils/DeleteRequestSlice'
import { useAcceptrequestMutation } from '../utils/AcceptRequestSlice'
import { FriendActions } from '../Store/FriendsSlice'

function Pendinglist() {
  const pendinglist=useSelector((store)=> store.PendingRequest.pendinglist)
   const dispatch=useDispatch();
   
   
  const [deleterequest]=useDeleterequestMutation();
  const [acceptrequest]=useAcceptrequestMutation();
  const handleAccept=async(user)=>{
      const userid=user._id;
      try {
        const res=await acceptrequest({userid:userid}).unwrap();
        dispatch(PendingRequestActions.DeletePendingRequest({userid:userid}));
       
        
      } catch (error) {
        //console.log(error);
      }
  }
  const handleDelete=async(userid)=>{
       
       try {
        const res=await deleterequest({userid:userid}).unwrap();
       
        dispatch(PendingRequestActions.DeletePendingRequest({userid:userid}));
       } catch (error) {
        //console.log(error);
       }
  }
  return (
  
    <div
    className="w-full h-full p-4 bg-gray-800 shadow-md flex flex-col items-center justify-start overflow-auto"
    style={{ width: '100vw', height: '100vh' }}
  >
    <h2 className="text-xl font-semibold text-white mb-4 text-center w-full">
      Pending Request
    </h2>
    <ul className="space-y-4 w-full">
      {pendinglist.length > 0 ? (
        pendinglist.map((item, index) => (
          <li key={index} className="w-full max-w-sm mx-auto">
            <PendingItem item={item} key={index} handleAccept={handleAccept} handleDelete={handleDelete}/>
          </li>
        ))
      ) : (
        <li className="text-center text-white">No pending requests</li>
      )}
    </ul>
  </div>
  )
}

export default Pendinglist