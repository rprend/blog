import { useEditor, EditorContent, Editor, JSONContent, Node } from "@tiptap/react";
import CharacterCount from '@tiptap/extension-character-count'
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { MenuBar } from "./MenuBar";
import Underline from "@tiptap/extension-underline";
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export interface TiptapProps {
  content?: string,
  editable: boolean,
}

function generateExcerpt(editor: Editor) {
  // The first block is the title. the excerpt starts at the second block.
  let idx = 1;
  let excerpt = "";
  while (excerpt.length < 100) {
    const node = editor.state.doc.maybeChild(idx)
    if (!node) break
    // this is not going to be perfectly 100 every time but it's close enough
    excerpt += " " + node.textContent.substring(0, 100)
    idx += 1
  }
  return excerpt
}

const Tiptap = (props: TiptapProps) => {
  const router = useRouter()
  const { data: session } = useSession();

  const [editing, setEditing] = React.useState(session != null && props.editable)

  function setEditMode(direction: boolean) {
    setEditing(direction)
    editor.options.editable = direction;
    editor.view.update(editor.view.props);
  }

  function onSave(editor: Editor | null): void {
    if (!editor) return

    const json = editor.getJSON()
    const title = editor.state.doc.firstChild?.textContent ?? "Untitled"
    const exceprt = generateExcerpt(editor)

    fetch('/api/commitPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        content: json,
        excerpt: exceprt
      })
    }).then(_response => {
      router.push('/')
    })
  }

  let content = props.content
  if (props.content == null) {
    content = "<h1>Insert Title Here</h1><p>Start typing here...</p>"
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount,
      Underline
    ],
    content,
    editable: editing
  })

  if (editing) {
    return (
      <div>
        <MenuBar
          editor={editor}
          onSave={onSave}
          onPreview={() => setEditMode(false)}
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
        { session &&
          <button onClick={() => setEditMode(true)}>Edit</button>
        }
        <EditorContent editor={editor} />
      </div>
    )
  }
}

export default Tiptap