import React, { useEffect, useState } from 'react'
import * as collectivsAPI from '../../utilities/collectivs-api'
import * as postsAPI from '../../utilities/posts-api'
import NewPostForm from '../../components/NewPostForm/NewPostForm'
import PostDisplay from '../../components/PostDisplay/PostDisplay'
import { useParams } from 'react-router-dom'

export default function Collectiv({user}) {

  const { collectiv_id } = useParams();
  const [collectiv, setCollectiv] = useState({})
  const [posts, setPosts] = useState([])
  const [postsUpdated, setPostsUpdated] = useState(0)

  useEffect(function() {
    async function getCollectivById(id) {
      try {
        const retrievedCollectiv = await collectivsAPI.getCollectiv(id);
        console.log(retrievedCollectiv)
        setCollectiv(retrievedCollectiv)
      } catch (error) {
        console.log(error)
      }
    }
    getCollectivById(collectiv_id)
  }, [])

  useEffect(function() {
    async function getPosts() {
      const allPosts = await postsAPI.getPostsByCollectiv(collectiv_id)
      console.log('all posts: ', allPosts.data);
      setPosts(allPosts.data);
    }
    getPosts()
    console.log('use effect loaded')
  }, [postsUpdated])

  function updateDisplayedPosts() {
    console.log('hit update displayed posts')
    setPostsUpdated(postsUpdated + 1);
  }

  return (
    <>

      <h1>{collectiv.name}</h1>

      <h2>{collectiv.description}</h2>

      <h3>Add a post:</h3>
      <NewPostForm user={user} updateDisplayedPosts={updateDisplayedPosts} collectiv={collectiv}/>

      <PostDisplay posts={posts} updateDisplayedPosts={setPostsUpdated}/>
    
    </>
  )
}
