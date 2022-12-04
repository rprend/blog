interface PostPreviewProps {
  title: string,
  date?: string,
  excerpt: string,
}


export const PostPreview = (props: PostPreviewProps) => {
  return (
    <div className="post-preview">
      <h3 className="post-title">{props.title}</h3>
      <p>{props.excerpt}...</p>
    </div>
  )
}