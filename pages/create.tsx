import Tiptap from "../components/Tiptap";

export default function CreatePost() {
  return (
    <main>
      <div className="create-post-container">
        <Tiptap
          editable={true}
        />
      </div>
    </main>
  )
}