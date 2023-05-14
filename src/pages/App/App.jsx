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
    console.log(userState)
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
              console.log('response: ', response, ' response data: ', response.data)
              setCollectives(response.data);
          } catch (err) {
              console.log(err)
          }
      }
      getCollectives();
  }, [user])

  // nav  className='bg-gradient-radial from-indigo-900 via-indigo-950 to-black border-b'
  // dis  className='bg-gradient-to-b from-blue-950 to-black'
  // side className='bg-gradient-radial from-blue-600 via-blue-700 to-blue-800 ring-8 ring-blue-900 ring-inset'

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