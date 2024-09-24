import React from 'react'
import FriendItem from '../components/FriendItem'
import { useSelector } from 'react-redux'
import { useDeletefriendMutation } from '../utils/DeleteFriendSlice'
import { FriendActions } from '../Store/FriendsSlice'
import { useDispatch } from 'react-redux'
function Friendlist() {
    const flist=useSelector((store)=> store.friend.friendlist)
    const [deletefriend]=useDeletefriendMutation();
    const dispatch=useDispatch();
    const onDelete=async(userid)=>{
        //console.log(userid);
        try {
          const res=await deletefriend({userid}).unwrap();

        } catch (error) {
          //console.log(error)
        }
    }
  return (
    
    <div className="w-full h-full p-4 bg-gray-800 shadow-md  flex flex-col items-center justify-start" style={{ width: '100vw', height: '100vh' }}>
    <h2 className="text-xl font-semibold text-white mb-4 text-center w-full">Friend List</h2>
    <ul className="space-y-4 w-full">
      {flist.length && flist.map((item) => (
        <li key={item._id} className="w-full max-w-sm mx-auto">
          <FriendItem friend={item} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  </div>
    
    
  )
}

export default Friendlist