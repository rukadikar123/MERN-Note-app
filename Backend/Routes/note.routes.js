import {Router} from 'express'
import { verifyToken } from '../middlewares/auth.middleware.js'
import { addNote, deleteNote, editNote, getAllNotes, searchNote, updateNotePinned } from '../Controller/note.controller.js'

// Create a new instance of an Express Router
const router=Router()

router.post("/add", verifyToken, addNote)
router.post("/edit/:noteId", verifyToken,editNote )
router.get("/all", verifyToken, getAllNotes )
router.delete("/delete/:noteId", verifyToken, deleteNote )
router.put("/update-note-pinned/:noteId", verifyToken, updateNotePinned )
router.get("/search", verifyToken, searchNote )
 

export default router
