import { readPosts } from "../lib/ReadPosts";
import { PostPreview } from "../components/PostPreview";
import Link from 'next/link'

export default function Home({ allPostsData }) {

  return (
    <main>
      <h1>NIRI Blog</h1>
      <Link href="/create">Create a new post</Link>
      {allPostsData.map(({ slug, date, title, _content }) => (
        <Link href={`/blog/${slug}`} key={slug}>
          <PostPreview
            title = {title}
            date = {date}
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