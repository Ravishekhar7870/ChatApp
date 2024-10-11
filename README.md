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
