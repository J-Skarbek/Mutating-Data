import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

// export const metadata = {
//   title: 'All Posts',
//   description: 'Browse all our posts'
// }

//For dynamic metadata, it must be named 'generateMetadata, must be exported
// must be async, and must be in a page.js or layout.js file
export async function generateMetadata() {
  const posts = await getPosts();
  const numberOfPosts = posts.length;
  return {
    title: 'This is dynamic metadata',
    description: `There are ${numberOfPosts} to view`
  }

}

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
