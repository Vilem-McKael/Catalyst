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
                if (JSON.stringify(matchingCollectives.data) !== '[]') {
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
        if (evt.target.value === '') {
            setCollectives([])
            setDisplayMsg('Try searching for a collective!')
        }
        console.log(search)
    }

    async function handleClick(evt) {
        const joinData = {
            collective: evt.target.name
        }
        const joinedCollective = collectives.filter((collective) => collective.id === parseInt(evt.target.name))[0]
        const joined = await collectivesAPI.joinCollective(joinData)
        console.log(joinedCollective);
        updateCollectives([...userCollectives, joinedCollective])
        console.log('Clicked!')
    }

    return (
        <div className='flex flex-col items-center w-[80vw]'>
            <h2 className='text-[30px] text-indigo-200 mt-[4vmin] text-center'>Looking for <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-pink-500 to-blue-800'>inspiration?</span><br/>
            <span className='text-[20px]'>Try searching for new collectives below.</span></h2>
            <div className='flex flex-row justify-center'>
                <input type='text' value={search} onChange={handleChange} className='w-[48vw] text-[2.5vmin] bg-indigo-500 mt-[4vmin]'/>
            </div>
            <div className='mt-[4vmin] flex-col justify-start'>
                {collectives.length ? 
                <>
                    {collectives.map((collective, idx) => {
                    return <div key={idx} className='w-[48vw] mt-[2vmin] text-[#F5F5F5] border-[#959595] border-b-[.1vmin]'>
                                <h3 className='text-[22px] flex flex-row items-start'>• {collective.name} <span className='text-[12px] text-[#959595] italic ml-[1vmin]'>{collective.members.length === 1 ? '1 member' : collective.members.length + ' members'}</span></h3>
                                <div className='flex flex-row justify-between items-end mb-[2vmin]'>
                                    <p className='text-[16px] text-[#B5B5B5]'>{collective.description}</p>
                                    <button name={collective.id} onClick={handleClick} className='text-[#F5F5F5]'>Join</button>
                                </div>
                                
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
