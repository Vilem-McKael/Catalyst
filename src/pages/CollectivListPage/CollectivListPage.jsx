import React, { useState, useEffect } from 'react'
import * as collectivsAPI from '../../utilities/collectivs-api'
import CollectivCard from '../../components/CollectivCard/CollectivCard'

export default function CollectivList() {

    const [collectivs, setCollectivs] = useState([])

    useEffect(function() {
        async function getCollectivs() {
            try {
                const response = await collectivsAPI.getUserCollectivs();
                console.log('response: ', response, ' response data: ', response.data)
                setCollectivs(response.data);
                console.log(collectivs)
            } catch (err) {
                console.log(err)
            }
        }
        getCollectivs();
    }, [])

    return (
        <div>
            {collectivs.map((collectiv, idx) => <CollectivCard collectiv={collectiv} key={idx}/>)}
        </div> 
    )
}
