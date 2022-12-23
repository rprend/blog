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
    <main className="flex flex-row place-content-center min-h-screen bg-slate-50 text-zinc-900">
      <div className="flex flex-col w-3/4 md:w-2/3 lg:w-1/2">
        <Topbar></Topbar>
        <div className="flex flex-row justify-between gap-5 flex-wrap">
          <div className="flex flex-col leading-7">
            <h5 className="text-2xl">Recent Posts</h5>
            {session &&
              <Link href="/create" className="mb-2">
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
          <div className="flex flex-col leading-7">
            <h5 className="text-2xl">Recommendations
            <a target="_blank">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="ml-10"
                size="1x"
              ></FontAwesomeIcon>
            </a>
            </h5>
            <MinimalTiptap
              editable={true}
              content={`ryans youtube`}
            ></MinimalTiptap>
          </div>
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