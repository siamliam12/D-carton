"use client"
import Link from 'next/link'
import AuthChecker from './AuthChecker';

const Navbar = () => {

  return (
    <>
      <nav>
        <header className="text-gray-600 body-font bg-slate-400">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link href='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <span className="ml-3 text-xl">D<span className='text-green-700'>Carton</span></span>
            </Link>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
              <Link href={'/'}>
                <p className="mr-5 hover:text-gray-900 text-white">Trending</p>
              </Link>
              <Link href={'/'}className="mr-5 hover:text-gray-900 text-white">Category</Link>
              <input className="mr-5 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Search...'>
              </input>
            </nav>
            <AuthChecker>
            {({ isAuthenticated }) => (
              isAuthenticated ? (
                <>
                <div className="text-white mr-3">Username</div>
                <button className="m-1 inline-flex items-center bg-indigo-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-indigo-200 hover:text-black rounded text-base mt-4 md:mt-0">
                <Link href={'/auth/register'}>
                  Logout
                  </Link>
                </button>
                </>
              ) : (
                // If not authenticated, show login button
                <>
              <button className="m-1 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-white hover:text-black rounded text-base mt-4 md:mt-0">
              <Link href={'/auth/login'}>
              Login
              </Link>
            </button>
            <button className="m-1 inline-flex items-center bg-indigo-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-indigo-200 hover:text-black rounded text-base mt-4 md:mt-0">
            <Link href={'/auth/register'}>
              Sign Up
              </Link>
            </button>
                </>
              )
            )}
          </AuthChecker>


          </div>
        </header>
      </nav>
    </>
  )
}




export default Navbar