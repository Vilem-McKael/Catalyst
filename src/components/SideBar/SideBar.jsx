import React, { useState, useEffect } from 'react'
import * as collectivsAPI from '../../utilities/collectivs-api'
import CollectivCard from '../../components/CollectivCard/CollectivCard'

export default function SideBar() {

    const [collectivs, setCollectivs] = useState([])

    useEffect(function() {
        async function getCollectivs() {
            try {
                const allCollectivs = await collectivsAPI.getAllCollectivs();
                console.log(allCollectivs)
                setCollectivs(allCollectivs);
            } catch (err) {
                console.log(err)
            }
        }
        getCollectivs();
    }, [])

    return (
        <div className='flex items-center justify-center bg-white'>
        <h2 className="underline">Collectives:</h2>
            {collectivs.map((collectiv, idx) => <CollectivCard collectiv={collectiv} key={idx}/>)}
        </div> 
    )
}
