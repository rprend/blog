import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

export interface RecommendationsTiptapProps {
  content: string,
  editable: boolean,
  updated?: Date
}

export default function RecommendationsTiptap(props: RecommendationsTiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline
    ],
    content: props.content,
    editable: props.editable
  })

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  )
}