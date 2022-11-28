import { useEditor, EditorContent, Editor } from "@tiptap/react";
import CharacterCount from '@tiptap/extension-character-count'
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { MenuBar } from "./MenuBar";
import Underline from "@tiptap/extension-underline";

async function onSave(editor: Editor | null) {
  if (!editor) return

  const json = editor.getJSON()
  const input_element = document.getElementById("title-text-input") as HTMLInputElement;
  const title = input_element.value;

  const res = await fetch('/api/commitPost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      content: json
    })
  })
  console.log(res)
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
      <input type="text" placeholder="Title" id="title-text-input" />
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