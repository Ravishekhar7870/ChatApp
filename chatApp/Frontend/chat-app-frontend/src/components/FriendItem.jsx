import React from 'react'
import { useDispatch } from 'react-redux'
import { FriendActions } from '../Store/FriendsSlice'
function FriendItem({friend,onDelete}) {
   
    
  return (
    <div className="flex items-center justify-between p-2 bg-gray-700 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden">
          {/* Placeholder for avatar */}
          <img
            src={friend.currUser.profilepic}
            alt="Friend Name"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-lg font-medium text-white">{friend.currUser.fullname}</span>
      </div>
      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition" onClick={()=> onDelete(friend._id)}>
        Remove
      </button>
    </div>
  )
}

export default FriendItem