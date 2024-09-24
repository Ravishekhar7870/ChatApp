import React from 'react'

import { MdDelete } from "react-icons/md";

function RecentSearchItem() {
  return (
  
     
    <div className="relative flex items-center justify-between p-2 bg-gray-700 rounded-lg shadow-sm" style={{"maxWidth":"500px"}}>
      
    {/* Delete Icon */}
    <div className="absolute top-0 right-0 p-0 bg-gray-800 rounded-full hover:bg-gray-600 focus:outline-none">
        X
    </div>
    
    
    
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden">
        {/* Placeholder for avatar */}
        <img
          src=""
          alt="RY"
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-lg font-medium text-white">Ravi</span>
    </div>
    
    <div className="flex space-x-2">
     
    </div>
    
  </div>
  
  )
}

export default RecentSearchItem