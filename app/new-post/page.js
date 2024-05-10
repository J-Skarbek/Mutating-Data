import PostForm from '@/components/postForm';
import createPost from '@/actions/posts';

export default function NewPostPage() {
  return (
    <PostForm action={createPost}/>
  )
}
