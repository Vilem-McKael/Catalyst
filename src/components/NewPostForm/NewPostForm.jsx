import React, { useEffect, useState } from 'react'
import * as postsAPI from '../../utilities/posts-api'
import { Navigate as navigate } from 'react-router-dom'

export default function NewPostForm({user}) {

    const [postData, setPostData] = useState({
        title: '',
        content: ''
    })
    const [error, setError] = useState('')

    useEffect(function() {
        console.log('Community loaded')
    })
 
    function handleChange(evt) {
        setPostData({...postData, [evt.target.name]: evt.target.value})
    }

    async function handleSubmit(evt) {
        evt.preventDefault()
        try {
            let newPostData = postData
            newPostData.user = user
            console.log(newPostData)
            const post = await postsAPI.createPost(postData)
            .then((res) => console.log(post));
            // navigate(to='/');
        } catch {
            // setError('log in failed - try again')
        }
    }



    return (
        <div>
            <div>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>title: </label>&nbsp;&nbsp;
                    <input type="text" name="title" value={postData.title} onChange={handleChange} required /><br/>
                    <label>content: </label>&nbsp;&nbsp;
                    <input type="text" name="content" value={postData.content} onChange={handleChange} required /><br/>
                    <button type="submit">add post</button>
                </form>
            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    )
}
