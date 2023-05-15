import React from 'react'

export default function DisplayBar({user, currentCollective}) {
  return (
    <div className='flex flex-row items-center'>
    <div className='display flex flex-row items-end justify-between w-[78vw]'>
    
    {Object.keys(currentCollective).length ?
        <>
        
            <div className='pl-[1vmin] flex flex-row justify-center items-center'>
                <h3 className='text-[14px] text-[#F5F5F5] mr-[1.5vmin]'>{currentCollective.name.length > 25 ? currentCollective.name.slice(0, 25) + '...' : currentCollective.name }</h3>
                <p className='text-[14px]'>{currentCollective.description.length > 100 ? currentCollective.description.slice(0, 120) + '...' : currentCollective.description }</p>
            </div>
            <div className='flex flex-row justify-center items-center'>
                <p className='text-[#F5F5F5] mt-[0.5vmin]'>{currentCollective.members.length}</p><i className='icon flaticon-multiple-users-silhouette ml-[.5vmin] text-[16px] text-[#F5F5F5] p-0'></i>
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
