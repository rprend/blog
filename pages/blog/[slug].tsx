import path from 'path'
import fs from 'fs'
import { readPosts } from '../../lib/ReadPosts'
import Tiptap from '../../components/Tiptap'

export default function Post(params) {
  const post = JSON.parse(params.post)

  return (
    <main>
      <h1>{post.title}</h1>
      <h3>Last updated {post.date}</h3>
      <Tiptap
        editable={false}
        content={post.content}
      />
    </main>
  )
}

export async function getStaticPaths() {
  const paths = readPosts().map((post) => {
    return { params: { slug: post.slug } }
  })

  return {
    paths,
    fallback: false
  }
}

export function getStaticProps({ params }) {
  const post = fs.readFileSync(path.join(process.cwd(), 'posts', `${params.slug}.json`), 'utf8')

  return {
    props: { post }
  }
}