import React, { useEffect, useState } from 'react'
import * as postsAPI from '../../utilities/posts-api'

export default function NewPostForm({user, collective, handleAddPost}) {

    const [postContent, setPostContent] = useState('')

    const [error, setError] = useState('')

    const [image, setImage] = useState(null)

 
    function handleChange(evt) {
        setPostContent(evt.target.value)
    }

    function handleFileUpload(evt) {
        const file = evt.target.files[0];
        setImage(file);
    }

    async function handleSubmit(evt) {
        evt.preventDefault()
        try {
            const newPostData = {
                content: postContent
            }
            setPostContent('')
            newPostData.user = user.user_id
            newPostData.collective_id = collective.id
            console.log(newPostData)
            const response = await postsAPI.createPost(newPostData)
            const post = response.data;
            console.log(post)
            if (image) {
                console.log(image)
                const imgForm = new FormData()
                imgForm.append('image-file', image);
                console.log(imgForm)
                const response = await postsAPI.addImage(imgForm, post.id);
                
                post.image = response.image;
            }
            handleAddPost(post)
        } catch (err) {
            setError('Something went wrong')
            console.log(err)
        }
    }



    return (
        <div>
            <div className='fixed bottom-0 border-t-[.1vmin] pt-[1vmin] border-black w-[80vw] z-10 bg-[#F5F5F5]'>
                <form className='flex flex-col justify-end'autoComplete="off" onSubmit={handleSubmit}>
                    <label>content: </label>&nbsp;&nbsp;
                    <textarea className="ml-[2vmin] mr-[2vmin]" type="text" name="content" value={postContent} onChange={handleChange} required />
                    <input type="file" onChange={handleFileUpload}/>
                    <button type="submit">add post</button><br/><br/>
                </form>
            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    )
}
