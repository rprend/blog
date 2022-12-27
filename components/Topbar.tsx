import { useSession } from "next-auth/react";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";

export type page = "home" | "about" | "create" | "admin";

export interface TopbarProps {
  page: page;
}

export default function Topbar() {
  const { data: session } = useSession();
  const router = useRouter()

  return (
    <div className="flex flex-col mt-16 mb-4">
      <h1 className="text-4xl">NIRI Blog</h1>
      <div className={"flex flex-row gap-x-4 mt-4 " + classNames({'italic': session})}>
        <p><Link href='/' className={classNames({'font-bold': router.pathname === '/'})}>Home</Link></p>
        <p><Link href='/about' className={classNames({'font-bold': router.pathname === '/about'})}>About</Link></p>
        {session &&
          <>
          <p><Link href='/admin' className={classNames({'font-bold': router.pathname === '/admin'})}>Admin</Link></p>
          </>
        }
      </div>
    </div>
  )
}