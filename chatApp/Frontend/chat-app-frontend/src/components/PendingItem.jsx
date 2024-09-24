import React from 'react'

function PendingItem({ item, handleAccept, handleDelete }) {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-700 rounded-lg shadow-sm" style={{ maxWidth: '500px' }}>
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden">
          {/* Placeholder for avatar */}
          <img
            src={item.profilepic}
            alt="Requester Name"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-lg font-medium text-white">{item.username}</span>
      </div>
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition" onClick={() => handleAccept(item)}>
          Accept
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition" onClick={() => handleDelete(item._id)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default PendingItem;
