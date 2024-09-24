import toast from "react-hot-toast"
import { useRegisteremailMutation } from "../utils/RegisterEmailSlice"
const useRegisterEmail=()=>{
     const [registeremail,{isloading}]=useRegisteremailMutation();
     const RegisterEmail=async(email)=>{
      if(!email){
        toast.error("Please enter Email");
        return;
      }
      try {
        const res=await registeremail({email:email}).unwrap();
        toast.success("Please check your email for verification")
      } catch (error) {
        const htmlContent=error.data;
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const preTagContent = doc.querySelector('pre').innerHTML;
        const errorMessage = preTagContent.split('<br>')[0].replace('Error:', '').trim();
         toast.error(errorMessage)
        // //console.log(error)

      }
     }
     return {RegisterEmail}
}
export default useRegisterEmail