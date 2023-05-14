import React, { useEffect, useState } from 'react'
import * as collectivesAPI from '../../utilities/collectives-api'
import * as postsAPI from '../../utilities/posts-api'
import NewPostForm from '../../components/NewPostForm/NewPostForm'
import PostDisplay from '../../components/PostDisplay/PostDisplay'
import { useParams } from 'react-router-dom'

export default function CollectivePage({user, updateCurrentCollective}) {

  const { collective_id } = useParams()

  const [collective, setCollective] = useState({})
  const [posts, setPosts] = useState([])
  // const [postsWithImages, setPostsWithImages] = useState([])

  useEffect(function() {
    async function loadCollectivePosts() {
      try {
        const retrievedCollective = await collectivesAPI.getCollective(collective_id);
        console.log(retrievedCollective)
        setCollective(retrievedCollective)
        updateCurrentCollective(retrievedCollective)
        const response = await postsAPI.getPostsByCollective(retrievedCollective.id);
        console.log(response);
        const allPosts = response.data.posts;
        const allImages = response.data.images;
        console.log('all posts: ', allPosts, 'all images: ', allImages);
        if (allPosts.length) {
          const postsWithImages = (allImages.map((image) => image.post))
          console.log(allImages.map((image) => image.post));
          for (let i = 0; i < allPosts.length; i++) {
            const post = allPosts[i]
            if (postsWithImages.includes(post.id)) {
              post.image = allImages[postsWithImages.indexOf(post.id)]
            } else {
              post.image = null;
            }
          }
          setPosts(allPosts)
        }
      } catch (error) {
        console.log(error)
      }
    }
    loadCollectivePosts()
  }, [collective_id])

  function handleAddPost(newPost) {
    setPosts([...posts, newPost])
  }

  function handleDeletePost(deleteId) {
    setPosts((posts) => posts.filter((post) => post.id !== deleteId))
  }



  return (
    <>
      {/* <hr className='bg-black border-black border-[.1vmin] w-[80vw] m-[0vmin]'/> */}
      <PostDisplay user={user} posts={posts} handleDeletePost={handleDeletePost}/>
      <NewPostForm user={user} collective={collective} handleAddPost={handleAddPost}/>
    
    </>
  )
}
