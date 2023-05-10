import React, { useState } from 'react'
import * as postsAPI from '../../utilities/posts-api'

export default function PostCard({post, updateDisplayedPosts}) {

    const [editMode, setEditMode] = useState(false)

    const [postData, setPostData] = useState({
        id: post.id,
        title: post.title,
        content: post.content,
        user: post.user,
        created: post.created
    })

    async function handleEdit(evt) {
        evt.preventDefault()
        try {
            const response = await postsAPI.editPost(postData);
            setEditMode(false);
            updateDisplayedPosts();
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
            .then(() => updateDisplayedPosts());
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
                <p>{post.user} at {post.created}</p>
                <label>title: </label>&nbsp;&nbsp;
                <input type="text" name="title" value={postData.title} onChange={handleChange} required /><br/>
                <label>content: </label>&nbsp;&nbsp;
                <input type="text" name="content" value={postData.content} onChange={handleChange} required /><br/>
                <div><button type="submit">update post</button><button onClick={() => setEditMode(false)}>Cancel</button></div>
            </form>
        </>
        :
        <>
            <h3>{post.title}</h3>
            <p>{post.user} at {post.created}</p>
            <p>{post.content}</p>
            <div><button onClick={() => setEditMode(true)}>Edit</button><button onClick={handleDelete}>X</button></div>
        </>
        }
    </>
  )
}
