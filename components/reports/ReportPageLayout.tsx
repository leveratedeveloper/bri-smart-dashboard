import React, { useState } from 'react';
import { SlidersHorizontalIcon } from '../icons';
import CustomizeMetricsModal from './CustomizeMetricsModal';
import type { ReportWidget } from '../../types';

interface ReportPageLayoutProps {
    title: string;
    description: string;
    allWidgets: ReportWidget[];
    visibleWidgets: string[];
    setVisibleWidgets: (widgets: string[]) => void;
    storageKey: string;
    children: React.ReactNode;
}

const ReportPageLayout: React.FC<ReportPageLayoutProps> = ({
    title,
    description,
    allWidgets,
    visibleWidgets,
    setVisibleWidgets,
    storageKey,
    children
}) => {
    const [isCustomizeModalOpen, setCustomizeModalOpen] = useState(false);

    const handleSaveCustomization = (newVisibleWidgets: string[]) => {
        setVisibleWidgets(newVisibleWidgets);
        localStorage.setItem(storageKey, JSON.stringify(newVisibleWidgets));
        setCustomizeModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                        <p className="text-sm text-gray-500 mt-1">{description}</p>
                    </div>
                    <button
                        onClick={() => setCustomizeModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium bg-white hover:bg-gray-50"
                    >
                        <SlidersHorizontalIcon className="w-5 h-5 text-gray-600" />
                        <span>Customize</span>
                    </button>
                </div>
            </div>
            
            {children}

            {isCustomizeModalOpen && (
                <CustomizeMetricsModal
                    allWidgets={allWidgets}
                    visibleWidgets={visibleWidgets}
                    onClose={() => setCustomizeModalOpen(false)}
                    onSave={handleSaveCustomization}
                    reportName={title}
                />
            )}
        </div>
    );
};

export default ReportPageLayout;
