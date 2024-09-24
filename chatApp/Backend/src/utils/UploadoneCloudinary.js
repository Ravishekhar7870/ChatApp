import { v2 as cloudinary } from 'cloudinary';
import {v4 as uuidv4} from 'uuid'
import fs from 'fs'
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET // Click 'View Credentials' below to copy your API secret
});
const uploadonCloudinary=async(filepath)=>{
    try {
     
      if(!filepath){
          return null;
      }
     const response=await cloudinary.uploader.upload(filepath,{
          resource_type:'auto'
         });
         
         fs.unlinkSync(filepath)
         return response;
    } catch (error) {
      
      fs.unlinkSync(filepath)
      return null;
    }
     
  }
  const uploadMultionCloudinary=async(files=[])=>{
       const uploadPromise=files.map((file)=>{
           return new Promise((resolve,reject)=>{
               cloudinary.uploader.upload(file.path,{
                  resource_type:'auto',
                  public_id:uuidv4(),
               },(error,result)=>{
                  if(error){
                    return reject(error);
                  }
                  resolve(result);
               }
              )
           })
       })

       try {
        const results=await Promise.all(uploadPromise)
        files.map((file)=>{
          fs.unlinkSync(file.path);
        })
        return results
       } catch (error) {
        console.log(error);
        files.map((file)=>{
          fs.unlinkSync(file.path);
        })
        return null
       }
       
  }
  export {uploadonCloudinary,uploadMultionCloudinary}