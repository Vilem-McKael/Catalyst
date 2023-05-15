import React from 'react'
import { logOut } from '../../utilities/users-service';
import { Link, useParams } from 'react-router-dom';

export default function NavBar({user, updateUser, currentCollective}) {

    function handleLogOut() {
        logOut()
        updateUser(null);
    }

  return (
    <>
        <div className='nav flex flex-col justify-center w-[20vw] h-[15vh]'>
        
          <div className="flex flex-col items-center justify-center text-center mt-[1.5vh] h-[6vh] mb-[1.5vh]">
            <Link to='/' className='Link2'><img src='https://i.imgur.com/eyfjME1.png' className='h-[10vh] mt-[3vh]'/></Link>
          </div>
          <div className="flex flex-row justify-evenly items-center bg-gradient-to-b from-blue-500 to-indigo-500 h-[6vh]">
              <Link to='/collectives/search' className='Link mt-[1vmin]'><i className='icon flaticon-search-1 text-[calc(12px+1vh)]'></i></Link>
              <Link to='/collective/new' className='Link mt-[1vmin]'><i className='icon flaticon-add-1 text-[calc(16px+1vh)]'></i></Link>
              <Link to='' onClick={handleLogOut} className='Link mt-[1vmin]'><i className='icon flaticon-logout text-[calc(12px+1vh)]'></i></Link>
          </div>
        </div>
      </>
  )
}
