import React from 'react'
import PostCard from '../PostCard/PostCard'

export default function PostDisplay({posts}) {
  return (
    <div>
    {posts.map((post, idx) => <PostCard key={idx} post={post}/>)}
    </div>
  )
}
