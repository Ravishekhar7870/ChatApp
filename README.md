# Realtime Chat Website ⭐:
![Screenshot 2024-10-11 162658](https://github.com/user-attachments/assets/ed3e4fb2-37a4-4ec4-a5ee-59721c8d7c7b)

<br>

**Hosted Website link :https://chatapp-t5s3.onrender.com**
<br>

<font size="10">**Welcome to the Fullstack Realtime Chat Website repository!**</font>

This project utilizes **React.js**, **Redux**, **RTK Query**, **Tailwind CSS**, **MongoDB**, **MongoDB Aggregation Pipelines**, **ExpressJS**, and **WebSockets** to create a comprehensive chat application. Users can chat with each other privately, send pictures, and videos. They can also send friend requests to each other.
<br>
# Key Feature 
🔒:**Authenticaton**
<br>
This chat application uses **JWT (JSON Web Tokens)** for user authentication, ensuring secure and stateless sessions. Upon login, users are issued both an **access token** and a **refresh token**. The access token is used to authenticate API requests and is stored in memory to enhance security. The refresh token, stored securely in a cookie, is used to obtain new access tokens without requiring the user to log in again. **Token refreshes** are handled seamlessly through **Redux Query**, which automatically manages the request flow and token refresh cycles. This approach ensures that the user's session remains active and secure, even when tokens expire, without interrupting their chat experience. 
<br>
🧑‍🤝‍🧑: **Sending Friend Request**
<br>
The chat application allows users to send and manage friend requests efficiently. Friend connections are stored in a dedicated collection in **MongoDB**, which serves as the database. When a user sends a friend request, the request is stored in the collection. To retrieve friend requests for a specific user, an **aggregation pipeline** is employed. This pipeline matches all friend requests where the requested user is the recipient, ensuring efficient querying and accurate data retrieval. This approach leverages **MongoDB's powerful aggregation framework**, optimizing performance for retrieving and managing friend connections.
<br>
⭐: **Refreshing Pending Request data from the Server**
<br>
In this chat application, pending friend request data is refreshed in real-time using **WebSocket** technology. Instead of relying on frequent polling or manual refreshes, the application listens for updates from the backend via a socket connection. Here's how it works:

**Socket Connection:** Once the user logs in, a persistent **WebSocket** connection is established between the frontend and backend.
<br>
**Event Emission:** When a user sends or receives a friend request, the backend emits an event through the WebSocket. The event contains updated pending friend request data.
<br>
**Real-time Update:** The frontend listens for these socket events. When an event is received, the **Redux** state (which stores the pending friend requests) is updated automatically. This ensures that the pending request list is always up-to-date without needing to refresh the page.
<br>
**User Feedback:** Whenever a new request is received or accepted, the UI reflects these changes instantly, providing a seamless experience for the user.
<br>
🚦: **Real-time Friend Status (Online/Offline)**
<br>
The chat application tracks the online or offline status of friends in real-time using **WebSocket** communication. This feature ensures that users can see whether their friends are currently active in the app without needing to refresh the page. Here's how it works:
<br>
**Socket Connection for Status Tracking:** When a user logs in, a **WebSocket** connection is established between the frontend and backend. As soon as the connection is made, the server marks the user as "online" and broadcasts this update to all of their friends.
<br>
**Broadcasting Status Updates:** Whenever a user logs in or logs out, the **backend emits a socket event** to notify all relevant users (friends) of the status change. The event includes the user’s ID and their current status (online or offline).
<br>
**Real-time Status Display:** On the frontend, the application listens for these status update events. If the status of a friend changes, the **Redux state** (or context) managing the online users array is updated, and the UI automatically reflects whether a friend is online or offline. This is visually indicated in the user interface, typically with an online indicator (like a green dot).
<br>
![Screenshot 2024-10-15 110812](https://github.com/user-attachments/assets/a366d0b0-26e1-4b55-9587-4c34a697d7cc)
<br>



⭐:**Real-time Chat Content (Text, Files) Storage and Emission**
In this chat application, all chat content, including text messages and file attachments (such as images and videos), is handled in real-time using **WebSocket** communication and stored securely in **MongoDB**. Here's an overview of the process:
<br>
**Real-time Message Transmission:** When a user sends a message or shares a file in a conversation, the message (along with any attachments) is sent to the backend via a **WebSocket** connection. This ensures that the message is delivered instantly to the server without delays.
<br>
**Storing in MongoDB:** Upon receiving the message or file, the backend processes and stores the chat content in a **MongoDB database**. The data is stored in a structured format, with fields for the message content, sender ID, conversation ID, timestamp, and any associated file attachments (stored as references or metadata).
<br>
**Emitting to the Recipient(s):** After the message is successfully saved to **MongoDB**, the backend immediately emits the message to all relevant users in the conversation via **WebSocket**. This ensures that the recipients receive the new message or file in real-time, without having to refresh the page or fetch new data manually.
<br>
**Real-time UI Update:** On the frontend, the application listens for incoming **socket events.** When a new message or file is received, the UI is automatically updated to display the new content in the chat interface, providing a seamless and instantaneous user experience.
<br>
**Handling File Attachments:** For file attachments, the files are  stored directly in **cloud storage (cloudinary)**, ensuring scalability and efficiency. The emitted message includes all necessary information for the recipient to view or download the file.
<br>
# Pages Sanpshot ⭐:

**Login Page:**
![Screenshot 2024-10-15 112632](https://github.com/user-attachments/assets/6ec06f40-9b60-442a-8b78-a073b8537fb5)
<br>
**SignUp Page:**
<br>
![Screenshot 2024-10-15 112903](https://github.com/user-attachments/assets/a40a297c-011f-4cc1-8f87-3b9f75995540)
<br>
**Home Page:**
<br>
![Screenshot 2024-10-11 162658](https://github.com/user-attachments/assets/a91edbc4-d370-45c6-9bcc-40b3ba3b2570)
<br>
**Chat Box:**
<br>
![Screenshot 2024-10-15 113119](https://github.com/user-attachments/assets/1c786176-7dc5-41ed-aa82-cdf5b8c2c741)
<br>
**Profile Section:**
<br>
![Screenshot 2024-10-15 113251](https://github.com/user-attachments/assets/5a68d984-003d-4cae-99a6-569d32475bd9)
<br>
**Friend Section**
<br>
![Screenshot 2024-10-15 113340](https://github.com/user-attachments/assets/1ae705ed-2999-4906-b4d7-e69139bee8b3)
<br>

# Cloning the Repository

` git clone https://github.com/Ravishekhar7870/ChatApp.git`

# Installation
`npm install`
# Environment Variables(.env files)

**Add this in .env file in the root directory of Frontend/chat-app-frontend**
<br>
`VITE_URL_SERVER=""
`
<br>

**Add this in  .env file in the root directory of Backend**
<br>
`ACCESS_TOKEN_SECRET=""`
<br>

`CLOUD_API_KEY=""`
<br>

`CLOUD_API_SECRET=""`
<br>

`CLOUD_NAME=""`
<br>

`EMAIL=""`
<br>

`FRONTEND_URL=""`
<br>

`MONGODB_URI=""`
<br>

`PASS=""`
<br>
`PORT="`
<br>
`REFRESH_TOKEN_SECRET`
<br>
`SERVER_URL`
<br>
# Starting the App

`npm run dev`







