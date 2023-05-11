import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard'

export default function PostDisplay({posts}) {

    const [postsDisplayed, setPostsDisplayed] = useState([])

    useEffect(function() {
        setPostsDisplayed(posts)
    }, [posts])

    return (
        <div>
            {postsDisplayed.map((post, idx) => <PostCard key={idx} post={post}/>)}
        </div>
    )
}
