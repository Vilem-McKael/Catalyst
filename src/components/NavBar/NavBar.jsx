import React from 'react'
import { logOut } from '../../utilities/users-service';
import { Link } from 'react-router-dom';

export default function NavBar({user, updateUser}) {

    function handleLogOut() {
        logOut()
        updateUser(null);
    }

  return (
    <div>
        <Link to='/community'>Community</Link>
        |
        <Link to='' onClick={handleLogOut}>Log Out</Link>
    </div>
  )
}
