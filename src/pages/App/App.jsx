import React, { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import { getUser } from '../../utilities/users-service'

import './App.css'

import AuthPage from '../AuthPage/AuthPage'
import NavBar from '../../components/NavBar/NavBar'
import WelcomePage from '../WelcomePage/WelcomePage'
import CommunityPage from '../CommunityPage/CommunityPage'

function App() {

  const [user, setUser] = useState(getUser)

  function updateUser(userState){
    console.log(userState)
    setUser(userState);
  }

  return (
    <main className="App">
      {user ? 
        <>
          <NavBar user={user} updateUser={updateUser} />
          <Routes>
            <Route path='/' element={<WelcomePage user={user}/>}/>
            <Route path='/community' element={<CommunityPage user={user}/>}/>
          </Routes>
        </>
        :
        <AuthPage updateUser={updateUser} />
      }
    </main>
  )
}

export default App