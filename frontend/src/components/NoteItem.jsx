import React, { useContext } from 'react'
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    return (
        <>
            <div className="card notesItem" key={note._id}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div style={{display:'flex', gap:'20px'}}>
                        <p><MdDelete size={25} style={{cursor:'pointer',color:'rgb(236, 173, 56)'}} onClick={() => {deleteNote(note._id)}}/></p>
                        <p><MdEditDocument size={25} style={{cursor:'pointer',color:'rgb(236, 173, 56)'}} onClick={() => {updateNote(note)}}/></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem
