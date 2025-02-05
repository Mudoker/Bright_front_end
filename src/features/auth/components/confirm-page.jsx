import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const ConfirmPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const next = queryParams.get('next');

    useEffect(() => {
        if (next) {
            window.location.href = next;
        } else {
            navigate('/error'); // Navigate to an error page if needed
        }
    }, [next, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="text-xl font-medium text-black">Redirecting...</div>
                </div>
                <p className="text-gray-500">Please wait while we redirect you to the appropriate page.</p>
                {/* Add any loading spinner or message here if needed */}
            </div>
        </div>
    );
};
