import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MessageCard from './MessageCard';
import SearchBar from './SearchBar';
import { MessageAlertActions } from '../Store/MessageAlertSlice';

const Sidebar = () => {
  const navigate = useNavigate();
  const friendList = useSelector((store) => store.friend.friendlist);
  const currentUser = useSelector((store) => store.Curruser.user);
  
  const dispatch=useDispatch();
  // Navigation to profile
  const goToProfile = () => {
    navigate('/profile');
  };

  // On selecting a user
  const onSelectUser = (userId) => {
    navigate(`/Message/${userId}`);
    dispatch(MessageAlertActions.ResetMessage({chatId:userId}))
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-200">
      {/* Sidebar container */}
      <div className="bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-md h-[90vh] flex flex-col">

        {/* Search Bar */}
        <div className="p-4">
          
          <SearchBar />
        </div>

        {/* Divider */}
        <hr className="border-gray-700" />

        {/* Friend List (Scrollable) */}
        <div className="flex-grow overflow-auto px-4 py-2 space-y-4">
          {friendList.map((friend) => (
            <MessageCard
              key={friend._id}
              friend={friend}
              onSelect={() => onSelectUser(friend._id)}
            />
          ))}
        </div>

        {/* Current User Avatar (Pinned at Bottom) */}
        <div className="p-4 flex justify-center">
          <div onClick={goToProfile} className="cursor-pointer">
            {currentUser && (
              <img
                className="w-16 h-16 rounded-full"
                src={currentUser.profilepic}
                alt="Current user avatar"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
