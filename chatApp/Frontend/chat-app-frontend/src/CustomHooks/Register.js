import toast from "react-hot-toast";
import { useRegisterMutation } from "../utils/RegisterApiSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const useRegister=()=>{
    const [register,{isloading}]=useRegisterMutation()
    const navigate=useNavigate();
    const Register=async(formdata)=>{
        if(!verify(formdata)){
            return;
        }
        try {
            const config = {headers: {'Content-Type': 'multipart/form-data'}}
            const res=await axios.post(`${import.meta.env.VITE_URL_SERVER}/api/v1/users/registerUser`,formdata,config);
            // const res=await register(formdata).unwrap();
            // ////console.log(res)
            toast.success("you have been successfully register,you are now being redirected to login page")
            navigate('/login')

        } catch (error) {
        const htmlContent=error.response.data;
        // ////console.log(htmlContent)
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const preTagContent = doc.querySelector('pre').innerHTML;
        const errorMessage = preTagContent.split('<br>')[0].replace('Error:', '').trim();
         toast.error(errorMessage)
        ////console.log(error);
        }
    }
    const verify=(formdata)=>{
        for(let key  of formdata.entries()){
            if(key[0]==='profilepic' && key[1]==='undefined'){
                toast.error("please upload your Profile Pic")
                return false;
            }
            if(key[0]==='fullname' && !key[1]){
                toast.error("please enter your name")
                return false;
            }
            if(key[0]==='username' && !key[1]){
                toast.error("please enter your username")
                return false;
            }
            if(key[0]==='password' && !key[1]){
                toast.error('Password field cant be empty')
                return false;
            }
            if(key[0]==='password' && key[1].length<8){
                toast.error('Password cannot be of less than 8 character')
                return false;
            }

            if(key[0]==='email' && !key[1]){
                toast.error("please enter your email")
                return false;
            }
            if(key[0]==='email' && !key[1].includes('@')){
                toast.error("please enter Correct email")
                return false;
            }
            
            
        }
        return true;
    }
    return {Register}
}
export default useRegister