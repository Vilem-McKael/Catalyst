import React, { useState } from 'react'
import * as collectivesAPI from '../../utilities/collectives-api'
import { useNavigate } from 'react-router-dom'

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
                console.log(res);
                updateCollectives([...collectives, res.data]);
                return res
            })
            .then((res) => navigate(`/collective/${res.data.id}`));
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label>collective name: </label>&nbsp;&nbsp;
                <input type="text" name="name" value={collectiveData.name} onChange={handleChange} required /><br/>
                <label>collective description: </label>&nbsp;&nbsp;
                <input type="text" name="description" value={collectiveData.description} onChange={handleChange} required /><br/>
                <button type="submit">create collective</button>
            </form>
        </div>
    )
}
