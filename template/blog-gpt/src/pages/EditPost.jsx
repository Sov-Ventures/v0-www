import React, { useState } from 'react';
import { useQuery, useAction, updatePost } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const EditPostPage = () => {
  const { data: post, isLoading, error } = useQuery(getPost, { id: parseInt(window.location.pathname.split('/').pop()) });
  const updatePostFn = useAction(updatePost);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdatePost = () => {
    updatePostFn({ id: post.id, title, content });
  };

  return (
    <div className='p-4'>
      <input
        type='text'
        placeholder='Title'
        className='px-1 py-2 border rounded text-lg'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder='Content'
        className='px-1 py-2 border rounded text-lg mt-2'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleUpdatePost}
        className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded mt-2'
      >
        Update Post
      </button>
    </div>
  );
}

export default EditPostPage;