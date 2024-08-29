import { HttpError } from 'wasp/server'

export const getPosts = async (arg, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Post.findMany();
}

export const getPost = async (args, context) => {
  // Remove this line if posts should be publicly accessible
  // if (!context.user) { throw new HttpError(401) };

  const postId = args.id;
  if (typeof postId !== 'number' || isNaN(postId)) {
    throw new HttpError(400, "Invalid post ID");
  }

  const post = await context.entities.Post.findUnique({
    where: { id: postId },
    include: { comments: true }
  });

  if (!post) {
    throw new HttpError(404, "Post not found");
  }

  return post;
}