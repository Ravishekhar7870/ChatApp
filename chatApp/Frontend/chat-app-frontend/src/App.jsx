import { useState, useEffect, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import Logincomp from './components/Logincomp'
import Register from './components/Register'
import Home from './components/Home'
import { Toaster } from 'react-hot-toast'
import useInitialAuth from './CustomHooks/UseRefreshToken'
import { useSelector } from 'react-redux'
import useFriendList from './CustomHooks/useFriendList'
import Profile from './components/Profile'
import Friendlist from './Pages/Friendlist'
import Pendinglist from './Pages/Pendinglist'
import SearchUser from './Pages/SearchUser'
import useGetPendingRequest from './CustomHooks/useGetPendingRequest'
import MessageContainer from './components/MessageContainer'
import ProtectRoute from './components/auth/ProtectRoute'
import { REFETCH_PENDINGREQUEST } from './Constants/Events'
import { getSocket } from './Socket'

import { useDispatch } from 'react-redux'
import { SocketProvider } from './Socket'
import { PendingRequestActions } from './Store/PendingRequestSlice'
import SocketListener from './Constants/SocketListener'
import getOrSaveFromStorage from './Features/SaveAndGetLocalStorage'
import ForgotPassword from './Pages/ForgotPasswors'
import VerifyOtp from './Pages/OtpSubmit'
import PasswordConfirmForm from './Pages/PasswordConfirm'
function App() {
  const [isloading, setloading] = useState(true);
  useInitialAuth(setloading);
  useFriendList();
  useGetPendingRequest();
  // const socket = getSocket();
  const dispatch = useDispatch();
 



  const token = useSelector((store) => store.auth.token)
  if (isloading) {
    return <></>
  }
  return (

    <>
       
       
       
      <Routes>
        <Route element={
           <SocketProvider>
          <SocketListener/>
          <  ProtectRoute token={token} />
          </SocketProvider>
          
        }>

          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/friend' element={<Friendlist />} />
          <Route path='/pendingRequest' element={<Pendinglist />} />
          <Route path='/SearchUser' element={<SearchUser />} />
          <Route path='/Message/:id' element={<MessageContainer />} />
        </Route>
        <Route element={
          <ProtectRoute token={!token} redirect='/' />
        } >
          <Route path='/login' element={<Logincomp />} />
        </Route>
        <Route>
          <Route path='/register' element={<Register />} />
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/otp' element={<VerifyOtp/>}/>
          <Route path='/confirmPass' element={<PasswordConfirmForm/>}/>
        </Route>
      </Routes>
      
      <Toaster />
    </>
  )
}

export default App
