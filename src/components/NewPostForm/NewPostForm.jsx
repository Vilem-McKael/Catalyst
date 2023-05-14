import React, { useEffect, useState } from 'react'
import * as postsAPI from '../../utilities/posts-api'
import './NewPostForm.css'
import { Link } from 'react-router-dom'

export default function NewPostForm({user, collective, handleAddPost}) {

    const [postContent, setPostContent] = useState('')

    const [error, setError] = useState('')

    const [image, setImage] = useState(null)

    // useEffect(() => {
    //     const listener = (event) => {
    //         if (event.code === "Enter") {
    //             handleEnter(event)
    //         }
    //     };
    //     document.addEventListener("keydown", listener)
    // }, [])

    // function handleEnter(event) {
    //     console.log('postcontent:', postContent)
    //     event.preventDefault()
        
    // }
 
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
            newPostData.user = user.user_id
            newPostData.collective_id = collective.id
            console.log(newPostData)
            const response = await postsAPI.createPost(newPostData)
            setPostContent('')
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
            <div id="newpostform" className='fixed bottom-0 border-t-[.1vmin] pt-[1vmin] border-black w-[80vw] z-10 bg-[#F5F5F5]'>
                <form className='flex flex-col justify-end' autoComplete="off" onSubmit={handleSubmit}>
                    <textarea className="ml-[2vmin] mr-[2vmin] mb-[1vmin] pl-[.5vmin] pt-[.5vmin] rounded-[5px] bg-stone-950" type="text" name="content" value={postContent} onChange={handleChange} required />
                    <div className='flex flex-row justify-between mr-[2vmin] mb-[1vmin]'>
                        <label className='pl-[2vmin] flex justify-center items-center mt-[1vmin]'>
                            <input id="custom-image-input" type="file" accept=".jpg,.jpeg,.png,.svg,.pdf" onChange={handleFileUpload}/>
                            <span className='border-black border-[.1vmin] rounded-[5px] p-[.5vmin] m-0'>{image ? image.name: '+ Add an Image'}</span>
                        </label>
                        <button type="submit" className='mt-[1vmin]'>add post</button>
                    </div>
                </form>
            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    )
}
