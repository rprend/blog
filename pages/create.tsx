import Tiptap from "../components/Tiptap";

export default function CreatePost() {
  return (
    <main className="flex flex-row place-content-center">
      <Tiptap
        editable={true}
      />
    </main>
  )
}