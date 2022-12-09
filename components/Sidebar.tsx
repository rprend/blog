import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1>NIRI Blog</h1>
      <p><Link href='/'>Home</Link></p>
      <p><Link href='/about'>About</Link></p>
    </div>
  )
}