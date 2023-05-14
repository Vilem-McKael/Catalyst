import React from 'react'
import { logOut } from '../../utilities/users-service';
import { Link, useParams } from 'react-router-dom';

export default function NavBar({user, updateUser, currentCollective}) {

    console.log(currentCollective)

    function handleLogOut() {
        logOut()
        updateUser(null);
    }

  return (
    <>
        {/* <div>
          {user.username}
        </div> */}
        <div className='nav flex flex-col justify-center w-[20vw]'>
        
          <div className="text-center">
            <h3 className='text-[3vmin] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-sky-500 to-blue-800'>CATALYST</h3>
          </div>
          <div className="flex flex-row justify-evenly">
            <div>
              <Link to='/collectives/search'>Search</Link>
            </div>
            <div>
              <Link to='/collective/new'>New</Link>
            </div>
            <div>
              <Link to='' onClick={handleLogOut}>Log Out</Link>
            </div>
          </div>
        </div>
      </>
  )
}
