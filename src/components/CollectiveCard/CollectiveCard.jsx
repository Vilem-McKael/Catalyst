import React from 'react'
import { Navigate as navigate, Link } from 'react-router-dom'

export default function CollectiveCard({collective}) {



  return (
    <Link to={`/collective/${collective.id}`}>
    <div className='flex flex-row items-center'>
        <span className='text-transparent bg-clip-text text-[20px] bg-gradient-to-b from-sky-500 to-blue-700'>•</span>
        <h3 className='Link2 text-[16px] ml-[1vmin]'>{collective.name}</h3>
    </div>
    </Link>
  )
}
