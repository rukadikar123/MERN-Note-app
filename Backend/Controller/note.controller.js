import { Note } from "../Models/note.model.js";

// Controller to handle adding a new note
export const addNote = async (req, res) => {
  // Extract note details (title, content, tags) from the request body
  const { title, content, tags } = req.body;
  // Extract the logged-in user's ID from the request object
  const { id } = req.user;

  if (!title || !content || !tags) {
    throw new Error("All fields required");
  }

  try {
    // Create a new note in the database with the provided details
    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      userId: id,
    });

    // Send a success response with the created note
    res.status(200).json({
      success: true,
      note,
      message: "note Created successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Controller to edit note
export const editNote = async (req, res) => {
  // Extract the note ID from the request parameters
  const { noteId } = req.params;

  // Find the note in the database using the extracted note ID
  const note = await Note.findById(noteId);

  if (!note) {
    return res.status(400).json({
      success: false,
      message: "note not found",
    });
  }
  // Ensure the logged-in user is the owner of the note before allowing updates
  if (req.user.id !== note.userId) {
    throw new Error("You can only update your own note");
  }

  // Extract note details from the request body
  const { title, content, tags, isPinned } = req.body;
  if (!title && !content && !tags) {
    throw new Error("No changes Provided");
  }

  try {
    // Update the note with new values only if they are provided in the request body
    if (title) {
      note.title = title;
    }
    if (content) {
      note.content = content;
    }
    if (tags) {
      note.tags = tags;
    }
    if (isPinned) {
      note.isPinned = isPinned;
    }

    // Save the updated note to the database
    await note.save();

    // Send a successful response with the updated note
    res.status(200).json({
      success: true,
      message: "note updated successfully",
      note,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Controller to get all notes
export const getAllNotes = async (req, res) => {
  try {
    // Extract the logged-in user's ID from the request object
    const userId = req.user.id;

    // Fetch all notes for the logged-in user and sort them with pinned notes first
    const notes = await Note.find({ userId }).sort({ isPinned: -1 });

    if (!notes) {
      throw new Error("Notes Not found");
    }

    // Send a successful response with all the retrieved notes
    res.status(200).json({
      success: true,
      message: "All notes retrieved successfully",
      notes,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Controller to delete a note
export const deleteNote = async (req, res) => {
  // Extract the noteId from the request parameters
  const noteId = req.params.noteId;

  // Find the note in the database by its ID and ensure it belongs to the logged-in user
  const note = await Note.findOne({ _id: noteId, userId: req.user.id });

  if (!note) {
    throw new Error("Note not found");
  }

  try {
    // Delete the note from the database
    await Note.deleteOne({ _id: noteId, userId: req.user.id });

    // Send a successful response indicating that the note has been deleted
    res.status(200).json({
      success: true,
      message: "note delete successfully   ",
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Controller to update the "pinned" status of a note
export const updateNotePinned = async (req, res) => {
  try {
    // Retrieve the note by its ID from the database using the noteId from the request parameters
    const note = await Note.findById(req.params.noteId);

    if (!note) {
      throw new Error("Note not found!");
    }

    if (req.user.id !== note.userId) {
      return res.status(400).json({
        success: false,
        message: "you can only update your own note",
      });
    }
    // Extract the 'isPinned' value from the request body
    const { isPinned } = req.body;

    // Update the 'isPinned' status of the note with the new value from the request body
    note.isPinned = isPinned;
    // Save the updated note to the database
    await note.save();

    // Send a response back to the client indicating the update was successful
    res.status(200).json({
      success: true,
      message: "note updated successfully",
      note,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// controller to Search a note
export const searchNote = async (req, res) => {
  // Extract the 'query' parameter from the request query string
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "search query is required",
    });
  }

  try {
    // Find notes that match the search query in either the 'title' or 'content' field
    const matchingNotes = await Note.find({
      userId: req.user.id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
        { tags: { $elemMatch: { $regex: new RegExp(query, "i") } } },
      ],
    });

    // Send a successful response with the matching notes
    res.status(200).json({
      success: true,
      message: "notes matching the search query retrieved successfully",
      notes: matchingNotes,
    });
  } catch (error) {
    throw new Error(error);
  }
};
