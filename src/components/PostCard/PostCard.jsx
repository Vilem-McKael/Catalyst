import React from 'react'

export default function PostCard({post}) {
  return (
    <>
        <h3>{post.title}</h3>
        <p>{post.user} at {post.created}</p>
        <p>{post.content}</p>
    </>
  )
}
