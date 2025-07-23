import React, { useState } from 'react';
import ReportPageLayout from './ReportPageLayout';
import MetricCard from '../MetricCard';
import type { Brand, DashboardData, Metric, ReportWidget } from '../../types';
import { NewspaperIcon } from '../icons';

interface PublishersReportProps {
    data: DashboardData;
    brandName: Brand;
}

const allWidgets: ReportWidget[] = [
    { id: 'kpis', name: 'Publisher Summary KPIs', description: 'High-level indicators for total publisher spend, revenue, and impressions.' },
    { id: 'publisherTable', name: 'Publisher Performance Table', description: 'A detailed table of publishers, sorted by revenue.' },
];

const PublishersReport: React.FC<PublishersReportProps> = ({ data, brandName }) => {
    const storageKey = `publishersWidgets_${brandName}`;

    const [visibleWidgets, setVisibleWidgets] = useState<string[]>(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : allWidgets.map(w => w.id);
    });
    
    const totalSpend = data.publishers.reduce((sum, pub) => sum + parseFloat(pub.spend.replace(/[^0-9.-]+/g, "")), 0);
    const totalRevenue = data.publishers.reduce((sum, pub) => sum + parseFloat(pub.revenue.replace(/[^0-9.-]+/g, "")), 0);
    const totalImpressions = data.publishers.reduce((sum, pub) => sum + parseFloat(pub.impressions.replace(/[^0-9.]/g, '')) * (pub.impressions.includes('M') ? 1000000 : 1), 0);

    const publisherMetrics: Metric[] = [
        { title: 'Total Publisher Spend', value: `$${totalSpend.toLocaleString()}`, change: '+8%', isPositive: false, period: 'this quarter' },
        { title: 'Total Attributed Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+15%', isPositive: true, period: 'this quarter' },
        { title: 'Total Impressions', value: `${(totalImpressions / 1000000).toFixed(1)}M`, change: '+10%', isPositive: true, period: 'this quarter' },
        { title: 'Top Publisher ROI', value: '4.0x', change: 'Vogue', isPositive: true, period: 'this quarter' },
    ];

    return (
        <ReportPageLayout
            title="Publisher Performance Report"
            description={`Executive summary of media partnerships for ${brandName}.`}
            allWidgets={allWidgets}
            visibleWidgets={visibleWidgets}
            setVisibleWidgets={setVisibleWidgets}
            storageKey={storageKey}
        >
            <div className="space-y-6">
                {visibleWidgets.includes('kpis') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {publisherMetrics.map(metric => <MetricCard key={metric.title} metric={metric} />)}
                    </div>
                )}
                
                {visibleWidgets.includes('publisherTable') && (
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <NewspaperIcon className="w-8 h-8 text-brand-blue" />
                            <h3 className="text-lg font-bold text-gray-800">Top Publishers by Revenue</h3>
                        </div>
                         <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Publisher</th>
                                        <th scope="col" className="px-6 py-3">Category</th>
                                        <th scope="col" className="px-6 py-3">Spend</th>
                                        <th scope="col" className="px-6 py-3">Revenue</th>
                                        <th scope="col" className="px-6 py-3">Clicks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.publishers.sort((a, b) => parseFloat(b.revenue.replace(/[^0-9.-]+/g, "")) - parseFloat(a.revenue.replace(/[^0-9.-]+/g, ""))).map(pub => (
                                        <tr key={pub.name} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{pub.name}</td>
                                            <td className="px-6 py-4">{pub.category}</td>
                                            <td className="px-6 py-4">{pub.spend}</td>
                                            <td className="px-6 py-4 font-semibold text-gray-800">{pub.revenue}</td>
                                            <td className="px-6 py-4">{pub.clicks}</td>
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

export default PublishersReport;
