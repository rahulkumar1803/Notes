import React, { useContext } from 'react'
import Notes from './Notes';
import Addnote from './Addnote';

const Home = () => {
  return (
    <div className='wholeBody'>
      <Addnote/>
      <Notes/>
    </div>
  )
}

export default Home
