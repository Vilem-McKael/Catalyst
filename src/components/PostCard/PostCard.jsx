import React, { useState } from 'react'
import * as postsAPI from '../../utilities/posts-api'
import { useParams } from 'react-router-dom'

export default function PostCard({post, reloadPosts}) {

    console.log(post)

    const { collectiv_id } = useParams();

    const [editMode, setEditMode] = useState(false)

    const [postData, setPostData] = useState({
        id: post.id,
        title: post.title,
        content: post.content,
        user: post.user,
        created: post.created,
        collectiv: collectiv_id
    })

    async function handleEdit(evt) {
        evt.preventDefault()
        try {
            const response = await postsAPI.editPost(postData);
            setEditMode(false);
            reloadPosts();
        } catch (err) {
            console.log(err)
        }

    }

    function handleChange(evt) {
        setPostData({...postData, [evt.target.name]: evt.target.value})
    }

    async function handleDelete() {
        try {
            const response = await postsAPI.deletePost(post.id)
            .then((res) => reloadPosts());
        } catch(err) {
            console.log(err)
        }
    }

    // function handleEditMode() {
    //     if user = user_id
    // }


  return (
    <>
        {editMode ?
        <>
            <form autoComplete="off" onSubmit={handleEdit}>
            <div>
                <p>{post.user} at {post.created}</p>
                <label>title: </label>&nbsp;&nbsp;
                <input type="text" name="title" value={postData.title} onChange={handleChange} required /><br/>
                <label>content: </label>&nbsp;&nbsp;
                <input type="text" name="content" value={postData.content} onChange={handleChange} required /><br/>
                <div><button type="submit">update post</button><button onClick={() => setEditMode(false)}>Cancel</button></div>
            </div>
            </form>
        </>
        :
        <>
        <div className='border-[.1vmin] border-black rounded-[1vmin] w-[30vmin]'>
            <div className='flex justify-between p-[1vmin]'><p>{post.username}</p><p>{post.created}</p></div>
            <h3 className='text-[2vmin] p-[1vmin]'>{post.title}</h3>
            
            <p className='p-[1vmin]'>{post.content}</p>
            <div className='flex justify-between p-[1vmin]'><button onClick={() => setEditMode(true)}>Edit</button><button onClick={handleDelete}>X</button></div>
        </div>
        </>
        }
    </>
  )
}
