import { useSession, signIn, signOut } from 'next-auth/react'
import Sidebar from '../components/Sidebar';

export default function Admin() {
  const { data: session } = useSession();
  return (
    <main>
      <Sidebar></Sidebar>
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