import React from 'react';
import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

import './AuthPage.css'

export default function AuthPage( { updateUser } ) {

    const [isNewUser, setIsNewUser] = useState(false);

    function handleClick() {
        setIsNewUser(!isNewUser);
    }

  return (
    <>
    <div id='auth-page' className='flex justify-center items-center'>
        <div className='w-[480px] h-[560px] bg-gradient-to-b from-blue-800/90 to-blue-950/90 mb-[10vmin] rounded-2xl text-white border-blue-950 border-[1vmin]'>
            <h1 className='flex flex-row justify-center text-[40px] mt-[1vmin]'><img src='https://i.imgur.com/eyfjME1.png' className='h-[calc(120px+10vh)]'/></h1>
            <div className='mt-[-5vmin]'>
            { isNewUser ?
                <>
                    <SignUpForm setUser={updateUser} />
                </>
                :
                <>
                    <LoginForm setUser={updateUser} />
                </>
            }
            </div>
            <div className='flex flex-col justify-center items-center sticky bottom-[2vmin] text-center'>
                <button className='w-[400px] text-[20px] text-[#C5C5C5] border-none' onClick={handleClick}>{isNewUser ? 'Already have an account? Sign in here' : 'or Create an Account'}</button>
            </div>
        </div>
    </div>
    </>
  )
}
