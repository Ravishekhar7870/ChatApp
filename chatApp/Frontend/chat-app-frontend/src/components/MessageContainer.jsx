import React, {  useEffect, useRef, useState } from 'react'

import SendMessage from './SendMessage'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetChatdetailsQuery } from '../utils/ApiSlice'

function MessageContainer() {
	const { id } = useParams()
	const curruser = useSelector((store) => store.Curruser.user)
	const chatdetails = useGetChatdetailsQuery({ id, skip: !id })
	const chatmember = chatdetails?.data?.data[0]?.participants;
	const currfriend = chatdetails?.data?.data[0]?.friend[0];
	

	return chatdetails.isLoading ? (<></>) : (
		<div className=' flex flex-col' style={{ width: '100vw', height: '100vh' }}>
			

				
				
				<SendMessage chatid={id} member={chatmember} friend={currfriend}/>
				
				{/* <MessageInput /> */}
			
		</div>

	)
}

export default MessageContainer