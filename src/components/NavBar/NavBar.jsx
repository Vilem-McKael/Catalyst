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
        <div>
          {user.username}
        </div>
        <div className='flex flex-col'>
        {Object.keys(currentCollective).length ?
        <>
          <div className='flex flex-row justify-center'>
            <h3 className='text-[3vmin]'>{currentCollective.name}</h3>
          </div>
          <div className='flex flex-row justify-center'>
            <p>{currentCollective.description}</p>
          </div>
          <div className='flex flex-row justify-center'>
            <p className='italic'>{currentCollective.members.length === 1 ? 'You are the first member!' : currentCollective.members.length + ' members'}</p>
          </div>
        </>
        :
        <>

        </>
        }
        </div>
        <div className='flex flex-col items-center'>
          <Link to='/collectives/search'>Search Collectives</Link>
        
          <Link to='/collective/new'>New Collective</Link>
        
          <Link to='' onClick={handleLogOut}>Log Out</Link>
        </div>
    </>
  )
}
