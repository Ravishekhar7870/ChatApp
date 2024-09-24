import React, { useState ,useEffect, useCallback} from 'react'
import Sidebar from './Siderbar'
import '../App.css'

import { getSocket } from '../Socket'
import { REFETCH_PENDINGREQUEST } from '../Constants/Events'
import { useDispatch } from 'react-redux'
import { PendingRequestActions } from '../Store/PendingRequestSlice'
function Home() {
  const socket = getSocket();
  const dispatch=useDispatch();
 useEffect(() => {
     if(socket){
      socket.on(REFETCH_PENDINGREQUEST,(data)=>{
        //console.log(data);
          dispatch(PendingRequestActions.AddPendingList({newPending:data?.userRequest}));
      })
     }
    return () => {
      socket.off(REFETCH_PENDINGREQUEST)
    }
  }, [socket])
  return (
     <Sidebar />
  )
}

export default Home;