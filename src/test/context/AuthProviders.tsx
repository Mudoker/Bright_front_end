import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from 'react';

// Define the types for the auth state and the context
interface AuthState {
    user?: string; // Update according to your auth state shape
    token?: string; // Update according to your auth state shape
}

interface AuthContextType {
    auth: AuthState;
    setAuth: Dispatch<SetStateAction<AuthState>>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
    auth: {},
    setAuth: () => {},
});

// Define the props for the AuthProvider component
interface AuthProviderProps {
    children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<AuthState>({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
