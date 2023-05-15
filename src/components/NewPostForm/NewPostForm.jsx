import React, { useEffect, useState } from 'react'
import * as postsAPI from '../../utilities/posts-api'
import './NewPostForm.css'

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
            newPostData.user = user.user_id
            newPostData.collective_id = collective.id
            let postResponse = await postsAPI.createPost(newPostData)
            setPostContent('')
            if (!image) {
                postResponse.data.image = null;
                handleAddPost(postResponse.data)
            } else {
                const post = postResponse.data;
                const imgForm = new FormData()
                imgForm.append('image-file', image);
                const response = await postsAPI.addImage(imgForm, post.id);
                
                post.image = response.image;
            
                handleAddPost(post)
            }
            
            
            // window.scrollTo(0, document.body.scrollHeight);
        } catch (err) {
            setError('Something went wrong')
            console.log(err)
        }
    }



    return (
        <div>
            <div id="newpostform" className='fixed bottom-0 border-t-[.1vmin] pt-[1vmin] border-black w-[80vw] z-10 bg-[#F5F5F5]'>
                <form className='flex flex-col justify-end' autoComplete="off" onSubmit={handleSubmit}>
                    <textarea className="ml-[2vmin] mr-[2vmin] mb-[1vmin] pl-[.5vmin] pt-[.5vmin] rounded-[5px] bg-stone-950 text-[#D5D5D5] h-[50px]" type="text" name="content" value={postContent} onChange={handleChange} required />
                    <div className='flex flex-row justify-between mr-[2vmin] mb-[1vmin]'>
                        <label className='pl-[2vmin] flex justify-center items-center mt-[0vmin]'>
                            <input id="custom-image-input" type="file" accept=".jpg,.jpeg,.png,.svg,.pdf" onChange={handleFileUpload} className=''/>
                            <span className='border-black border-[.1vmin] rounded-[5px] p-[.7vmin] pb-[0] pt-[.6vmin] bg-gradient-to-b from-blue-800 to-indigo-800'>{image ? image.name: <i className='icon flaticon-add-image text-[calc(14px+1vh)] text-[#F5F5F5]'></i>}</span>
                        </label>
                        <button type="submit" className='mt-[0vmin] p-[.8vmin] pt-[0.7vmin] pb-[0vmin] bg-gradient-to-b from-blue-800 to-indigo-800'><i className='icon flaticon-send text-[calc(14px+.8vh)] text-[#F5F5F5]'></i></button>
                    </div>
                </form>
            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    )
}
