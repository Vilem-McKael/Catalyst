import React from 'react'

export default function DisplayBar({user, currentCollective}) {
  return (
    <div className='flex flex-row items-center'>
    <div className='display flex flex-row items-end justify-between w-[78vw]'>
    
    {Object.keys(currentCollective).length ?
        <>
        
            <div className='pl-[2vmin] flex flex-row justify-center items-end'>
                <h3 className='text-[1.5vmin] mr-[2vmin]'>{currentCollective.name}</h3>
                <p>{currentCollective.description}</p>
            </div>
            <div className='flex flex-row justify-center'>
                <p className='italic'>{currentCollective.members.length === 1 ? '1 member' : currentCollective.members.length + ' members'}</p>
            </div>
        </>
        :
        <div className='flex flex-row justify-center pl-[2vmin]'>
            <h3 className='text-[2vmin]'>Welcome, {user.username}</h3>
        </div>
    }
    </div>
    </div>
  )
}
