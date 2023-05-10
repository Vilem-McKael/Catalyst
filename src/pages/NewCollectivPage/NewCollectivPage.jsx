import React, { useState } from 'react'
import * as collectivsAPI from '../../utilities/collectivs-api'

export default function NewCollectivPage() {

    const [collectivData, setCollectivData] = useState({
        name: '',
        description: '',
        private: false
    })

    function handleChange(evt) {
        setCollectivData({...collectivData, [evt.target.name]: evt.target.value})
    }

    async function handleSubmit(evt) {
        evt.preventDefault()
        try {
            const newCollectivData = collectivData;
            console.log(newCollectivData)
            const collectiv = await collectivsAPI.createCollectiv(newCollectivData)
            .then((res) => console.log(res))
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label>collectiv name: </label>&nbsp;&nbsp;
                <input type="text" name="name" value={collectivData.name} onChange={handleChange} required /><br/>
                <label>collectiv description: </label>&nbsp;&nbsp;
                <input type="text" name="description" value={collectivData.description} onChange={handleChange} required /><br/>
                <button type="submit">add post</button>
            </form>
        </div>
    )
}
