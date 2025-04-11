import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const initialNote = [];
    const [notes, setNotes] = useState(initialNote);


    // Get all Notes
    const fetchAllNote = async () => {
        // console.log('Adding a new note')
        const res = await fetch(`/api/note/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        const notes = await res.json();

        setNotes(notes)
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        // console.log('Adding a new note')


        if (title === "" || description === "") {
            alert("Please fill all the credentials")
        }
        else if(description.length < 5){
            alert('Description must be atleast 5 character')
        }
        else if(title.length < 3){
            alert('Title must be atleast 3 character')
        }
        else {

            try {

                const res = await fetch(`/api/note/addnote`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    },
                    body: JSON.stringify({ title, description, tag })
                });

                const note = await res.json();
                setNotes(notes.concat(note))

            } catch (error) {
                alert({ error: error.message })
            }
        }
    }

    //Delete a note
    const deleteNote = async (id) => {
        const res = await fetch(`/api/note/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = await res.json();
        // console.log(json)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }


    //Edit a note
    const editNote = async (id, title, description, tag) => {

        const res = await fetch(`/api/note/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await res.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        // console.log(newNotes)

        // logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            // console.log(element)
            if (element._id === id) {
                element.title = title,
                element.description = description,
                element.tag = tag;
                break;
            }
        }

        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchAllNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;