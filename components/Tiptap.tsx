import { useEditor, EditorContent, Editor } from "@tiptap/react";
import CharacterCount from '@tiptap/extension-character-count'
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { MenuBar } from "./MenuBar";
import Underline from "@tiptap/extension-underline";

export interface TiptapProps {
  content?: string,
  editable: boolean,
}

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

const Tiptap = (props: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount,
      Underline
    ],
    content: props.content,
    editable: props.editable
  })
  if (props.editable) {
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
  } else {
    return (
      <div>
        <EditorContent editor={editor} />
      </div>
    )
  }
}

export default Tiptap