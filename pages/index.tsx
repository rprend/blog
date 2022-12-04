import { readPosts } from "../lib/ReadPosts";
import { PostPreview } from "../components/PostPreview";
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Home({ allPostsData }) {
  const { data: session } = useSession();

  return (
    <main>
      <div className="homepage-container">
        <div className="sidebar">
          <h1>NIRI Blog</h1>
        </div>
        <div className="posts">
          {session &&
            <Link href="/create">
              <PostPreview
                title="Create a new post"
                excerpt="Click here to create a new post"
              ></PostPreview>
            </Link>
          }
          {allPostsData.map(({ slug, date, title, excerpt, _content }) => (
            <Link href={`/blog/${slug}`} key={slug}>
              <PostPreview
                title = {title}
                date = {date}
                excerpt = {excerpt}
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

export function getStaticProps() {
  return {
    props: {
      allPostsData: readPosts()
    }
  }
}