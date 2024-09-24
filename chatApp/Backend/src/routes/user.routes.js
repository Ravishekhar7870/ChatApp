import { Router } from "express";
import { changePassword, changeProfilePicture, ChangeUsername, CreateNewPassword, ForgotPassword, getRequestedUser, getUser, LoginUser, LogoutUser, refreshAccessToken, RegisterEmail, RegisterUser, verifyEmail, VerifyOtp } from "../controllers/User.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyjwt } from "../middlewares/auth.middlewares.js";
import { AcceptFriendRequest, deleteRequest, getfriendRequest, getuserFriends, SendFriendRequest } from "../controllers/friends.controllers.js";

const router=Router();
router.route('/registerUser').post(
    upload.single('profilepic')
    ,
    RegisterUser)
    router.route('/loginUser').post(LoginUser)
    router.route('/logoutUser').post(verifyjwt,LogoutUser)
    router.route('/getUser').get(verifyjwt,getUser)
    router.route('/changeusername').post(verifyjwt,ChangeUsername)
    router.route('/changeProfilePicture').post(verifyjwt,upload.single('newProfilePic'),changeProfilePicture)
    router.route('/verifyemail/:token').get(verifyEmail)
    router.route('/changePassword').post(verifyjwt,changePassword)
    router.route('/refreshAccessToken').get(refreshAccessToken)
    router.route('/RegisterEmail').post(RegisterEmail)
    router.route('/getRequestUser').post(verifyjwt,getRequestedUser)
    router.route('/changeProfilePic').post(verifyjwt,upload.single('profilepic'),changeProfilePicture);
    router.route('/forgotPassword').post(ForgotPassword)
    router.route('/VerifyOtp').post(VerifyOtp)
    router.route('/CreatePass').post(CreateNewPassword)
    export default router;