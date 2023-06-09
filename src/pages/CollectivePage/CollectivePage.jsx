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

  useEffect(function() {
    async function loadCollectivePosts() {
      try {
        setPosts([])
        const retrievedCollective = await collectivesAPI.getCollective(collective_id);
        setCollective(retrievedCollective)
        updateCurrentCollective(retrievedCollective)
        const response = await postsAPI.getPostsByCollective(retrievedCollective.id);
        const unsortedPosts = response.data.posts;
        const allPosts = unsortedPosts.sort((a, b) => {
          return new Date(a.created) - new Date(b.created)
        })
        const allImages = response.data.images;
        if (allPosts.length) {
          const postsWithImages = (allImages.map((image) => image.post))
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
      <PostDisplay user={user} posts={posts} handleDeletePost={handleDeletePost}/>
      <NewPostForm user={user} collective={collective} handleAddPost={handleAddPost}/>
    
    </>
  )
}
