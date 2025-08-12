import React from 'react';
import { BrainCircuitIcon } from './icons';

const WelcomeScreen: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="bg-white p-12 rounded-2xl shadow-lg border border-gray-200/50">
                <img src="/assets/img/Logo-Bank-BRI.webp" alt="CMK Logo" className="w-20 text-brand-pink mx-auto"/>
                <h1 className="mt-6 text-2xl font-bold text-gray-800">
                    Welcome to your Smart Dashboard
                </h1>
                <p className="mt-4 text-sm text-gray-500 max-w-xl mx-auto">
                    Unlock powerful insights into your marketing performance. To begin, please select a brand from the dropdown menu in the header.
                </p>
            </div>
        </div>
    );
};

export default WelcomeScreen;
