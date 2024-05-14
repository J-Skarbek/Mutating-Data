'use client';

import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { togglePostLikeStatus } from '@/actions/posts';
import { useOptimistic } from 'react';
import Image from 'next/image';

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <Image 
          src={post.image} 
          alt={post.title} 
          fill

          //Note, when you don't know the actual dimensions of user submitted
          //images, you don't want to overwrite them with width/height, but instead
          //use Fill. Fill will set the image css to 'position: absolute' which then
          //causes the image to fill up the whole screen. The workaround to this is to
          // set the Image parent's componet to 'position: relative' in CSS
          // width={}
          // height={}
        />
        {/* <img src={post.image} alt={post.title} /> */}
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form 
              action={action.bind(null, post.id)} 
              className={post.isLiked ? 'liked' : ''}
            >
              <LikeButton />
            </form>  
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  //https://react.dev/reference/react/useOptimistic
  //Coursera Lesson 178 for detailed 'how-to' guide
  const [optimisticPosts, updatedOptimisticPosts] = useOptimistic(posts, (prevPosts, updatedPostId) => {
    const updatedPostIndex = prevPosts.findIndex(post => post.id === updatedPostId);
    if (updatedPostIndex === -1) {
      return prevPosts;
    }
    const updatedPost = {
      ...prevPosts[updatedPostIndex]
    }
    updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
    updatedPost.isLiked = !updatedPost.isliked;
    const newPosts = [...prevPosts];
    newPosts[updatedPostIndex] = updatedPost;
    return newPosts;
  });

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(postId) {
    updatedOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost}/>
        </li>
      ))}
    </ul>
  );
}
