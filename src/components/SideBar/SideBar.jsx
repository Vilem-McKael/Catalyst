import React, { useState, useEffect } from 'react'
import CollectiveCard from '../CollectiveCard/CollectiveCard'

export default function SideBar({collectives}) {

    return (
        <div>
        <h2 className="underline text-[2vmin]">Collectives:</h2>
            {collectives.map((collective, idx) => <CollectiveCard collective={collective} key={idx}/>)}
        </div> 
    )
}
