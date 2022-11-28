import { useEditor, EditorContent } from "@tiptap/react";
import CharacterCount from '@tiptap/extension-character-count'
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { MenuBar } from "./MenuBar";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount,
    ],
    content: "<p>Hello World!</p>",
  })

  return (
    <div>
      <MenuBar editor={editor} />
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