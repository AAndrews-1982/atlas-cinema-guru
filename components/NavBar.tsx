// Header NavBar
import Film from "@/assets/icons/film.svg";
import { auth } from "@/auth"; // Keep `auth` from your custom config
import { signOut } from "next-auth/react"; // Import `signOut` from `next-auth/react`
import { FiLogOut } from "react-icons/fi";

const NavBar = async () => {
  const session = await auth();

  return (
    <header className="bg-teal w-full flex py-6 items-center justify-between px-4 text-navy">
      <div className="flex items-center">
        <img src={Film.src} alt="Cinema Guru Logo" height={25} width={25} />
        <h1 className="ml-2 text-2xl font-bold">Cinema Guru</h1>
      </div>
      <div className="flex items-center space-x-4">
        {session?.user ? (
          <>
            <span> Welcome, {session.user.email}</span>
            <form action={async () => { 'use server'; await signOut() }} >
              <button
                type='submit'
                className="flex items-center space-x-2"
              >
                <FiLogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </form>
          </>
        ) : (
          <p>Loading User Information</p>
        )}
      </div>
    </header>
  );
};

export default NavBar;
