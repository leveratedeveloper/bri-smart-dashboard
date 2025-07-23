import React, { useState, useMemo } from 'react';
import { SparklesIcon, UserPlusIcon, PlusIcon } from '../icons';
import { integrationsData as initialIntegrationsData } from '../../data/integrationsData';
import IntegrationCard from './IntegrationCard';
import type { Integration, IntegrationCategory } from '../../types';

const TABS = ['All integration', 'Most used', 'Calendars', 'Marketing',  'Email messaging', 'Sales and CRM'];

const IntegrationsTab: React.FC = () => {
    const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrationsData);
    const [activeTab, setActiveTab] = useState<string>('All integration');

    const handleToggleConnect = (integrationId: string) => {
        setIntegrations(prevIntegrations =>
            prevIntegrations.map(int =>
                int.id === integrationId ? { ...int, connected: !int.connected } : int
            )
        );
    };

    const filteredIntegrations = useMemo(() => {
        if (activeTab === 'All integration') {
            return integrations;
        }
        if (activeTab === 'Most used') {
            return integrations.filter(int => int.mostUsed);
        }
        return integrations.filter(int => int.categories.includes(activeTab as IntegrationCategory));
    }, [activeTab, integrations]);

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <header>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">Integrations &amp; apps</h1>
                    <div className="flex items-center gap-2 sm:gap-4">
                        
                    </div>
                </div>
            </header>

            <div className="border-b border-gray-200">
                <nav className="-mb-px flex flex-wrap gap-x-6 gap-y-2" aria-label="Tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-xs transition-colors ${
                                activeTab === tab
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <main>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredIntegrations.map(integration => (
                        <IntegrationCard
                            key={integration.id}
                            integration={integration}
                            onToggleConnect={handleToggleConnect}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default IntegrationsTab;
