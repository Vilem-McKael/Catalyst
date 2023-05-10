import React from 'react'

export default function WelcomePage({user}) {
  return (
    <>
        <div>WelcomePage</div>
        <p>username: {user.username}</p>
        <p>id: {user.user_id}</p>
    </>
  )
}
