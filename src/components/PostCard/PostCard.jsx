import React, { useState } from 'react'
import * as postsAPI from '../../utilities/posts-api'
import './PostCard.css'

export default function PostCard({post, handleDeletePost, isPostUser}) {

    const [postData, setPostData] = useState({...post})

    const [editData, setEditData] = useState({...post})

    const [editMode, setEditMode] = useState(false)

    async function handleEdit(evt) {
        evt.preventDefault()
        try {
            setPostData(editData);
            setEditMode(false);
            const response = await postsAPI.editPost(editData);
        } catch (err) {
            console.log(err)
        }

    }

    function handleChange(evt) {
        setEditData({...editData, [evt.target.name]: evt.target.value})
    }

    async function handleDelete(evt) {
        evt.preventDefault()
        try {
            handleDeletePost(post.id);
            res = await postsAPI.deletePost(post.id);
        } catch(err) {
            console.log(err)
        }
    }


  return (
    <>
        {editMode ?
        <>
            <form autoComplete="off" onSubmit={handleEdit}>
            <div>
                <p>{post.user} at {post.created}</p>
                <label>title: </label>&nbsp;&nbsp;
                <input type="text" name="title" value={editData.title} onChange={handleChange} required /><br/>
                <label>content: </label>&nbsp;&nbsp;
                <input type="text" name="content" value={editData.content} onChange={handleChange} required /><br/>
                <div><button type="submit">update post</button><button onClick={() => setEditMode(false)}>Cancel</button></div>
            </div>
            </form>
        </>
        :
        <>
        <div className='border-b-[.1vmin] border-black w-[80vw]'>
            <div className='flex justify-between p-[1vmin] ml-[2vmin] mr-[2vmin]'><p>{postData.username}</p><p>{postData.created}</p></div>
            {post.image ?
                <img className="post-image ml-[2vmin] mr-[2vmin]" src={post.image.url}/>
            :
            <>

            </>
            }
            <p className='p-[1vmin] ml-[2vmin] mr-[2vmin]'>{postData.content}</p>
            {isPostUser ? 
            <div className='flex justify-between p-[1vmin] ml-[2vmin] mr-[2vmin]'>
                <button onClick={() => setEditMode(true)}>Edit</button>
                <button onClick={handleDelete}>X</button>
            </div>
            :
            <br/>
            }
        </div>
        </>
        }
    </>
  )
}
