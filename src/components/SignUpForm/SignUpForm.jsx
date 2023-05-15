import React, { useState } from 'react'
import * as usersService from '../../utilities/users-service';

export default function SignUpForm({ setUser }) {

    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        password: '',
        confirm: ''
    })

    const [error, setError] = useState('');

    function handleChange(evt) {
        setUserDetails({ ...userDetails, [evt.target.name]: evt.target.value });
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault(); 
        if (userDetails.password === userDetails.confirm) {
            try {
                const formData = {
                    email: userDetails.email,
                    username: userDetails.username,
                    password: userDetails.password
                }
                setUser(await usersService.signUp(formData));
            } catch {
                setError('Sign Up Failed - Try Again');
            }
        } else {
            setError('Passwords Do Not Match')
        }
    }

    function isDisabled() {

        userDetails.password !== userDetails.confirm;    

    }

  return (
    
    <div>
        <div>
            <form autoComplete="off" onSubmit={handleSubmit} className='text-[16px] flex flex-col items-center'>
                <div>
                <input type="text" name="username" value={userDetails.username} placeholder='Display Name' onChange={handleChange} className='w-[24vmin] text-stone-700' required />
                </div><br/>
                <div>
                <input type="email" name="email" value={userDetails.email} placeholder='Email' onChange={handleChange} className='w-[24vmin] text-stone-700' required />
                </div><br/>
                <div>
                <input type="password" name="password" value={userDetails.password} placeholder='Password (8 or more characters)' onChange={handleChange} minLength={8} className='w-[24vmin] text-stone-700' required />
                </div><br/>
                <div>
                <input type="password" name="confirm" value={userDetails.confirm} placeholder='Confirm' onChange={handleChange} className='w-[24vmin] text-stone-700' required />
                </div><br/>
                <div>
                <button type='submit' disabled={isDisabled()} className='text-[24px] bg-indigo-500 border-none pl-[2vmin] pr-[2vmin]'>Sign Up</button>
                </div>
            </form>
        </div>
        <div>
        <p>&nbsp;{userDetails.error}</p>
        </div>
    </div>

  )
}
