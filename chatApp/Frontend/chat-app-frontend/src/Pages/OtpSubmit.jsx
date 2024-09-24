import React, { useRef } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
const VerifyOtp = ({ handleVerifyOtp }) => {
  const otpRef=useRef();
const location=useLocation();
const navigate=useNavigate();
  const handleSubmit =  async(e) => {
    e.preventDefault();
    const otp=otpRef.current.value
    const email=location.state?.email
    if(!otp){
        toast.error("Please enter Otp")
        return;
    }
    const toastid=toast.loading("Otp is being verified")
    try {
        
        const res=await axios.post(`${import.meta.env.VITE_URL_SERVER}/api/v1/users/VerifyOtp`,{email:email,otp:otp})
        toast.success("Otp Verified Sucessfully",{id:toastid})
        navigate('/confirmPass',{state:{email}})
    } catch (error) {
        const htmlContent=error.response.data;
        // //console.log(htmlContent)
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const preTagContent = doc.querySelector('pre').innerHTML;
        const errorMessage = preTagContent.split('<br>')[0].replace('Error:', '').trim();
         toast.error(errorMessage,{id:toastid})
    }
     // Function to verify OTP
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-200 via-purple-200 to-purple-200">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-bold mb-2 text-gray-700">OTP</label>
          <input
            type="text"
            ref={otpRef}
            placeholder="Enter the OTP"
            className="w-full px-3 py-2 border rounded-md mb-4"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
