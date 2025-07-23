import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import WelcomeScreen from './components/WelcomeScreen';
import SetDefaultBrandModal from './components/SetDefaultBrandModal';
import ChatLogsPage from './components/ChatLogsPage';
import SettingsPage from './components/SettingsPage';
import HelpWidget from './components/HelpWidget';
import { HelpCircleIcon } from './components/icons';
import type { Brand, ActiveView } from './types';
import { allBrandsData } from './data/mockData';

// Import all report pages
import PaidMediaReport from './components/reports/PaidMediaReport';
import OrganicSearchReport from './components/reports/OrganicSearchReport';
import SocialMediaReport from './components/reports/SocialMediaReport';
import EcommerceReport from './components/reports/EcommerceReport';
import KOLReport from './components/reports/KOLReport';
import PublishersReport from './components/reports/PublishersReport';
import OfflineMediaReport from './components/reports/OfflineMediaReport';

interface AppProps {
    onLogout: () => void;
}

const App: React.FC<AppProps> = ({ onLogout }) => {
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
    const [activeView, setActiveView] = useState<ActiveView>('dashboard');
    const [showSetDefaultModal, setShowSetDefaultModal] = useState(false);
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    useEffect(() => {
        const defaultBrand = localStorage.getItem('defaultBrand') as Brand | null;
        if (defaultBrand) {
            setSelectedBrand(defaultBrand);
        }
    }, []);

    const handleBrandSelection = (brand: Brand) => {
        const defaultBrandExists = !!localStorage.getItem('defaultBrand');
        setSelectedBrand(brand);

        if (!defaultBrandExists) {
            setShowSetDefaultModal(true);
        }
    };

    const handleSetDefaultConfirm = () => {
        if (selectedBrand) {
            localStorage.setItem('defaultBrand', selectedBrand);
        }
        setShowSetDefaultModal(false);
    };

    const handleSetDefaultClose = () => {
        setShowSetDefaultModal(false);
    };

    const renderMainContent = () => {
        const mainContentPadding = "p-4 sm:p-6 lg:p-8";
        
        if (activeView === 'settings') {
            return <SettingsPage onLogout={onLogout} />;
        }

        if (activeView === 'chatLogs') {
            return <ChatLogsPage />;
        }

        if (!selectedBrand) {
            const content = activeView.startsWith('report-')
                ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <div className="bg-white p-12 rounded-2xl shadow-lg border border-gray-200/50">
                            <h1 className="text-2xl font-bold text-gray-800">Select a Brand to View Report</h1>
                            <p className="mt-2 text-md text-gray-500 max-w-xl mx-auto">
                                Please select a brand from the dropdown menu in the header to view this report's data.
                            </p>
                        </div>
                    </div>
                )
                : <WelcomeScreen />;
            return <div className={mainContentPadding}>{content}</div>;
        }

        const data = allBrandsData[selectedBrand];
        const reportProps = { data, brandName: selectedBrand };
        
        let content;
        switch (activeView) {
            case 'dashboard':
                content = <Dashboard selectedBrand={selectedBrand} />;
                break;
            case 'report-paid-media':
                content = <PaidMediaReport {...reportProps} />;
                break;
            case 'report-organic-search':
                content = <OrganicSearchReport {...reportProps} />;
                break;
            case 'report-social-media':
                content = <SocialMediaReport {...reportProps} />;
                break;
            case 'report-ecommerce':
                content = <EcommerceReport {...reportProps} />;
                break;
            case 'report-kol':
                content = <KOLReport {...reportProps} />;
                break;
            case 'report-publishers':
                content = <PublishersReport {...reportProps} />;
                break;
            case 'report-offline-media':
                content = <OfflineMediaReport {...reportProps} />;
                break;
            default:
                content = <Dashboard selectedBrand={selectedBrand} />;
        }

        return <div className={mainContentPadding}>{content}</div>;
    }


    return (
        <div className="flex h-screen bg-brand-bg font-sans text-gray-900">
            <Sidebar 
                activeView={activeView} 
                setActiveView={setActiveView} 
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!isSidebarCollapsed)}
            />
            <div className="flex flex-1 flex-col overflow-hidden">
                {activeView !== 'chatLogs' && activeView !== 'settings' && (
                    <Header onLogout={onLogout} selectedBrand={selectedBrand} onBrandSelect={handleBrandSelection} />
                )}
                <main className="flex-1 overflow-y-auto">
                   {renderMainContent()}
                </main>
            </div>
            {!isHelpOpen && (
                 <button 
                    onClick={() => setIsHelpOpen(true)}
                    className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-30"
                    aria-label="Open help widget"
                >
                    <HelpCircleIcon className="w-8 h-8" />
                </button>
            )}
            <HelpWidget 
                isOpen={isHelpOpen} 
                onClose={() => setIsHelpOpen(false)} 
            />
            {showSetDefaultModal && selectedBrand && (
                <SetDefaultBrandModal
                    brandName={selectedBrand}
                    onConfirm={handleSetDefaultConfirm}
                    onClose={handleSetDefaultClose}
                />
            )}
        </div>
    );
};

export default App;