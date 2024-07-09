import { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'
import send from './assets/send.png'
import avatar1 from './assets/avatar1.jpg'
import avatar2 from './assets/avatar2.jpg'

function App() {


  return (
    <div className='overflow-x-hidden font-mono  scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-screen'>
      <div className='left-0  bg-gradient-to-bl from-sky-500 to-teal-700 w-screen overflow-x-hidden lg:h-[fit-content] md:min-h-screen'>
        
        <div className='top-0 my-5 w-screen text-center text-white lg:text-3xl flex flex-row justify-center items-center '> 
          <img className='h-[100px] w-[100px]' src={logo} alt='Geography Teacher Logo'></img>
          <h1>Geography Teacher</h1>
          </div>
          <div className='main  overflow-x-hidden '>
            <div className='chats  lg:min-h-[41.5em] md:min-h-[52em] lg:mx-auto md:mx-auto sm:mx-5 overflow-x-hidden overflow-y-scroll flex flex-col max-w-[23em] md:max-w-[40em] lg:max-w-[75em] items-center text-md scroll-smooth mx-auto scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300'>
            <div className='chatUser lg:mx-10  text-white my-3 flex flex-row p-2'>
                <img className='h-[60px] object-cover w-auto rounded-xl mr-2' src={avatar2} alt="Avatar 2" /><p className='txt'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia rerum, a perferendis consequuntur nisi repellat laboriosam eius magnam ratione quasi.</p>
              </div>
              <div className='chatBot lg:mx-10  text-white my-3 flex flex-row bg-sky-500 p-2 rounded-lg'>
                <img className='h-[60px] object-cover w-auto rounded-xl mr-2' src={avatar1} alt="Avatar 1" /><p className='txt'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis fugiat quibusdam ullam aperiam laboriosam inventore, tempore provident ut iusto accusantium. Beatae praesentium animi maiores, molestiae deleniti ea adipisci eos fugit repellat quas commodi veniam nostrum maxime sint aut rerum dolorem iusto officia incidunt laboriosam, accusantium dolorum. Sint officia ipsam, minus omnis saepe labore quidem ad error exercitationem amet asperiores nisi maiores voluptatibus illum laudantium ut quo placeat fugit optio doloremque rem earum. Exercitationem ex fugiat rerum tempore cupiditate aliquid velit, architecto, pariatur quaerat repellat nisi totam necessitatibus earum dicta a veniam nemo quae vel quibusdam. Corporis ad sequi placeat dignissimos!</p>
              </div>            
            </div>
            <div className='chatFooter overflow-x-hidden flex flex-row lg:w-[50em] justify-center items-center mx-auto'>
              <div className='inputFIeld  mt-10 border-teal-400 bg-sky-500 lg:w-fit flex flex-row justify-center items-center border border-teal rounded-lg'>
                <input className='lg:w-[45em] md:w-[35em] w-[17em]  p-2 rounded-md bg-sky-500 focus:outline-none focus:border-white text-white placeholder-white' type='text' name='userChat' id='userChat' placeholder='Send a message...' /> <button className='mx-3'><img src={send} alt="Send Button" className='h-[30px] w-auto'/></button>
              </div>
            </div>
            <p className='my-3 text-center text-white'>Geography Teacher is programmed to strictly answer Geography related questions.</p>
          </div>
      </div>

       </div>
  )
}

export default App
