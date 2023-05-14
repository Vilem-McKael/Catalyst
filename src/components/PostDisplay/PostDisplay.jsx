import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard'

import './PostDisplay.css'

export default function PostDisplay({user, posts, handleDeletePost}) {

    // Scrolls to bottom of the screen on load, showing most recent posts
    window.scrollTo(0, document.body.scrollHeight);

    return (
        <div id="postdisplay" className='flex flex-col-reverse mb-[9.5vmin]'>
            {(posts.length) ?
            <>
                {posts.map((post, idx) => <PostCard
                key={idx}
                post={post}
                isPostUser={user.username === post.username}
                handleDeletePost={handleDeletePost}/>)}
            </>
            :
            <>
                <h1 className='bottom-[10vh] text-center'>No posts yet! Why not be the first?</h1>
            </>
            }
        </div>
    )
}
