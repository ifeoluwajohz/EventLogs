import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'



const AccountPage: React.FC = () => {
  const {user, signOut} = useAuth();

  return (
    <div className="w-full px-5 md:px-12 transform transition-all duration-300 ease-in-out mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Account Settings</h1>
      <div className="space-y-8">
        {user ? (
          <div className="space-y-4">
            <div className="text-gray-800 text-xl">
              {/* <p>Welcome, <span className="font-bold">{user?.username}</span>!</p> */}
              <p className="text-sm text-gray-600 font-medium">Email: <span className="text-gray-800">{user.email}</span></p>
            </div>

            <div className="space-y-4">
              <Link
                to="/Settings"
                className="block text-xl text-blue-600 hover:text-blue-800 transition duration-300 "
              //   onClick={() => fetchUserProfile()}

              >
                Account Info
              </Link>
              <Link
                to="/Account_management"
                className="block text-xl text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Manage Account
              </Link>
            </div>
            <button
            onClick={signOut}
            className="text-white hover:bg-red-500 font-semibold bg-red-700 px-6 py-2 rounded transition duration-300">
            Logout
          </button>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-gray-800 text-lg">
              You are not logged in. Please log in to access your account settings.
            </p>
            <Link
              to="/Login"
              className="block text-xl text-blue-600 hover:text-blue-800 transition duration-300"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
