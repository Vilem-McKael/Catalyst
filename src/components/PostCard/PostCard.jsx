import React, { useState } from 'react'
import * as postsAPI from '../../utilities/posts-api'
import './PostCard.css'
import { Navigate } from 'react-router-dom'

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
    <div className='border-t-[.1vmin] border-black w-[80vw]'>
        <div className='flex justify-between p-[1vmin] ml-[2vmin] mr-[2vmin] mb-[-1vmin]'>
            <div className='flex flex-row'>
                <p className="text-[#F5F5F5]">{postData.username}</p>&nbsp;&nbsp;
                <p className="text-[#858585]">{created}</p>
            </div>
            <div>
            {isPostUser ? 
                <>
                    {editMode ? 
                    <div className='flex justify-between items-center mr-[2vmin]'>
                        <button type="submit" onClick={handleEdit} className='border-none text-[#F5F5F5] text-[calc(16px+1vmin)] p-0'><i className='icon flaticon-approved'></i></button>
                        <button onClick={() => setEditMode(false)} className='ml-[1.5vmin] text-[#F5F5F5] text-[12px] p-[.5vmin] py-[.2vmin] mb-[1vmin]'>Cancel</button>
                    </div>
                    :
                    <div className='flex justify-between mr-[0vmin]'>
                        <button onClick={() => setEditMode(true)} className='border-none p-0'><i className='icon flaticon-pencil text-[#F5F5F5] text-[calc(10px+1vmin)]'></i></button>
                        <button onClick={handleDelete} className='ml-[1.5vmin] border-none p-0'><i className='icon flaticon-remove text-[#F5F5F5] text-[calc(12px+1vmin)]'></i></button>
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
            <textarea type="text" name="content" value={editData.content} onChange={handleChange} required className='p-[.5vmin] ml-[3vmin] mb-[1vmin] mr-[2vmin] mt-[.5vmin] bg-stone-900 whitespace-pre-wrap w-[72.7vw] rounded-[5px]'/>
        :
            <p className='p-[1vmin] ml-[2vmin] mr-[2vmin] text-[#D5D5D5] whitespace-pre-wrap'>{postData.content}</p>
        }
    </div>
  )
}
