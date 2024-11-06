import { useContext, useDebugValue } from 'react';

import AuthContext from '../context/AuthProviders';

const useAuth = () => {
    const auth = useContext(AuthContext) as { user?: string };
    useDebugValue(auth, auth => (auth?.user ? 'Logged In' : 'Logged Out'));
    return useContext(AuthContext);
};

export default useAuth;
