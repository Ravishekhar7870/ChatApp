import { useRef } from "react";
import toast from "react-hot-toast";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
    const emailRef=useRef()
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
      const email=emailRef.current.value;
      if(!email){
        toast.error("Please Enter Email");
        return;
      }
      if(!email.includes('@')){
        toast.error("Please Enter a Valid Email")
        return;
      }
      const id=toast.loading("otp is being sent on your email");
      try {
        const res=await axios.post(`${import.meta.env.VITE_URL_SERVER}/api/v1/users/forgotPassword`,{email:email})
        toast.success("Otp has been sent on Your email",{id:id})
        navigate('/otp',{state:{email}})
      } catch (error) {
        const htmlContent=error.response.data;
        // //console.log(htmlContent)
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const preTagContent = doc.querySelector('pre').innerHTML;
        const errorMessage = preTagContent.split('<br>')[0].replace('Error:', '').trim();
         toast.error(errorMessage,{id:id})
      }
    }
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-200 via-purple-200 to-purple-200">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-bold mb-2 text-gray-700">Email</label>
            <input ref={emailRef}
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md mb-4"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default ForgotPassword;
  