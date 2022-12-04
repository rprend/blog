import { readPosts } from "../lib/ReadPosts";
import { PostPreview } from "../components/PostPreview";
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home({ allPostsData }) {
  const { data: session } = useSession();

  return (
    <main>
      <h1>NIRI Blog</h1>
      {session &&
        <Link href="/create">Create a new post</Link>
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