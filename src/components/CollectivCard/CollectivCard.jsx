import React from 'react'
import { Link } from 'react-router-dom'

export default function CollectivCard({collectiv}) {
  return (
    <Link to={`/collectiv/${collectiv.id}`}>
    <div>
        <h3>{collectiv.name}</h3>
        {/* <p>{collectiv.description}</p>
        <p>{collectiv.members}</p>
        <p>{collectiv.id}</p> */}
    </div>
    </Link>
  )
}
