import React, { useState } from 'react';
import { useAction, createPost } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const NewPostPage = () => {
  const createPostFn = useAction(createPost);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = () => {
    createPostFn({ title, content });
    setTitle('');
    setContent('');
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
        className='px-1 py-2 border rounded text-lg'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        onClick={handleCreatePost}
        className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
      >
        Create Post
      </button>
    </div>
  );
}

export default NewPostPage;