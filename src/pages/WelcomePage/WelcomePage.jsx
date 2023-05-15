import React from 'react'

export default function WelcomePage({user}) {
  return (
    <>
        <div className='flex w-[80vw] h-[96vh] justify-center items-center'>
            <div className='flex flex-col items-center w-[40vw] h-[40vh] mb-[10vh] p-[4vmin] bg-gradient-to-b from-sky-600 via-indigo-700 to-blue-700 rounded-[10px] ring-8 ring-indigo-400'>
                <img src='https://i.imgur.com/eyfjME1.png' className='h-[16vh]'/>
                <h1 className='text-[2.5vmin] text-center text-[#F5F5F5] mt-[-4vh]'>Welcome to Catalyst</h1>
                <h2 className='text-[1.5vmin] text-center text-indigo-200 mt-[1vh]'>...well, what're you waiting for!</h2>
                <h2 className='text-[1.5vmin] text-center text-indigo-200 mt-[1vh]'>Get started by searching for a community by clicking the Search icon in the upper left-hand corner.</h2>
                <h2 className='text-[1.5vmin] text-center text-indigo-200 mt-[1vh]'>Can't find exactly what you're looking for? Create your own by clicking the 'Add Collective' icon!</h2>
            </div>
        </div>
    </>
  )
}
