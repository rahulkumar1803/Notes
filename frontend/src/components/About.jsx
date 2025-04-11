import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
  
  return (
    <div id="about">
    <h2>About</h2>
    <h4>Here is the Key Features of This Notes App:-</h4>
    <ul class="list">
        <li>This app is very simple and user friendly and anyone easily add or remove or edit their notes here.</li>
        <li>Users can create new notes quickly and easily, often with the ability to title, date, and organize them.</li>
        <li>This app support the Editing the notes after add it on notes list.</li>
        <li>Protecting user data with encryption and security features is crucial, especially if users are storing sensitive information in their notes.</li>
        <li>Pre Design template help to well organise the notes.</li>
    </ul>
</div>
  )
}

export default About
