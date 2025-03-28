import { Router } from 'express'
import { login, logout, signup } from '../Controller/user.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

const router=Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', verifyToken, logout)

export default router