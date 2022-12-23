import { useEditor, EditorContent, Editor } from "@tiptap/react";
import CharacterCount from '@tiptap/extension-character-count'
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { MenuBar } from "./MenuBar";
import Underline from "@tiptap/extension-underline";
import TiptapLink from '@tiptap/extension-link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'


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

  function deletePost(): void {
    if (!editor) return

    const title = editor.state.doc.firstChild?.textContent ?? "Untitled"

    fetch('/api/deletePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
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
      Underline,
      TiptapLink
    ],
    content,
    editable: editing
  })


    return (
      <div className="w-3/4 md:w-2/3 mr-20 mt-20 lg:w-1/2 prose lg:prose-xl prose-zinc max-w-none">
        { editing &&
          <>
            <MenuBar
            editor={editor}
            onSave={onSave}
            onPreview={() => setEditMode(false)}
            />
            <div className="character-count">
              <b>Word Count: </b>{editor?.storage.characterCount.characters()} characters, {editor?.storage.characterCount.words()} words
            </div>
          </>
        }
        { session &&
          <>
            <div onClick={() => setEditMode(true)} className="relative float-left z-10 left-30 hover:cursor-pointer">
              <FontAwesomeIcon icon={faPenToSquare} size="3x"/>
            </div>
            <div onClick={() => deletePost()} className="relative float-right z-10 right-100 hover:cursor-pointer">
              <FontAwesomeIcon icon={faTrashCan} size="3x" />
            </div>
          </>
        }
        <EditorContent editor={editor} />
        <div>
          <h5>{`Last updated ${props.updated}`}</h5>
        </div>
      </div>
    )
}

export default Tiptap