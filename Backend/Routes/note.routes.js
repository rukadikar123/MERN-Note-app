import {Router} from 'express'
import { verifyToken } from '../middlewares/auth.middleware.js'
import { addNote } from '../Controller/note.controller.js'

const router=Router()

router.post("/add", verifyToken, addNote)


export default router
