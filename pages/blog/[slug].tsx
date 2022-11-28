import path from 'path'
import fs from 'fs'
import { readPosts } from '../../lib/ReadPosts'
import Tiptap from '../../components/Tiptap'

export default function Post(params) {
  const post = JSON.parse(params.post)
  console.log(post.content)

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
  // const paths = readPosts()
  // console.log("GETTING STATIC PATHS")
  // debugger
  // console.log(paths)
  // const second = paths.map((post) => {
  //   return { params: post.slug }
  // })
  // console.log("PATHS: " + paths)
  const paths = readPosts()

  const last = [{ params: { slug: 'abcde' } }, { params: { slug: 'test-post-2' } }]
  return {
    paths: last,
    fallback: false
  }
}

export function getStaticProps({ params }) {
  console.log(params)
  const post = fs.readFileSync(path.join(process.cwd(), 'posts', `${params.slug}.json`), 'utf8')
  console.log(post)
  return {
    props: { post }
  }
}