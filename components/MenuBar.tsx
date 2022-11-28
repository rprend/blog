import { Editor } from "@tiptap/react";
import React from "react";

export interface MenuBarProps {
  editor: Editor | null;
  onSave: (editor: Editor | null) => void;
  onPreview: (editor: Editor | null) => void;
}


export const MenuBar = (props: MenuBarProps) => {
  const [isPublishing, setIsPublishing] = React.useState(false);

  function onClickSave() {
    setIsPublishing(true);
    props.onSave(props.editor)
  }

  return (
    <div>
      <button onClick={() => props.onPreview()}>Preview</button>
      <button onClick={() => props.editor?.chain().focus().toggleBold().run()}>Bold</button>
      <button onClick={() => props.editor?.chain().focus().toggleItalic().run()}>Italic</button>
      <button onClick={() => props.editor?.chain().focus().toggleUnderline().run()}>Underline</button>
      <button onClick={() => props.editor?.chain().focus().toggleCode().run()}>Code</button>
      <button onClick={() => props.editor?.chain().focus().toggleStrike().run()}>Strike</button>
      <button onClick={() => props.editor?.chain().focus().toggleBulletList().run()}>Bullet List</button>
      <button onClick={() => props.editor?.chain().focus().toggleOrderedList().run()}>Ordered List</button>
      <button onClick={() => props.editor?.chain().focus().toggleHeading({ level: 1 }).run()}>Heading 1</button>
      <button onClick={() => props.editor?.chain().focus().toggleHeading({ level: 2 }).run()}>Heading 2</button>
      <button onClick={() => props.editor?.chain().focus().toggleHeading({ level: 3 }).run()}>Heading 3</button>
      <button onClick={() => props.editor?.chain().focus().toggleBlockquote().run()}>Blockquote</button>
      <button onClick={() => props.editor?.chain().focus().toggleCodeBlock().run()}>Code Block</button>
      <button onClick={() => props.editor?.chain().focus().setHorizontalRule().run()}>Horizontal Rule</button>
      <button
        onClick={onClickSave}
        disabled={isPublishing}
      >Publish</button>
    </div>
  )
}