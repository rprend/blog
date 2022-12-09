import { readPosts } from "../lib/ReadPosts";
import { PostPreview } from "../components/PostPreview";
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Sidebar from "../components/Sidebar";

export default function Home({ allPostsData }) {
  const { data: session } = useSession();

  return (
    <main>
      <div className="homepage-container">
        <Sidebar></Sidebar>
        <div className="posts">
          {session &&
            <Link href="/create">
              <PostPreview
                title="Create a new post"
                excerpt="Click here to create a new post"
              ></PostPreview>
            <hr />
            </Link>
          }
          {allPostsData.map(({ slug, date, title, excerpt }) => (
            <Link href={`/blog/${slug}`} key={slug}>
              <PostPreview
                title = {title}
                date = {date}
                excerpt = {excerpt}
              />
            <hr />
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