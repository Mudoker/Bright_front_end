import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { Loader2 } from 'lucide-react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

// Function to decode the JWT token
const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

// Function to check if the token is expired
const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true; // If there's no expiration, treat it as expired
  }
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return decoded.exp < currentTime; // Compare token's expiration time with current time
};

// Protect routes by requiring authentication
export const RequireAuth = () => {
  // Get the token from localStorage
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [spinning, setSpinning] = useState(false); // State for spinner when redirecting

  const token = localStorage.getItem('token');
  // console.log(token);
  // Get the current location
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate token checking process
    if (!token || isTokenExpired(token)) {
      setSpinning(true); // Show spinner when redirecting
      setTimeout(() => {
        navigate('/auth', { state: { from: location }, replace: true });
      }, 3000); // Optional delay for showing spinner before navigation
    } else {
      setLoading(true); // Start loading to simulate token checking
      setTimeout(() => {
        setAuthenticated(true);
      }, 1000); // Optional delay for showing spinner before navigation
    }
    setLoading(false); // Stop loading once the check is done
  }, [token, location, navigate]);

  // Show spinner if still loading
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        <span className="text-lg font-medium">Please wait...</span>
      </div>
    );
  } 

  // Show spinner when redirecting to /auth
  if (spinning) {
    return (
      <div className="w-full bg-not_found_background">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-6 py-12">
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">
          <p className="mb-4 rounded-full bg-transparent p-3 text-sm text-foreground dark:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-20 w-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </p>

          <p className="text-primary-600 dark:text-primary-500 mb-2 text-4xl font-bold tracking-tight lg:text-4xl">
            {'401 Unauthorized Access'}
          </p>

          <p className="mt-4 font-semibold text-gray-500/70 dark:text-gray-400">
            {
              'You need to be logged in to access this content. Please log in and try again.'
            }
          </p>
        </div>
      </div>
    </div>
    );
  }

  // Render the protected route
  return authenticated ? <Outlet /> : null;
};