import React, { useState } from 'react'
import * as usersService from '../../utilities/users-service';

export default function SignUpForm({ setUser }) {

    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    })

    const [error, setError] = useState('');

    function handleChange(evt) {
        setUserDetails({ ...userDetails, [evt.target.name]: evt.target.value });
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const formData = {
                email: userDetails.email,
                username: userDetails.username,
                password: userDetails.password
            }
            setUser(await usersService.signUp(formData));
            // setUser(user);
        } catch {
            setUserDetails({ ...userDetails, error: 'Sign Up Failed - Try Again'});
        }
    }

    function isDisabled() {

        userDetails.password !== userDetails.confirm;    

    }

  return (
    
    <div>
        <div>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div>
                <label>username:</label>&nbsp;&nbsp;
                <input type="text" name="username" value={userDetails.username} onChange={handleChange} required />
                </div><br/>
                <div>
                <label>email:</label>&nbsp;&nbsp;
                <input type="email" name="email" value={userDetails.email} onChange={handleChange} required />
                </div><br/>
                <div>
                <label>password must be 8 or more characters long</label>&nbsp;&nbsp;
                </div>
                <div>
                <label>password:</label>&nbsp;&nbsp;
                <input type="password" name="password" value={userDetails.password} onChange={handleChange} required />
                </div><br/>
                <div>
                <label>confirm:</label>&nbsp;&nbsp;
                <input type="password" name="confirm" value={userDetails.confirm} onChange={handleChange} required />
                </div><br/>
                <div>
                <button type='submit' disabled={isDisabled()}>SIGN UP</button>
                </div>
            </form>
        </div>
        <div>
        <p>&nbsp;{userDetails.error}</p>
        </div>
    </div>

  )
}
