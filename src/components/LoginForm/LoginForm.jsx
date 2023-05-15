import React from 'react'
import { useState } from 'react';
import * as usersService from '../../utilities/users-service'

export default function LoginForm( { setUser } ) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    function handleChange(evt) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value});
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const user = await usersService.login(credentials);
            setUser(user);
        } catch {
            setError('log in failed - try again');
        }
    }

    return (
        <div>
            <div>
                <form autoComplete="off" onSubmit={handleSubmit} className='text-[20px] flex flex-col items-center'>
                    <input type="email" name="email" value={credentials.email} placeholder='Enter your email' onChange={handleChange} className='mt-[2vh] w-[24vmin] text-stone-700' required /><br/>
                    <input type="password" name="password" value={credentials.password} placeholder='Password' onChange={handleChange} className='w-[24vmin] text-stone-700' required /><br/>
                    <button className='flex flex-row items-center text-[24px] border-none bg-indigo-500 pl-[2vmin] pr-[2vmin] mt-[2vh]' type="submit"><span>Sign In</span><i className='flaticon-enter text-[28px] ml-[1vmin] pt-[1vh]'></i></button>
                </form>
            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    )
}