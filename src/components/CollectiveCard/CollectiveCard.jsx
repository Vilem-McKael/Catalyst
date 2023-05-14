import React from 'react'
import { Navigate as navigate, Link } from 'react-router-dom'

export default function CollectiveCard({collective}) {



  return (
    <Link to={`/collective/${collective.id}`}>
    <div>
        <h3 className='text-[16px]'>
        <span className='text-transparent bg-clip-text text-[20px] bg-gradient-to-b from-sky-500 to-blue-700'>•</span>
        {collective.name}</h3>
    </div>
    </Link>
  )
}
