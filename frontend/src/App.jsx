import { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'

function App() {


  return (
    <div>
      <div className='left-0 h-screen bg-gradient-to-r from-slate-900 to-slate-700 w-72 absolute'>
        <div className='h-[65%] border-b-2 border-white'>
         <div className='flex flex-row text-center mt-5'> 
          <img src={logo} className='h-[120px] w-auto '></img>
          <h1 className='text-white text-2xl mt-5 mr-3'>Geography Teacher</h1>
          </div> 
        </div>
        <div className='text-white text-2xl mx-3 my-3'>21</div>
       </div>

       </div>
  )
}

export default App
