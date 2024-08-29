import { HttpError } from 'wasp/server'

export const createPost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Post.create({
    data: {
      title: args.title,
      content: args.content,
      userId: context.user.id
    }
  });
}

export const updatePost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const post = await context.entities.Post.findUnique({
    where: { id: args.id }
  });
  if (post.userId !== context.user.id) { throw new HttpError(403) };
  return context.entities.Post.update({
    where: { id: args.id },
    data: { title: args.title, content: args.content }
  });
}

export const deletePost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const post = await context.entities.Post.findUnique({
    where: { id: args.id }
  });
  if (post.userId !== context.user.id) { throw new HttpError(403) };
  return context.entities.Post.delete({
    where: { id: args.id }
  });
}

export const createComment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Comment.create({
    data: {
      content: args.content,
      userId: context.user.id,
      postId: args.postId
    }
  });
}