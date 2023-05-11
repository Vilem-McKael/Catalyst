import React, { useEffect, useState } from 'react'
import * as collectivsAPI from '../../utilities/collectivs-api'
import * as postsAPI from '../../utilities/posts-api'
import NewPostForm from '../../components/NewPostForm/NewPostForm'
import PostDisplay from '../../components/PostDisplay/PostDisplay'
import { useParams } from 'react-router-dom'

export default function CollectivPage({user}) {

  const { collectiv_id } = useParams();
  const [collectiv, setCollectiv] = useState({})

  const [posts, setPosts] = useState([])
  const [postsUpdated, setPostsUpdated] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(function() {
    async function loadPage() {
      try {
        const retrievedCollectiv = await collectivsAPI.getCollectiv(collectiv_id);
        console.log(retrievedCollectiv)
        setCollectiv(retrievedCollectiv)
        const allPosts = await postsAPI.getPostsByCollectiv(collectiv_id)
        console.log('all posts: ', allPosts.data);                                
        setPosts(allPosts.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    loadPage()
  }, [collectiv_id])

  // useEffect(function() {
  //   async function getPosts() {
  //     const allPosts = await postsAPI.getPostsByCollectiv(collectiv_id)
  //     console.log('all posts: ', allPosts.data);                                
  //     setPosts(allPosts.data);
  //     setIsLoading(false);
  //   }
  //   getPosts()
  //   console.log('use effect loaded')
  // })

  function updatePosts(updatedPosts) {
    setPosts(updatedPosts);
  }

  return (
    <>

      <h1 className="text-[3vmin]">{collectiv.name}</h1>
      <br />
      <h2 className='text-slate-700'>{collectiv.description}</h2>

      <hr className='bg-black border-black border-[.1vmin] w-[80vw] m-[0vmin]'/>

      <h3>Add a post:</h3>
      <NewPostForm user={user} collectiv={collectiv}/>

      <PostDisplay posts={posts}/>
    
    </>
  )
}
