import path from 'path'
import fs from 'fs'
import { readPosts } from '../../lib/ReadPosts'
import Tiptap from '../../components/Tiptap'
import React from 'react'

export default function Post(params) {
  const post = JSON.parse(params.post)

  return (
    <main>
      <Tiptap
        editable={false}
        content={post.content}
      />
      <h3>Last updated {post.date}</h3>
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