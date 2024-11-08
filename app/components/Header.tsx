<<<<<<< HEAD
// components/Header.tsx
import { signOut, useSession } from "next-auth/react";
=======
>>>>>>> 25e2ed2 (still not able to load images)
import { FiLogOut } from "react-icons/fi";

<<<<<<< HEAD
const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="bg-teal-500 h-20 w-full flex justify-between items-center px-6 text-white">
      {/* Left side: Logo and Title */}
      <div className="flex items-center space-x-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
          {/* SVG content omitted for brevity */}
        </svg>
        <h1 className="text-xl font-bold">Cinema Guru</h1>
      </div>

      {/* Right side: Welcome message and Logout */}
      <div className="flex items-center space-x-4">
        {status === 'authenticated' ? (
          <>
            <span>Welcome, {session.user.name ?? session.user.email}</span>
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              <FiLogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <span>Loading...</span>
        )}
      </div>
=======
// SVG Components
const CinemaIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth="1.5" 
    stroke="currentColor" 
    className="size-6"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
    />
  </svg>
);

// Components
const Logo = () => (
  <div className="flex items-center">
    <CinemaIcon />
    <h1 className="text-xl md:text-2xl font-bold ml-2">Cinema Guru</h1>
  </div>
);

const LogoutButton = () => (
  <form action={async () => { 'use server'; await signOut() }}>
    <button
      type='submit'
      className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 transition"
      aria-label="Sign out"
    >
      <FiLogOut className="h-5 w-5" />
      <span className='hidden sm:inline'>Logout</span>
    </button>
  </form>
);

const UserSection = ({ user }: { user: any }) => (
  <div className="flex items-center space-x-4">
    <span>Welcome, {user.name || user.email}</span>
    <LogoutButton />
  </div>
);

const Header = async () => {
  const session = await auth();

  return (
    <header className="bg-tealBright h-[8dvh] w-full flex items-center justify-between px-6 text-blue">
      <Logo />
      
      {session?.user ? (
        <UserSection user={session.user} />
      ) : (
        <span aria-live="polite">Loading...</span>
      )}
>>>>>>> 25e2ed2 (still not able to load images)
    </header>
  );
};

export default Header;