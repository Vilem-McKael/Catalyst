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
        <div className='w-[480px] h-[560px] bg-gradient-to-b from-blue-700/90 to-blue-900/90 mb-[10vmin] rounded-2xl text-white border-blue-950 border-[1vmin]'>
            <h1 className='text-[40px] text-center mt-[2vmin] mb-[2vmin]'>Catalyst</h1>
            { isNewUser ?
                <>
                    <SignUpForm setUser={updateUser} />
                </>
                :
                <>
                    <LoginForm setUser={updateUser} />
                </>
            }
            <div className='flex flex-col justify-center items-center sticky bottom-[2vmin] text-center'>
                <button className='w-[400px] text-[20px] border-none' onClick={handleClick}>{isNewUser ? 'Already have an account? Sign in here' : 'Create an Account'}</button>
            </div>
        </div>
    </div>
    </>
  )
}
