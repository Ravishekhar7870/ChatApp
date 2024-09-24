import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate ,useLocation} from 'react-router-dom';
const PasswordConfirmForm = () => {
 const navigate=useNavigate();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
const location=useLocation();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const email=location.state?.email
   const password=passwordRef.current.value;
   const confirmPass=confirmPasswordRef.current.value;
   if(password!==confirmPass){
    toast.error("Please Match Password and Confirm Password")
    return;
   }
   const toastid=toast.loading("Updating Password");
   try {
        
    const res=await axios.post(`${import.meta.env.VITE_URL_SERVER}/api/v1/users/CreatePass`,{email:email,password:password})
    toast.success("password Changed Sucessfully",{id:toastid})
    navigate('/login')
} catch (error) {
    const htmlContent=error.response.data;
    // //console.log(htmlContent)
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const preTagContent = doc.querySelector('pre').innerHTML;
    const errorMessage = preTagContent.split('<br>')[0].replace('Error:', '').trim();
     toast.error(errorMessage,{id:toastid})
}
    

    // Handle successful password confirmation logic here
  
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Set Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-bold mb-2 text-gray-700"> New Password</label>
          <input
            type="password"
            ref={passwordRef}
            
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-md mb-4"
            required
          />
          <label className="block text-sm font-bold mb-2 text-gray-700">Confirm New Password</label>
          <input
            type="password"
            ref={confirmPasswordRef}
           
            placeholder="Confirm your password"
            className="w-full px-3 py-2 border rounded-md mb-4"
            required
          />
          
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordConfirmForm;
