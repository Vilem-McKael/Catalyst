import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard'

import './PostDisplay.css'

export default function PostDisplay({user, posts, handleDeletePost}) {

    // Scrolls to bottom of the screen on load, showing most recent posts
    useEffect(() => 
        window.scrollTo(0, document.body.scrollHeight)
    , [posts])
    

    return (
        <div id="postdisplay" className='flex flex-col mb-[120px]'>
            {posts[posts.length-1] ?
            <>
                {posts.map((post, idx) => <PostCard
                key={idx}
                post={post}
                isPostUser={user.username === post.username}
                handleDeletePost={handleDeletePost}/>)}
            </>
            :
            <>
            </>
            }
            <div id="bottom"></div>
        </div>
    )
}
