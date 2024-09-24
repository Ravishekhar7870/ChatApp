import { Router } from "express";
import { verifyjwt } from "../middlewares/auth.middlewares.js";
import { AcceptFriendRequest, checkFriend, checkPendingRequest, deleteRequest, deleteSendRequest, getChatDetails, getfriendRequest, getuserFriends, RemoveFriend, SendFriendRequest } from "../controllers/friends.controllers.js";
const router =Router();
router.route('/AcceptFriendrequest').post(verifyjwt,AcceptFriendRequest);
router.route('/SendFriendRequest').post(verifyjwt,SendFriendRequest);
router.route('/GetUserFriends').get(verifyjwt,getuserFriends);
router.route('/GetFriendRequest').get(verifyjwt,getfriendRequest);
router.route('/DeleteRequest').post(verifyjwt,deleteRequest);
router.route('/RemoveFriend').post(verifyjwt,RemoveFriend);
router.route('/CheckFriend').post(verifyjwt,checkFriend);
router.route('/checkPendingRequest').post(verifyjwt,checkPendingRequest)
router.route('/deleteSendRequest').post(verifyjwt,deleteSendRequest)
router.route('/getChatdetils/:id').get(verifyjwt,getChatDetails)
export default router
