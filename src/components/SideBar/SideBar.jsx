import React, { useState, useEffect } from 'react'
import CollectiveCard from '../CollectiveCard/CollectiveCard'

export default function SideBar({collectives}) {

    return (
        <div className='h-[85vh]'>
            <h2 className="text-[16px] mb-[.5vmin]">&nbsp;&nbsp;&nbsp;&nbsp;Collectives:</h2>
            {collectives.map((collective, idx) => <CollectiveCard collective={collective} key={idx}/>)}
        </div> 
    )
}
