import Link from "next/link";

export default function Topbar() {
  return (
    <div className="topbar">
      <h1>NIRI Blog</h1>
      <div className="navigation">
        <p><Link href='/'>Home</Link></p>
        <p><Link href='/about'>About</Link></p>
      </div>
    </div>
  )
}