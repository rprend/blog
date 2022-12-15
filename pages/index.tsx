import { readPosts } from "../lib/ReadPosts";
import { PostPreview } from "../components/PostPreview";
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Topbar from "../components/Topbar";

export default function Home({ allPostsData }) {
  const { data: session } = useSession();

  return (
    <>
    <main>
      <Topbar></Topbar>
      <div className="homepage-container">
        <div className="posts">
          <h5>Recent Posts</h5>
          {session &&
            <Link href="/create">
              <b>Create a new post</b>
            </Link>
          }
          {allPostsData.map(({ slug, date, title, excerpt }) => (
            <PostPreview
              title = {title}
              date = {date}
              excerpt = {excerpt}
              slug = {slug}
              key = {slug}
            />
          ))}
        </div>
        <div className="sidebar">
          <h5>Recommendations</h5>
          <a target='_blank' href="https://youtube.com/watch?v=zDsDCRVVCYw" rel="noreferrer">ryans youtube</a>
        </div>
      </div>
    </main>
    </>
  )
}

export function getStaticProps() {
  return {
    props: {
      allPostsData: readPosts()
    }
  }
}