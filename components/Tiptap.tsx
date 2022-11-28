import { useEditor, EditorContent, Editor } from "@tiptap/react";
import CharacterCount from '@tiptap/extension-character-count'
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { MenuBar } from "./MenuBar";
import Underline from "@tiptap/extension-underline";

function onSave(editor: Editor | null) {
  if (!editor) return

  const html = editor.getHTML()
  console.log(html)
}

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount,
      Underline
    ],
    content: "<p>Hello World!</p>",
  })

  return (
    <div>
      <MenuBar
        editor={editor}
        onSave={onSave}
      />
      <EditorContent editor={editor} />
      <div className="character-count">
        {editor?.storage.characterCount.characters()} characters
        <br />
        {editor?.storage.characterCount.words()} words
      </div>
    </div>
  )
}

export default Tiptap