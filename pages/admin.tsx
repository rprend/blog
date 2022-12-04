import { useSession, signIn, signOut } from 'next-auth/react'

export default function Admin() {
  const { data: session } = useSession();
  if (!session) {
    return (<button onClick={() => signIn()}>Not logged in</button>)
  }
  return (
    <main>
      <h1>Admin</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </main>
  )
}