import React,{useRef} from 'react'
import useLogout from '../CustomHooks/logout'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useChangeProfilePicMutation } from '../utils/ApiSlice';
import toast from 'react-hot-toast';
function Profile() {
   const {Logout}=useLogout();
   const naviagte=useNavigate();
   const [ChangeProfilePic]=useChangeProfilePicMutation();
   const curruser=useSelector((store)=> store.Curruser.user)
   const handlelogout=async()=>{
    //console.log("logout clicked")
      await Logout();
   }
   const getfriendlist=()=>{
     naviagte('/friend')
   }
   const getPendinglist=()=>{
      naviagte('/pendingRequest')
   }
   const getsearchUser=()=>{
    naviagte('/SearchUser')
   }
   const fileInputRef = useRef(null);

   // Function to handle the image selection
   const handleImageClick = () => {
     fileInputRef.current.click();  // Triggers file input on image click
   };
 
   // Function to handle file selection
   const handleFileChange = async (e) => {
     const file = e.target.files[0];
     if (file && file.type.startsWith('image/')) {
       //console.log(file) // Handle image upload (you need to implement this)
       const myform=new FormData();
       myform.append('profilepic',file);
       const res=await ChangeProfilePic(myform);
       //console.log(res);
     }
     else{
      toast.error('please upload image only ')
     }
   };
  return (
   
    <div className="mx-auto bg-gray-800 p-4 pt-6 rounded-lg shadow-md flex flex-col items-center" style={{ width: '100vw', height: '100vh' }}>
    <div className="flex justify-center mb-4">
      {/* Clickable image */}
      <img
        src={curruser && curruser.profilepic}
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover cursor-pointer"
        onClick={handleImageClick}  // Trigger file selection
      />
    </div>

    {/* Hidden file input */}
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      style={{ display: 'none' }}  // Hide the file input
      onChange={handleFileChange}  // Handle file selection
    />

    <div className="w-full max-w-xs space-y-3">
      <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={getPendinglist}>
        Pending Requests
      </button>
      <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={getfriendlist}>
        Your Friends
      </button>
      <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={getsearchUser}>
        Add Friend
      </button>
      
      <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={handlelogout}>
        Logout
      </button>
    </div>
  </div>
  
  )
}

export default Profile