import React, { useState } from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { Link, useParams } from 'react-router-dom';
import { getPost, createComment } from 'wasp/client/operations';
import { useAuth } from 'wasp/client/auth';

const ViewPostPage = () => {
  const { id } = useParams();
  const { data: user, isLoading: isUserLoading } = useAuth();
  const { data: post, isLoading, error } = useQuery(getPost, { id: parseInt(id) });
  const createCommentFn = useAction(createComment);
  const [newCommentContent, setNewCommentContent] = useState('');

  if (isUserLoading || isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;
  if (!post) return 'Post not found';

  const handleCreateComment = () => {
    if (!user) {
      alert('Please log in to comment');
      return;
    }
    createCommentFn({ content: newCommentContent, postId: post.id });
    setNewCommentContent('');
  };

  return (
    <div className='p-4'>
      <h1>{post.title}</h1>
      <p>Author: {post.author}</p>
      <p>{post.content}</p>
      <h2>Comments</h2>
      {post.comments && post.comments.map((comment) => (
        <div key={comment.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <p>{comment.content}</p>
          <p>By: {comment.author}</p>
        </div>
      ))}
      {user ? (
        <div className='mt-4'>
          <input
            type='text'
            placeholder='Your comment'
            className='px-1 py-2 border rounded text-lg'
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
          />
          <button
            onClick={handleCreateComment}
            className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded ml-2'
          >
            Add Comment
          </button>
        </div>
      ) : (
        <p>Please <Link to="/login">log in</Link> to comment.</p>
      )}
    </div>
  );
}

export default ViewPostPage;