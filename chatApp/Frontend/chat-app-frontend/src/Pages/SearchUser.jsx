import React, { useRef, useState } from 'react'
import PendingItem from '../components/PendingItem'
import { useSearchuserMutation } from '../utils/SearchUserSlice';
import SearchedItem from '../components/SearchedItem';
import RecentSearchItem from '../components/RecentSearchItem';
import { useSendrequestMutation } from '../utils/SendRequestSlice';
import { useDeletefriendMutation } from '../utils/DeleteFriendSlice';
import { useDispatch } from 'react-redux';
import { FriendActions } from '../Store/FriendsSlice';
import { useCheckpendingMutation } from '../utils/CheckPendingRequestSlice';
import { useSelector } from 'react-redux';
import { useDeletesendrequestMutation } from '../utils/DeleteSendRrequestSlice';
function SearchUser() {
  const user=useRef();
  const [searchuser,{isloading}]=useSearchuserMutation();
  const [searcheduser,setuser]=useState();
  const [issearched,setsearch]=useState(false);
 const [sendrequest]=useSendrequestMutation();
 const [deletefriend]=useDeletefriendMutation();
 const dispatch=useDispatch();
 const [checkpending]=useCheckpendingMutation();
 const [isfriend,setfriend]=useState(false);
 const [currfriend,setCurrfriend]=useState()
 const [ispending,setpending]=useState(false);
const [deletesendrequest]=useDeletesendrequestMutation();
 const flist=useSelector((store)=> store.friend.friendlist)
const handlesearch=async()=>{
  const userdetail=user.current.value;
   try {
    const res=await searchuser({userdetail}).unwrap();
    const curruser=res.data;
    setuser(curruser);
    setsearch(false)
    flist.map((item)=>{
      if(item.currUser._id===curruser._id){
          setfriend(true);
          setCurrfriend(item._id);
      }
      
    })
    try {
      const pres=await checkpending({userid:curruser._id}).unwrap();
      setpending(true);
    } catch (error) {
      
      setpending(false);
    }
    
    
   } catch (error) {
    setsearch(true)
    setfriend(false);
    setpending(false);
    //console.log(error);
   }
}
const handlesend=async(userid)=>{
  //console.log(userid);
   try {
    const res=await sendrequest({userid}).unwrap();
    //console.log(res);
    setpending(true);
    
   } catch (error) {
    //console.log(error)
   }
}
const handledelete=async(userid)=>{
     
  try {

    const res=await deletefriend({userid:currfriend}).unwrap();
    dispatch(FriendActions.DeleteFriend({userid:currfriend}))
    setfriend(false);
  } catch (error) {
    //console.log(error);
  }
}
const handledeleteRequest=async(user)=>{
  //console.log(user);
  try {
    const res=await deletesendrequest({userid:user._id}).unwrap();
    //console.log(res);
    setpending(false);
  } catch (error) {
    //console.log(error);
  }
  
}

  return (

    <div className="bg-gray-900 text-white flex flex-col" style={{"width":"100vw","height":"100vh"}}>
    <div className="flex items-center justify-center p-4 bg-gray-800 sticky top-0 z-10">
      <input
        type="text"
        className="border border-gray-600 bg-gray-700 text-white rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Search..." ref={user}
      />
      <button
        className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700" onClick={handlesearch}
      >
        Search
      </button>
    </div>
    
    <div className="p-4">
      {/* First UL */}
      <ul className="space-y-4 w-full">
        
      {issearched ? (
        <li className="w-full max-w-sm mx-auto">
          <h3 className="text-center text-lg font-medium">No user found</h3>
        </li>
      ) : (
        searcheduser && (
          <li className="w-full max-w-sm mx-auto">
            <SearchedItem user={searcheduser} handlesend={handlesend} handledelete={handledelete}  isfriend={isfriend} ispending={ispending} handledeleteRequest={handledeleteRequest}/>
          </li>
        )
      )}
      </ul>
  
      
    </div>
  </div>
  


  )
}

export default SearchUser