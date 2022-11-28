interface PostPreviewProps {
  title: string,
  date: string,
}


export const PostPreview = (props: PostPreviewProps) => {
  return (
    <div className="post-preview">
      <h3 className="post-title">{props.title}</h3>
      <p>Posted on {props.date}</p>
    </div>
  )
}