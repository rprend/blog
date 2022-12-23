import { readPosts } from "../lib/ReadPosts";
import { PostPreview } from "../components/PostPreview";
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Topbar from "../components/Topbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import MinimalTiptap from "../components/MinimalTiptap";

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
            <Link href="/create" style={{"margin": "0 0 20px 0"}}>
              <b>Create a new post</b>
              <FontAwesomeIcon
                icon={faArrowCircleRight}
                style={{"marginLeft": "10px"}}
              ></FontAwesomeIcon>
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
          <h5 className="text-3xl">Recommendations
          <a>
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{"marginLeft": "10px"}}
          ></FontAwesomeIcon>
          </a>
          </h5>
          <MinimalTiptap
            editable={true}
            content={`ryans youtube`}
          ></MinimalTiptap>
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