import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

export interface MinimalTiptapProps {
  content: string,
  editable: boolean,
  updated?: Date
}

export default function MinimalTiptap(props: MinimalTiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline
    ],
    content: props.content,
    editable: props.editable
  })

  return (
    <div className="minimal-editor">
      <EditorContent editor={editor} />
    </div>
  )
}