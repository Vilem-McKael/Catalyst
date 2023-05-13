import React, { useEffect, useState } from 'react'
import * as collectivesAPI from '../../utilities/collectives-api'

export default function CollectiveSearchPage({userCollectives, updateCollectives}) {

    const [search, setSearch] = useState('')
    const [collectives, setCollectives] = useState([])
    const [displayMsg, setDisplayMsg] = useState('Try searching for a collectiv!')

    useEffect(function() {
        async function getMatchingCollectives() {
            if (search.length) {
                const request = {
                    search
                }
                const matchingCollectives = await collectivesAPI.searchForCollectives(request)
                console.log(matchingCollectives.data)
                if (matchingCollectives.data.length) {
                    setCollectives(matchingCollectives.data)
                } else {
                    setDisplayMsg('No collectives matched your search')
                }
                
            }
        }
        getMatchingCollectives()
    }, [search])

    function handleChange(evt) {
        setSearch(evt.target.value)
        if (search === '') {
            setCollectives([])
            setDisplayMsg('Try searching for a collective!')
        }
        console.log(search)
    }

    async function handleClick(evt) {
        const joinData = {
            collectiv: evt.target.name
        }
        const joinedCollective = collectives.filter((collective) => collective.id === parseInt(evt.target.name))[0]
        const joined = await collectivesAPI.joinCollective(joinData)
        console.log(joinedCollective);
        updateCollectives([...userCollectives, joinedCollective])
        console.log('Clicked!')
    }

    return (
        <div>
        <div>
            <input type='text' value={search} onChange={handleChange}></input>
        </div>
        <div>
            {collectives.length ? 
            <>
                {collectives.map((collective, idx) => {
                return <div key={idx}>
                            <h3 className='text-[2vmin]'>{collective.name}</h3>
                            <p>{collective.description}</p>
                            <button name={collective.id} onClick={handleClick}>Join</button>
                        </div>
                })}
            </>
            :
            <div>
                {displayMsg}
            </div>
            
            }
        </div>
        </div>
    )
}
