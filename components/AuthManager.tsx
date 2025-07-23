import React, { useState, useEffect } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import App from '../App';
import LoginPage from './LoginPage';
import { LoaderIcon } from './icons';

const AuthManager: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getInitialSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-brand-bg">
                <LoaderIcon className="w-12 h-12 text-brand-pink animate-spin" />
            </div>
        );
    }

    if (!session || !user) {
        return <LoginPage />;
    }

    return <App onLogout={handleLogout} user={user} />;
};

export default AuthManager;