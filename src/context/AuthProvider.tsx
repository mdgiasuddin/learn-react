import React, {type ReactNode, useEffect, useState} from 'react';
import {AuthContext} from './useAuth';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [name, setName] = useState<string | null>(localStorage.getItem('name'));

    useEffect(() => {
        const handleStorageChange = () => {
            setName(localStorage.getItem('name'));
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const logout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setName(null);
    };

    const updateName = (newName: string | null) => {
        if (newName) {
            localStorage.setItem('name', newName);
        } else {
            localStorage.removeItem('name');
        }
        setName(newName);
    };

    return (
        <AuthContext.Provider value={{name, setName: updateName, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
