import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '../features/auth/utils/authApi';

export const Welcome = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    const [logout] = useLogoutMutation();

    const welcomeMessage = user ? `Welcome, ${user}!` : 'Welcome!';
    const tokenAbbr = token ? `${token.slice(0, 9)}...` : 'No token available';

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            navigate('/login'); // Redirect to login page after logout
        } catch (err) {
            console.error('Failed to log out:', err);
        }
    };

    return (
        <div>
            <section className="welcome">
                <h1>{welcomeMessage}</h1>
                {token ? (
                    <>
                        <p>Token: {tokenAbbr}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <p>
                        Please <Link to="/login">log in</Link> to access more
                        features.
                    </p>
                )}
                <p>
                    <Link to="/users">Go to the Users List</Link>
                </p>
            </section>
        </div>
    );
};
