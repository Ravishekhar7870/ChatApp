import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'

const ProtectRoute=({children,token,redirect='/login'})=>{
    
    if(!token){
        return <Navigate to={redirect}/>;
    }
    return (
        <>
        
        {children ? children :<Outlet/>};
        </>
    );
    
}

export default ProtectRoute