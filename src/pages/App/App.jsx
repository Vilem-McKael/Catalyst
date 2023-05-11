import React, { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import { getUser } from '../../utilities/users-service'

import './App.css'

import AuthPage from '../AuthPage/AuthPage'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import WelcomePage from '../WelcomePage/WelcomePage'
import CollectivPage from '../CollectivPage/CollectivPage'
import NewCollectivPage from '../NewCollectivPage/NewCollectivPage'
import CollectivListPage from '../CollectivListPage/CollectivListPage'
import CollectivSearchPage from '../CollectivSearchPage/CollectivSearchPage'

function App() {

  const [user, setUser] = useState(getUser)

  function updateUser(userState){
    console.log(userState)
    setUser(userState);
  }

  return (
    <main className="App" id='main'>
      {user ? 
        <div className='appview'>
        
        <div id='navbar'>
          <NavBar user={user} updateUser={updateUser} />
        </div>
        <div id='sidebar'>
          <SideBar />
        </div>
        <div id='mainview'>
          <Routes>
            <Route path='/' element={<WelcomePage user={user}/>}/>
            <Route path='/collectivs' element={<CollectivListPage />}/>
            <Route path='/collectivs/search' element={<CollectivSearchPage />}/>
            <Route path='/collectiv/:collectiv_id' element={<CollectivPage user={user}/>}/>
            <Route path='/collectiv/new' element={<NewCollectivPage />}/>
          </Routes>
        </div>
        </div>
        :
        <AuthPage updateUser={updateUser} />
      }
    </main>
  )
}

export default App