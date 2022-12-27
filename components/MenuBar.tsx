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
    <div>
    <div onClick={props.onPreview} className="hover:cursor-pointer absolute float-left z-10 left-52">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size='3x'
        />
    </div>
    <div className="hover:cursor-pointer relative float-right z-10 left-100" onClick={save}>
        <FontAwesomeIcon
        icon={faFloppyDisk}
        size='3x'
      />
    </div>
    <div className="flex flex-row gap-5 relative float-top float-left -left-20">
      <div onClick={bold} className={`hover:cursor-pointer ${props.editor?.isActive('bold') ? 'text-amber-500' : ''}`}>
        <FontAwesomeIcon
          icon={faBold}
          size='2x'
        />
      </div>
      <div onClick={italic} className={`hover:cursor-pointer ${props.editor?.isActive('italic') ? 'text-amber-500' : ''}`}>
        <FontAwesomeIcon
          icon={faItalic}
          size='2x'
        />
      </div>
      <div onClick={underline} className={`hover:cursor-pointer ${props.editor?.isActive('underline') ? 'text-amber-500' : ''}`}>
        <FontAwesomeIcon
          icon={faUnderline}
          size='2x'
        />
      </div>
      <div onClick={link} className={`hover:cursor-pointer ${props.editor?.isActive('link') ? 'text-amber-500' : ''}`}>
        <FontAwesomeIcon
          icon={faLink}
          size='2x'
        />
      </div>
      <div onClick={code} className={`hover:cursor-pointer ${props.editor?.isActive('code') ? 'text-amber-500' : ''}`}>
        <FontAwesomeIcon
          icon={faCode}
          size='2x'
        />
      </div>
      <div onClick={strikethrough} className={`hover:cursor-pointer ${props.editor?.isActive('strike') ? 'text-amber-500' : ''}`}>
        <FontAwesomeIcon
          icon={faStrikethrough}
          size='2x'
        />
      </div>
      <div onClick={bullet_list} className={`hover:cursor-pointer ${props.editor?.isActive('bulletList') ? 'text-amber-500' : ''}`}>
        <FontAwesomeIcon
          icon={faList}
          size='2x'
          className={`hover:cursor-pointer ${props.editor?.isActive('bold') ? 'text-amber-500' : ''}`}
        />
      </div>
      <div onClick={ordered_list} className={`hover:cursor-pointer ${props.editor?.isActive('orderedList') ? 'text-amber-500' : ''}`}>
        <FontAwesomeIcon
          icon={faListOl}
          size='2x'
        />
      </div>
      <div onClick={heading_one} className={`hover:cursor-pointer ${props.editor?.isActive('heading') ? 'text-amber-500' : ''}`}>
        <FontAwesomeIcon
          icon={faHeading}
          size='2x'
        />
      </div>
      <div onClick={blockquote} className={`hover:cursor-pointer ${props.editor?.isActive('blockquote') ? 'text-amber-500' : ''}`}>
        <FontAwesomeIcon
          icon={faQuoteLeft}
          size='2x'
        />
      </div>
      <div onClick={code_block} className={`hover:cursor-pointer ${props.editor?.isActive('codeBlock') ? 'text-amber-500' : ''}`}>
        <FontAwesomeIcon
          icon={faCodeBranch}
          size='2x'
        />
      </div>
      <div onClick={horizontal_rule} className={`hover:cursor-pointer ${props.editor?.isActive('horizontalRule') ? 'text-amber-500' : ''}`}>
        <FontAwesomeIcon
          icon={faRulerHorizontal}
          size='2x'
        />
      </div>
    </div>
    </div>
  )
}