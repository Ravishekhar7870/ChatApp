import React from 'react'
import { useSelector } from 'react-redux'

function MessageCard({friend,onSelect}) {
   
    const MessageNotification=useSelector((store)=> store.MessageAlert.MessageAlert)
    const OnlineUser=useSelector((store)=> store.OnlineUser.OnlineUser);
 
    const ind=MessageNotification.findIndex((item)=> item.chatId===friend._id);
    return (
        <>
        <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer' onClick={() => onSelect(friend._id)}>
          <div className={`avatar ${OnlineUser.includes(friend.currUser._id) ? 'online' : 'offline'}`}>
            <div className='w-12 rounded-full'>
              <img src={friend.currUser.profilepic} alt='user avatar' />
            </div>
          </div>
    
          <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
              <p className='font-bold text-gray-200'>{friend.currUser.fullname}</p>
            </div>
    
            {/* Conditional rendering for new message count */}
            {ind !== -1 && MessageNotification[ind].count !== 0 && (
              <p className='text-sm text-red-500'>
                {MessageNotification[ind].count > 9 ? '9+ new Messages' : `${MessageNotification[ind].count} new Message${MessageNotification[ind].count > 1 ? 's' : ''}`}
              </p>
            )}
          </div>
        </div>
    
        <div className='divider my-0 py-0 h-1' />
        <hr />
      </>
    )
}

export default MessageCard