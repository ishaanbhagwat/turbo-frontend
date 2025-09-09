'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
    id: string;
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    signIn: () => void;
    signOut: () => void;
    isSignedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const mockUser: User = { id: '1', name: 'Ishaan', email: 'ishaan@gmail.com'};

    useEffect(() => {
        const stored = localStorage.getItem('LOCAL_STORAGE_KEY');
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('LOCAL_STORAGE_KEY', JSON.stringify(user));
        } else {
            localStorage.removeItem('LOCAL_STORAGE_KEY');
        }
    }, [user]);

    const signIn = () => {
        setUser(mockUser);
      };
    
    // Mock signOut: clears user
    const signOut = () => setUser(null);
    
    return(
        <AuthContext.Provider 
        value={{
            user,
            signIn,
            signOut,
            isSignedIn: !!user,
        }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}