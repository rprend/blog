import { Editor } from "@tiptap/react";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBold, faItalic, faUnderline, faLink, faCode, faStrikethrough, faList, faListOl, faHeading, faQuoteLeft, faCodeBranch, faRulerHorizontal, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'


export interface MenuBarProps {
  editor: Editor | null;
  onSave: () => void;
  onPreview: () => void;
}


export const MenuBar = (props: MenuBarProps) => {
  const [isPublishing, setIsPublishing] = React.useState(false);

  function bold() {
    props.editor?.chain().focus().toggleBold().run()
  }

  function italic() {
    props.editor?.chain().focus().toggleItalic().run()
  }

  function underline() {
    props.editor?.chain().focus().toggleUnderline().run()
  }

  function link() {
    props.editor?.chain().focus().toggleLink({ href: "https://example.com" }).run()
  }

  function code() {
    props.editor?.chain().focus().toggleCode().run()
  }

  function strikethrough() {
    props.editor?.chain().focus().toggleStrike().run()
  }

  function bullet_list() {
    props.editor?.chain().focus().toggleBulletList().run()
  }

  function ordered_list() {
    props.editor?.chain().focus().toggleOrderedList().run()
  }

  function heading_one() {
    props.editor?.chain().focus().toggleHeading({ level: 1 }).run()
  }

  function blockquote() {
    props.editor?.chain().focus().toggleBlockquote().run()
  }

  function code_block() {
    props.editor?.chain().focus().toggleCodeBlock().run()
  }

  function horizontal_rule() {
    props.editor?.chain().focus().setHorizontalRule().run()
  }

  function save() {
    if (!isPublishing) {
      setIsPublishing(true);
      props.onSave()
    }
  }

  return (
    <div className="menu-container">
      <div onClick={props.onPreview} className="icon main-icon float-left">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size='3x'
        />
      </div>
      <div onClick={bold} className={props.editor?.isActive('bold') ? 'is-active' : ''}>
        <FontAwesomeIcon
          icon={faBold}
          size='2x'
        />
      </div>
      <div onClick={italic} className={props.editor?.isActive('italic') ? 'is-active' : ''}>
        <FontAwesomeIcon
          icon={faItalic}
          size='2x'
        />
      </div>
      <div onClick={underline} className={props.editor?.isActive('underline') ? 'is-active' : ''}>
        <FontAwesomeIcon
          icon={faUnderline}
          size='2x'
        />
      </div>
      <div onClick={link} className={props.editor?.isActive('link') ? 'is-active' : ''}>
        <FontAwesomeIcon
          icon={faLink}
          size='2x'
        />
      </div>
      <div onClick={code} className={props.editor?.isActive('code') ? 'is-active' : ''}>
        <FontAwesomeIcon
          icon={faCode}
          size='2x'
        />
      </div>
      <div onClick={strikethrough} className={props.editor?.isActive('strike') ? 'is-active' : ''}>
        <FontAwesomeIcon
          icon={faStrikethrough}
          size='2x'
        />
      </div>
      <div onClick={bullet_list} className={props.editor?.isActive('bulletList') ? 'is-active' : ''}>
        <FontAwesomeIcon
          icon={faList}
          size='2x'
          className={props.editor?.isActive('bold') ? 'is-active' : ''}
        />
      </div>
      <div onClick={ordered_list} className={props.editor?.isActive('orderedList') ? 'is-active' : ''}>
        <FontAwesomeIcon
          icon={faListOl}
          size='2x'
        />
      </div>
      <div onClick={heading_one} className={props.editor?.isActive('heading') ? 'is-active' : ''}>
        <FontAwesomeIcon
          icon={faHeading}
          size='2x'
        />
      </div>
      <div onClick={blockquote} className={props.editor?.isActive('blockquote') ? 'is-active' : ''}>
        <FontAwesomeIcon
          icon={faQuoteLeft}
          size='2x'
        />
      </div>
      <div onClick={code_block} className={props.editor?.isActive('codeBlock') ? 'is-active' : ''}>
        <FontAwesomeIcon
          icon={faCodeBranch}
          size='2x'
        />
      </div>
      <div onClick={horizontal_rule} className={props.editor?.isActive('horizontalRule') ? 'is-active' : ''}>
        <FontAwesomeIcon
          icon={faRulerHorizontal}
          size='2x'
        />
      </div>
      <div className="icon main-icon float-right" onClick={save}>
        <FontAwesomeIcon
        icon={faFloppyDisk}
        size='3x'
      />
      </div>
    </div>
  )
}