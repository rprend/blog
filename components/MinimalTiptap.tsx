import { BubbleMenu, Editor, EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TiptapLink from '@tiptap/extension-link'
import { faBold, faItalic, faLink, faUnderline } from "@fortawesome/free-solid-svg-icons";

export interface MinimalTiptapProps {
  content: string,
  editable: boolean,
  updated?: Date
}

function bold(editor: Editor) {
  editor?.chain().focus().toggleBold().run()
}

function italic(editor: Editor) {
  editor?.chain().focus().toggleItalic().run()
}

function underline(editor: Editor) {
  editor?.chain().focus().toggleUnderline().run()
}

function link(editor: Editor) {
  editor?.chain().focus().toggleLink({ href: "https://example.com" }).run()
}

export default function MinimalTiptap(props: MinimalTiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TiptapLink
    ],
    content: props.content,
    editable: props.editable
  })

  return (
    <div className="minimal-editor">
      { editor && <BubbleMenu editor={editor}>
      <div className="tooltip-bar">
        <div onClick={() => bold(editor)} className={editor?.isActive('bold') ? 'is-active icon' : 'icon'}>
          <FontAwesomeIcon
            icon={faBold}
            size="lg"
          />
        </div>
        <div onClick={() => italic(editor)} className={editor?.isActive('italic') ? 'is-active icon' : 'icon'}>
          <FontAwesomeIcon
            icon={faItalic}
            size="lg"
          />
        </div>
        <div onClick={() => underline(editor)} className={editor?.isActive('underline') ? 'is-active icon' : 'icon'}>
          <FontAwesomeIcon
            icon={faUnderline}
            size="lg"
          />
        </div>
        <div onClick={() => link(editor)} className={editor?.isActive('link') ? 'is-active icon' : 'icon'}>
          <FontAwesomeIcon
            icon={faLink}
            size="lg"
          />
        </div>
      </div>
      </BubbleMenu> }
      <EditorContent editor={editor} />
    </div>
  )
}