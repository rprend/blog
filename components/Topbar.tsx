import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Topbar() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col mt-16 mb-4">
      <h1 className="text-4xl self-center">NIRI Blog</h1>
      <div className="flex flex-row gap-x-4 justify-center">
        <p><Link href='/'>Home</Link></p>
        <p><Link href='/about'>About</Link></p>
        {session &&
          <>
          <p><Link href='/create'>Create</Link></p>
          <p><Link href='/admin'>Admin</Link></p>
          </>
        }
      </div>
    </div>
  )
}