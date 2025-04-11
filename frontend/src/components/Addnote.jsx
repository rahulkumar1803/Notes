import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const Addnote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addNote(note.title, note.description, note.tag);
        setNote({
            title: '',
            description: '',
            tag: ''
        })
    }

    return (
        <div className='noteBox'>
            <h2 className=''>Add a Note</h2>
            <form className='my-4 addNoteForm' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="etitle" aria-describedby="titleHelp"
                        value={note.title}
                        onChange={(e) => setNote({ ...note, title: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="edescription"
                        value={note.description}
                        onChange={(e) => setNote({ ...note, description: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="etag"
                        value={note.tag}
                        onChange={(e) => setNote({ ...note, tag: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn addNoteBtn">Add Note</button>
            </form>
        </div>
    )
}

export default Addnote
