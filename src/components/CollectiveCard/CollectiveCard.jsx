import React from 'react'
import { Navigate as navigate, Link } from 'react-router-dom'

export default function CollectiveCard({collective}) {



  return (
    <Link to={`/collective/${collective.id}`}>
    <div>
        <h3>{collective.name}</h3>
        {/* <p>{collectiv.description}</p>
        <p>{collectiv.members}</p>
        <p>{collectiv.id}</p> */}
    </div>
    </Link>
  )
}
