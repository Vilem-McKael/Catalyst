import React, { useState } from 'react'
import * as collectivesAPI from '../../utilities/collectives-api'
import { useNavigate } from 'react-router-dom'
import './NewCollectivePage.css'

export default function NewCollectivePage({collectives, updateCollectives}) {

    const [collectiveData, setCollectiveData] = useState({
        name: '',
        description: '',
        private: false
    })

    const navigate = useNavigate();

    function handleChange(evt) {
        setCollectiveData({...collectiveData, [evt.target.name]: evt.target.value})
    }

    async function handleSubmit(evt) {
        evt.preventDefault()
        try {
            const newCollectiveData = collectiveData;
            console.log(newCollectiveData)
            const collective = await collectivesAPI.createCollective(newCollectiveData)
            .then((res) => {
                updateCollectives([...collectives, res.data]);
                return res
            })
            .then((res) => navigate(`/collective/${res.data.id}`));
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='flex w-[80vw] h-[96vh] justify-center items-center'>
            <div className='flex flex-col justify-center items-center w-[40vw] h-[40vh] mb-[10vh] p-[4vmin] bg-gradient-to-b from-sky-600 via-indigo-700 to-blue-700 rounded-[10px] ring-8 ring-indigo-400'>
                <h1 className='text-[30px] text-[#F5F5F5]'>Establish a new Collective</h1>
                <h2 className='text-[18px] text-indigo-200'>What kind of space will you create?</h2>
                <form autoComplete="off" onSubmit={handleSubmit} className='flex flex-col items-center'>
                    <input type="text" name="name" value={collectiveData.name} placeholder='Collective Name:' onChange={handleChange} className='mt-[2vh] w-[30vw] text-[20px] text-stone-700' required /><br/>
                    <textarea type="text" name="description" value={collectiveData.description} placeholder='In a Few Words, Describe Your New Collective ...' onChange={handleChange} className='w-[30vw] h-[10vh] text-stone-700 p-[.5vmin] pl-[1vmin] rounded-[5px]' required /><br/>
                    <button type="submit" className='text-[#F5F5F5] text-[20px] bg-indigo-700'>create</button>
                </form>
            </div>
        </div>
    )
}
