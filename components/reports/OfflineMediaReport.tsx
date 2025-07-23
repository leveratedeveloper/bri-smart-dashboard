import React, { useState } from 'react';
import ReportPageLayout from './ReportPageLayout';
import MetricCard from '../MetricCard';
import type { Brand, DashboardData, Metric, ReportWidget } from '../../types';
import { TvIcon } from '../icons';

interface OfflineMediaReportProps {
    data: DashboardData;
    brandName: Brand;
}

const allWidgets: ReportWidget[] = [
    { id: 'kpis', name: 'Offline Media KPIs', description: 'High-level indicators for offline budget, reach, and active campaigns.' },
    { id: 'campaignTable', name: 'Campaign Overview', description: 'A detailed table of offline campaigns and their measured impact.' },
];

const OfflineMediaReport: React.FC<OfflineMediaReportProps> = ({ data, brandName }) => {
    const storageKey = `offlineMediaWidgets_${brandName}`;

    const [visibleWidgets, setVisibleWidgets] = useState<string[]>(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : allWidgets.map(w => w.id);
    });

    const totalBudget = data.offlineCampaigns.reduce((sum, camp) => sum + parseFloat(camp.budget.replace(/[^0-9.-]+/g, "")), 0);
    const totalReach = data.offlineCampaigns.reduce((sum, camp) => sum + parseFloat(camp.estimatedReach.replace(/[^0-9.]/g, '')) * (camp.estimatedReach.includes('M') ? 1000000 : 1), 0);

    const offlineMetrics: Metric[] = [
        { title: 'Total Offline Budget', value: `$${totalBudget.toLocaleString()}`, change: 'YoY', isPositive: false, period: 'this year' },
        { title: 'Total Estimated Reach', value: `${(totalReach/1000000).toFixed(1)}M`, change: 'YoY', isPositive: true, period: 'this year' },
        { title: 'Highest Impact Channel', value: 'Television', change: '+25% Brand Lift', isPositive: true, period: 'this year' },
        { title: 'Campaigns Active', value: `${data.offlineCampaigns.length}`, change: '', isPositive: true, period: 'this quarter' },
    ];

    return (
        <ReportPageLayout
            title="Offline Media Report"
            description={`Executive summary of traditional media for ${brandName}.`}
            allWidgets={allWidgets}
            visibleWidgets={visibleWidgets}
            setVisibleWidgets={setVisibleWidgets}
            storageKey={storageKey}
        >
            <div className="space-y-6">
                {visibleWidgets.includes('kpis') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {offlineMetrics.map(metric => <MetricCard key={metric.title} metric={metric} />)}
                    </div>
                )}
                
                {visibleWidgets.includes('campaignTable') && (
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <TvIcon className="w-8 h-8 text-gray-700" />
                            <h3 className="text-lg font-bold text-gray-800">Campaign Overview</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Campaign</th>
                                        <th scope="col" className="px-6 py-3">Channel</th>
                                        <th scope="col" className="px-6 py-3">Budget</th>
                                        <th scope="col" className="px-6 py-3">Estimated Reach</th>
                                        <th scope="col" className="px-6 py-3">Measured Impact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.offlineCampaigns.map(camp => (
                                        <tr key={camp.name} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{camp.name}</td>
                                            <td className="px-6 py-4">{camp.channel}</td>
                                            <td className="px-6 py-4">{camp.budget}</td>
                                            <td className="px-6 py-4">{camp.estimatedReach}</td>
                                            <td className="px-6 py-4 font-semibold text-green-600">{camp.measuredImpact}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </ReportPageLayout>
    );
};

export default OfflineMediaReport;
