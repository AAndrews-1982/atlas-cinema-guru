// components/Header.tsx
import { signOut, useSession } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

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
    </header>
  );
};

export default Header;
