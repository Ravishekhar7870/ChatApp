import React from 'react'
import FileRender from './Helper/Filerender'
function Message({message,user,isAttachment,sender,timeAgo}) {
	

  return (
    <div className={sender?._id===user?._id ? "chat chat-end" : "chat chat-start"}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={sender?.profilepic}
                              />
				</div>
			</div>
			{isAttachment ? <FileRender fileUrl={message.url}/> :<div className="chat-bubble text-white  bg-blue-500  pb-2">{ message.content && message.content}</div>
				
		     }
			
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{timeAgo}</div>
		</div>
  )
}

export default Message