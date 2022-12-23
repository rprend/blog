import Topbar from "../components/Topbar";

export default function About() {
  return (
    <main className="flex flex-rowi place-content-center min-h-screen bg-slate-50">
      <div className="flex flex-col w-3/4 md:w-2/3 lg:w-1/2 gap-4">
        <Topbar></Topbar>
        <h3 className='text-2xl font-bold'>About</h3>
        <p className="text-md">indeed we&apos;ve got a blog. it has a long and storied history.</p>
      </div>
    </main>
  )
}