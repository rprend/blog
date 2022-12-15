import Link from "next/link"

interface PostPreviewProps {
  title: string,
  date?: string,
  excerpt: string,
  slug: string
}


export const PostPreview = (props: PostPreviewProps) => {
  return (
    <div className="post-preview">
      <Link href={`/blog/${props.slug}`} key={props.slug}>
        <b>{props.title}</b>
      </Link>
    </div>
  )
}