import { readPosts } from "../lib/ReadPosts";
import { PostPreview } from "../components/PostPreview";
import Link from 'next/link'
import { GetStaticProps } from "next";


export default function Home({ allPostsData }) {

  return (
    <main>
      <h1>NIRI Blog</h1>
      <Link href="/create">Create a new post</Link>
      {allPostsData.map(({ id, date, title, content }) => (
        <Link href={`/blog/${id}`} key={id}>
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