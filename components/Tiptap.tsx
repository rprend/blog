import { useEditor, EditorContent, Editor } from "@tiptap/react";
import CharacterCount from '@tiptap/extension-character-count'
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { MenuBar } from "./MenuBar";
import Underline from "@tiptap/extension-underline";
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'


export interface TiptapProps {
  content?: string,
  editable: boolean,
  updated?: Date
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

  function onSave(): void {
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
      <article>
        <MenuBar
          editor={editor}
          onSave={onSave}
          onPreview={() => setEditMode(false)}
        />
        <div className="character-count">
          <b>Word Count: </b>{editor?.storage.characterCount.characters()} characters, {editor?.storage.characterCount.words()} words
        </div>
        <EditorContent editor={editor} />
      </article>
    )
  } else {
    return (
      <article>
        { session &&
          <div onClick={() => setEditMode(true)} className="icon">
          <FontAwesomeIcon icon={faPenToSquare} transform="grow-20" />
          </div>
        }
        <EditorContent editor={editor} />
        <h5>{`Last updated ${props.updated}`}</h5>
      </article>
    )
  }
}

export default Tiptap