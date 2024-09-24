import {Router} from 'express'

import { getMessages, sendAttachment } from '../controllers/message.controllers.js';
import { verifyjwt } from '../middlewares/auth.middlewares.js';
import { upload } from '../middlewares/multer.middlewares.js';
const router=Router();
router.route('/sendMessage').post(verifyjwt,upload.array('files',10),sendAttachment);
router.route('/getMessage/:id').get(verifyjwt,getMessages)


export default router
