# Realtime Chat Website ⭐:
![Screenshot 2024-10-11 162658](https://github.com/user-attachments/assets/ed3e4fb2-37a4-4ec4-a5ee-59721c8d7c7b)

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



