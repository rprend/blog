import { useSession, signIn, signOut } from 'next-auth/react'
import Topbar from '../components/Topbar';

export default function Admin() {
  const { data: session } = useSession();
  return (
    <main>
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
    </main>
  )
}