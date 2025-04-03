import { Router } from 'express'
import { getUserProfile, login, logout, signup } from '../Controller/user.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

// Create a new instance of an Express Router
const router=Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/profile', verifyToken,getUserProfile)
router.get('/logout', verifyToken, logout)

export default router