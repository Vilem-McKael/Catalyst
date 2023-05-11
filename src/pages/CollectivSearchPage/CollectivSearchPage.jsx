import React, { useEffect, useState } from 'react'
import * as collectivsAPI from '../../utilities/collectivs-api'

export default function CollectivSearchPage() {

    const [search, setSearch] = useState('')
    const [collectivs, setCollectivs] = useState([])
    const [displayMsg, setDisplayMsg] = useState('Try searching for a collectiv!')

    useEffect(function() {
        async function getMatchingCollectivs() {
            if (search.length) {
                const request = {
                    search
                }
                const matchingCollectivs = await collectivsAPI.searchForCollectivs(request)
                console.log(matchingCollectivs.data)
                if (matchingCollectivs.data.length) {
                    setCollectivs(matchingCollectivs.data)
                } else {
                    setDisplayMsg('No collectivs matched your search')
                }
                
            }
        }
        getMatchingCollectivs()
    }, [search])

    function handleChange(evt) {
        setSearch(evt.target.value)
        if (search === '') {
            setCollectivs([])
            setDisplayMsg('Try searching for a collectiv!')
        }
        console.log(search)
    }

    async function handleClick(evt) {
        const joinData = {
            collectiv: evt.target.name
        }
        const joined = await collectivsAPI.joinCollectiv(joinData)
        console.log('Clicked!')
    }

    return (
        <div>
        <div>
            <input type='text' value={search} onChange={handleChange}></input>
        </div>
        <div>
            {collectivs.length ? 
            <>
                {collectivs.map((collectiv, idx) => {
                return <div>
                            <h3 className='text-[2vmin]'>{collectiv.name}</h3>
                            <p>{collectiv.description}</p>
                            <button name={collectiv.id} onClick={handleClick}>Join</button>
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
