import express from 'express'
import { checkAuth, Login, Signup, uploadResume } from '../controller/userController.js'
import { protectRoute } from '../middleware/authMiddleware.js'
import resumeUpload from '../middleware/resumeUpload.js'; 

const UserRouter = express.Router()

UserRouter.post('/signup', Signup)
UserRouter.post('/login', Login)
UserRouter.get('/check', protectRoute ,checkAuth)
// Upload resume route (with auth + file upload)
UserRouter.post('/upload-resume', protectRoute, resumeUpload.single('resume'), uploadResume);

export default UserRouter