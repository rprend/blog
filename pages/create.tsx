import Tiptap from "../components/Tiptap";

export default function CreatePost() {
  return (
    <main className="flex flex-row place-content-center min-h-screen bg-slate-50">
      <Tiptap
        editable={true}
      />
    </main>
  )
}