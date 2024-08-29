import React, { useState } from 'react';
import { Link } from 'wasp/client/router';
import { useQuery, useAction, getPosts, createPost } from 'wasp/client/operations';
import { useAuth } from 'wasp/client/auth'; // Assuming this import is needed for useAuth

export function HomePage() {
  const { data: posts, isLoading, error } = useQuery(getPosts);
  const { data: user } = useAuth();

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className='p-4'>
      <h1 className='text-4xl font-bold mb-4'>Blog posts</h1>
      {user && <Link to='/new-post' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block'>Create New Post</Link>}
      {posts.map((post) => (
        <div key={post.id} className='mb-4 p-4 bg-gray-100 rounded-lg'>
          <h2 className='text-2xl font-bold'>{post.title}</h2>
          <p className='text-gray-600'>By {post.user?.username || 'Unknown'}</p>
          <p className='mt-2'>{post.content}</p>
          <Link to={`/view-post/${post.id}`} className='text-blue-500 hover:underline'>Read more</Link>
        </div>
      ))}
    </div>
  );
}

export default HomePage;