import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard'

export default function PostDisplay({user, posts, handleDeletePost}) {

    return (
        <div className='mb-[16vh] pt-[-10vmin]'>
            {posts.length && posts.map((post, idx) => <PostCard
                key={idx}
                post={post}
                isPostUser={user.username === post.username}
                handleDeletePost={handleDeletePost}/>)}
        </div>
    )
}
