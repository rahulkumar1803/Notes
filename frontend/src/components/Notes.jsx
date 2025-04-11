import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const navigate = useNavigate();
    const context = useContext(NoteContext);
    const { notes, fetchAllNote, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchAllNote();
        }
        else {
            navigate('/login')
        }
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({
        id: "",
        title: "",
        description: "",
        tag: "",
    })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ ...currentNote, id: currentNote._id })
        // console.log(note)
    }

    const handleClick = (e) => {
        // console.log('updating the note',  note)
        e.preventDefault();
        editNote(note.id, note.title, note.description, note.tag)
        refClose.current.click();
    }
    return (
        <div>
            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-4'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" aria-describedby="titleHelp"
                                        value={note.title}
                                        onChange={(e) => setNote({ ...note, title: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description"
                                        value={note.description}
                                        onChange={(e) => setNote({ ...note, description: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag"
                                        value={note.tag}
                                        onChange={(e) => setNote({ ...note, tag: e.target.value })}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='notesBox'>
                <h2 className='yoursNotes'>Your Digital Notebook</h2>
                <div className='notesShown'>
                    {notes.length === 0 && 'No notes to display'}
                    {

                        notes.map((note) => (
                            <div key={note._id}>
                                <NoteItem note={note} updateNote={updateNote} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Notes
