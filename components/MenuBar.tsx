import { Editor } from "@tiptap/react";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCircle, faBold, faItalic, faUnderline, faCode, faStrikethrough, faList, faListOl, faHeading, faQuoteLeft, faCodeBranch, faRulerHorizontal, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'


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
      <div onClick={props.onPreview} style={{"margin": "0 40px 0 0"}}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          transform="grow-20"
          className={props.editor.isActive('bold') ? 'is-active' : ''}
        />
      </div>
      <div onClick={bold}>
        <span>
        <FontAwesomeIcon icon={faCircle} />
        <FontAwesomeIcon
          icon={faBold}
          className={props.editor.isActive('bold') ? 'is-active' : ''}
        />
        </span>
      </div>
      <div onClick={italic}>
        <FontAwesomeIcon
          icon={faItalic}
          transform="grow-10"
          className={props.editor.isActive('bold') ? 'is-active' : ''}
        />
      </div>
      <div onClick={underline}>
        <FontAwesomeIcon
          icon={faUnderline}
          transform="grow-10"
          className={props.editor.isActive('bold') ? 'is-active' : ''}
        />
      </div>
      <div onClick={code}>
        <FontAwesomeIcon
          icon={faCode}
          transform="grow-10"
          className={props.editor.isActive('bold') ? 'is-active' : ''}
        />
      </div>
      <div onClick={strikethrough}>
        <FontAwesomeIcon
          icon={faStrikethrough}
          transform="grow-10"
          className={props.editor.isActive('bold') ? 'is-active' : ''}
        />
      </div>
      <div onClick={bullet_list}>
        <FontAwesomeIcon
          icon={faList}
          transform="grow-10"
          className={props.editor.isActive('bold') ? 'is-active' : ''}
        />
      </div>
      <div onClick={ordered_list}>
        <FontAwesomeIcon
          icon={faListOl}
          transform="grow-10"
          className={props.editor.isActive('bold') ? 'is-active' : ''}
        />
      </div>
      <div onClick={heading_one}>
        <FontAwesomeIcon
          icon={faHeading}
          transform="grow-10"
          className={props.editor.isActive('bold') ? 'is-active' : ''}
        />
      </div>
      <div onClick={blockquote}>
        <FontAwesomeIcon
          icon={faQuoteLeft}
          transform="grow-10"
          className={props.editor.isActive('bold') ? 'is-active' : ''}
        />
      </div>
      <div onClick={code_block}>
        <FontAwesomeIcon
          icon={faCodeBranch}
          transform="grow-10"
          className={props.editor.isActive('bold') ? 'is-active' : ''}
        />
      </div>
      <div >
        <FontAwesomeIcon onClick={horizontal_rule} icon={faRulerHorizontal} transform="grow-10" />
      </div>
      <div className="save-button" onClick={save}>
        <FontAwesomeIcon icon={faFloppyDisk} transform="grow-20"/>
      </div>
    </div>
  )
}