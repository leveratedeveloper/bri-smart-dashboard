import React, { useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import ReportPageLayout from './ReportPageLayout';
import MetricCard from '../MetricCard';
import type { Brand, DashboardData, ReportWidget } from '../../types';

interface EcommerceReportProps {
    data: DashboardData;
    brandName: Brand;
}

const allWidgets: ReportWidget[] = [
    { id: 'kpis', name: 'E-Commerce KPIs', description: 'High-level performance indicators for sales and orders.' },
    { id: 'salesChart', name: 'Sales vs Orders (Last 30 Days)', description: 'Chart comparing revenue and order volume over time.' },
    { id: 'topProductsTable', name: 'Top Selling Products', description: 'Table of top products by revenue.' },
];

const EcommerceReport: React.FC<EcommerceReportProps> = ({ data, brandName }) => {
    const storageKey = `ecommerceWidgets_${brandName}`;

    const [visibleWidgets, setVisibleWidgets] = useState<string[]>(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : allWidgets.map(w => w.id);
    });

    return (
        <ReportPageLayout
            title="E-commerce Report"
            description={`Monitor sales performance and key e-commerce metrics for ${brandName}.`}
            allWidgets={allWidgets}
            visibleWidgets={visibleWidgets}
            setVisibleWidgets={setVisibleWidgets}
            storageKey={storageKey}
        >
            <div className="space-y-6">
                {visibleWidgets.includes('kpis') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {data.ecommerceMetrics.map(metric => <MetricCard key={metric.title} metric={metric} />)}
                    </div>
                )}
                
                {visibleWidgets.includes('salesChart') && (
                     <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Sales vs Orders (Last 30 Days)</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.salesOverTimeData}>
                                    <XAxis dataKey="name" tick={{ fontSize: 10 }} /><YAxis yAxisId="left" orientation="left" stroke="#10b981" /><YAxis yAxisId="right" orientation="right" stroke="#3b82f6" /><Tooltip /><Legend />
                                    <Bar yAxisId="left" dataKey="revenue" fill="#10b981" name="Revenue" /><Bar yAxisId="right" dataKey="orders" fill="#3b82f6" name="Orders" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {visibleWidgets.includes('topProductsTable') && (
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Top Selling Products by Revenue</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50"><tr><th className="px-6 py-3">Product</th><th className="px-6 py-3">Units Sold</th><th className="px-6 py-3">Total Revenue</th></tr></thead>
                                <tbody>{data.topSellingProducts.map(p => <tr key={p.name} className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4 font-medium text-gray-900">{p.name}</td><td className="px-6 py-4">{p.sold}</td><td className="px-6 py-4">{p.revenue}</td></tr>)}</tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </ReportPageLayout>
    );
};

export default EcommerceReport;
