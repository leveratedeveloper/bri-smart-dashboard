import React, { useState } from 'react';
import UsersAndRolesTab from './settings/UsersAndRolesTab';
import IntegrationsTab from './settings/IntegrationsTab';
import ProfileTab from './settings/ProfileTab';
import { UserIcon, UsersIcon, GridIcon } from './icons';

type SettingsTab = 'profile' | 'users-roles' | 'integrations';

interface SettingsPageProps {
    onLogout: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileTab onLogout={onLogout} />;
            case 'users-roles':
                return <UsersAndRolesTab />;
            case 'integrations':
                return <IntegrationsTab />;
            default:
                return null;
        }
    };

    const TabButton: React.FC<{tab: SettingsTab, label: string, icon: React.ReactNode}> = ({ tab, label, icon }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-3 px-4 py-2 text-xs font-medium rounded-md transition-colors w-full text-left ${
                activeTab === tab 
                ? 'bg-blue-50 text-brand-pink' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
            {icon}
            {label}
        </button>
    )

    return (
        <div className="h-full flex flex-col bg-gray-50">
            <header className="flex-shrink-0 bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-sm text-gray-500">Manage your workspace and user permissions.</p>
                </div>
            </header>
            <div className="flex-grow flex min-h-0">
                <aside className="w-64 bg-white p-4 border-r border-gray-200">
                    <nav className="space-y-2">
                        <TabButton tab="profile" label="My Profile" icon={<UserIcon className="w-5 h-5"/>}/>
                        <TabButton tab="users-roles" label="Users & Roles" icon={<UsersIcon className="w-5 h-5"/>}/>
                        <TabButton tab="integrations" label="Integrations & Apps" icon={<GridIcon className="w-5 h-5"/>}/>
                    </nav>
                </aside>
                <main className="flex-1 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default SettingsPage;