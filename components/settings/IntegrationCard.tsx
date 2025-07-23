import React from 'react';
import type { Integration } from '../../types';

interface IntegrationCardProps {
    integration: Integration;
    onToggleConnect: (id: string) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration, onToggleConnect }) => {
    const { id, name, description, icon: Icon, connected } = integration;

    return (
        <div className="bg-white rounded-lg border border-gray-200/80 shadow-sm p-5 flex flex-col hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100">
                     <Icon className="w-8 h-8 text-gray-700" />
                </div>
                <button
                    onClick={() => onToggleConnect(id)}
                    className={`px-3 py-1 text-sm font-semibold rounded-md border transition-colors ${
                        connected
                            ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    {connected ? 'Connected' : 'Connect'}
                </button>
            </div>
            <div className="mt-4 flex-grow">
                <h3 className="font-bold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
        </div>
    );
};

export default IntegrationCard;
