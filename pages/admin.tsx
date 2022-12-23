import { useSession, signIn, signOut } from 'next-auth/react'
import Topbar from '../components/Topbar';

export default function Admin() {
  const { data: session } = useSession();
  return (
    <main className='flex flex-row place-content-center'>
      <div className="flex flex-col w-3/4 md:w-2/3 lg:w-1/2">
        <Topbar></Topbar>
        <h1>Admin</h1>
        {session &&
          <>
            <p>Logged in as {session.user.email}</p>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        }
        { !session &&
          <>
            <p>Not logged in</p>
            <button onClick={() => signIn()}>Sign in</button>
          </>
        }
      </div>
    </main>
  )
}