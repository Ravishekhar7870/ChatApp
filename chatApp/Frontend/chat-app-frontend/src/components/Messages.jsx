import React from 'react'
import Message from './Message'
import moment from 'moment'
function Messages({message,user}) {
  const timeAgo = moment(message.createdAt).fromNow();
  return (
    <div className='px-4 flex-1 overflow-auto'>
        {message?.attachments?.length>0 ? message?.attachments?.map((item,index)=>(
				  <Message message={item} key={index} isAttachment={true} user={user} sender={message.sender} timeAgo={timeAgo}/>
			)):<Message message={message} isAttachment={false} user={user} sender={message.sender} timeAgo={timeAgo} />}
        
        
    </div>
  )
}

export default Messages