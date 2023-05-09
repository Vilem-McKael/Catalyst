import React from 'react';
import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage( { updateUser } ) {

    const [isNewUser, setIsNewUser] = useState(false);

    function handleClick() {
        setIsNewUser(!isNewUser);
    }

  return (
    <>
    <div>
        <div>
            { isNewUser ?
                <>
                    <SignUpForm setUser={updateUser} />
                </>
                :
                <>
                    <LoginForm setUser={updateUser} />
                </>
            }
            <button onClick={handleClick}>{isNewUser ? 'already have an account? log in' : 'new user? create an account'}</button><br/>
        </div>
    </div>
    </>
  )
}
