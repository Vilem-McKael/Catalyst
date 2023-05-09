import React, { useEffect, useState } from 'react'
import * as postsAPI from '../../utilities/posts-api'
import NewPostForm from '../../components/NewPostForm/NewPostForm'
import PostDisplay from '../../components/PostDisplay/PostDisplay'

export default function Community({user}) {

  const [posts, setPosts] = useState([])


  useEffect(function() {
    async function getPosts() {
      const allPosts = await postsAPI.getAllPosts()
      setPosts(allPosts);
    }
    getPosts()
  }, [])


  return (
    <>

      <h1>Community</h1>

      <h3>Add a post:</h3>
      <NewPostForm user={user}/>

      <h2>All posts:</h2>
      {posts.map((post, idx) => {
        <div key={idx}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      })}
      <PostDisplay posts={posts}/>


    </>
  )
}
