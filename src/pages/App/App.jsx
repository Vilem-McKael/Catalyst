import React, { useState, useEffect } from 'react'
import {Routes, Route, useParams} from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import * as collectivesAPI from '../../utilities/collectives-api'

import './App.css'

import AuthPage from '../AuthPage/AuthPage'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import WelcomePage from '../WelcomePage/WelcomePage'
import CollectivePage from '../CollectivePage/CollectivePage'
import NewCollectivePage from '../NewCollectivePage/NewCollectivePage'
import CollectiveSearchPage from '../CollectiveSearchPage/CollectiveSearchPage'
import DisplayBar from '../../components/DisplayBar/DisplayBar'

function App() {

  const [user, setUser] = useState(getUser())

  const [collectives, setCollectives] = useState([])

  const [currentCollective, setCurrentCollective] = useState({})

  function updateUser(userState){
    setUser(userState);
  }

  function updateCollectives(updatedCollectives) {
    setCollectives(updatedCollectives)
  }

  function updateCurrentCollective(collective) {
    setCurrentCollective(collective)
  }

  useEffect(function() {
      async function getCollectives() {
          try {
              const response = await collectivesAPI.getUserCollectives();
              setCollectives(response.data);
          } catch (err) {
              
          }
      }
      getCollectives();
  }, [user])

//  className='bg-gradient-to-r from-[#0A0E1E] via-[#0E1222] to-[#0A0E1E]'

  return (
    <main className="App font-nunito" id='main'>
      {user ? 
        <div className='appview'>
        
        <div id='navbar'>
          <NavBar user={user} updateUser={updateUser} currentCollective={currentCollective} />
        </div>
        <div id='displaybar'>
          <DisplayBar user={user} currentCollective={currentCollective} />
        </div>
        <div id='sidebar'>
          <SideBar collectives={collectives} />
        </div>
        <div id='mainview' className='font-nunito'>
          <Routes>
            <Route path='/' element={<WelcomePage user={user}/>}/>
            <Route path='/collectives/search' element={<CollectiveSearchPage userCollectives={collectives} updateCollectives={updateCollectives}/>}/>
            <Route path='/collective/:collective_id' element={<CollectivePage user={user} updateCurrentCollective={updateCurrentCollective}/>}/>
            <Route path='/collective/new' element={<NewCollectivePage collectives={collectives} updateCollectives={updateCollectives}/>}/>
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