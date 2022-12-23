import { useSession, signIn, signOut } from 'next-auth/react'
import Topbar from '../components/Topbar';

export default function Admin() {
  const { data: session } = useSession();
  return (
    <main className='flex flex-row place-content-center min-h-screen bg-slate-50'>
      <div className="flex flex-col w-3/4 md:w-2/3 lg:w-1/2 gap-4">
        <Topbar></Topbar>
        <h3 className='text-2xl font-bold'>Admin</h3>
        {session &&
          <>
            <p className="text-md">Logged in as {session.user.email}</p>
            <button onClick={() => signOut()} className="w-1/6 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Sign Out</button>
          </>
        }
        { !session &&
          <>
            <p className="text-md">Not logged in</p>
            <button onClick={() => signIn()} className="w-1/6 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Sign in</button>
          </>
        }
      </div>
    </main>
  )
}