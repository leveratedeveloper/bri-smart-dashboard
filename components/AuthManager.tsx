import React, { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import App from '../App';
import LoginPage from './LoginPage';
import { LoaderIcon } from './icons';

const AuthManager: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // v2: Asynchronously get the initial session
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);
        };

        getInitialSession();

        // v2: Listen for authentication state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        // v2: Unsubscribe from the listener when the component unmounts
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

    if (!session) {
        return <LoginPage />;
    }

    return <App onLogout={handleLogout} />;
};

export default AuthManager;