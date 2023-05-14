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
        const confirmed = confirm('Really delete this post?')
        if (confirmed) {
            try {
                handleDeletePost(post.id);
                res = await postsAPI.deletePost(post.id);
            } catch(err) {
                console.log(err)
            }
        }
    }

    const created = new Date(post.created).toLocaleString([], {
        month: "short", day: "numeric",
        hour: "numeric", minute: "numeric"
    })

  return (
    <div className='border-b-[.1vmin] border-black w-[80vw]'>
        <div className='flex justify-between p-[1vmin] ml-[2vmin] mr-[2vmin] mb-[-1vmin]'>
            <div className='flex flex-row'>
                <p className="text-[#F5F5F5]">{postData.username}</p>&nbsp;&nbsp;
                <p className="text-[#858585]">{created}</p>
            </div>
            <div>
            {isPostUser ? 
                <>
                    {editMode ? 
                    <div className='flex justify-between mr-[2vmin]'>
                        <button type="submit">update post</button>
                        <button onClick={() => setEditMode(false)} className='ml-[1vmin]'>Cancel</button>
                    </div>
                    :
                    <div className='flex justify-between mr-[2vmin]'>
                        <button onClick={() => setEditMode(true)}>Edit</button>
                        <button onClick={handleDelete} className='ml-[1vmin]'>X</button>
                    </div>
                }
                </>
                :
                <div></div>
            }
            </div>
        </div>
        {post.image ?
            <img className="post-image ml-[2vmin] mr-[2vmin]" src={post.image.url}/>
        :
        <></>
        }
        { editMode ?
            <input type="text" name="content" value={editData.content} onChange={handleChange} required className='p-[.5vmin] ml-[3vmin] mb-[1vmin] mr-[2vmin] bg-stone-900'/>
        :
            <p className='p-[1vmin] ml-[2vmin] mr-[2vmin] text-[#D5D5D5]'>{postData.content}</p>
        }
    </div>
  )
}
