import React, { useState } from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import ReportPageLayout from './ReportPageLayout';
import MetricCard from '../MetricCard';
import type { Brand, DashboardData, ReportWidget } from '../../types';

interface SocialMediaReportProps {
    data: DashboardData;
    brandName: Brand;
}

const allWidgets: ReportWidget[] = [
    { id: 'kpis', name: 'Social Media KPIs', description: 'High-level performance indicators for all social channels.' },
    { id: 'growthChart', name: 'Follower Growth by Platform', description: 'Chart showing follower growth across platforms over time.' },
    { id: 'topPostsTable', name: 'Top Performing Posts', description: 'Table of the most engaging social media posts.' },
];

const SocialMediaReport: React.FC<SocialMediaReportProps> = ({ data, brandName }) => {
    const storageKey = `socialMediaWidgets_${brandName}`;

    const [visibleWidgets, setVisibleWidgets] = useState<string[]>(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : allWidgets.map(w => w.id);
    });

    return (
        <ReportPageLayout
            title="Social Media Report"
            description={`Track social media performance for ${brandName}.`}
            allWidgets={allWidgets}
            visibleWidgets={visibleWidgets}
            setVisibleWidgets={setVisibleWidgets}
            storageKey={storageKey}
        >
            <div className="space-y-6">
                {visibleWidgets.includes('kpis') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {data.socialMediaMetrics.map(metric => <MetricCard key={metric.title} metric={metric} />)}
                    </div>
                )}
                
                {visibleWidgets.includes('growthChart') && (
                     <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Follower Growth by Platform</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.followerGrowthData}>
                                    <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend />
                                    <Line type="monotone" dataKey="Meta" stroke="#3b82f6" name="Meta" />
                                    <Line type="monotone" dataKey="Twitter" stroke="#0ea5e9" name="Twitter" />
                                    <Line type="monotone" dataKey="Instagram" stroke="#D91B60" name="Instagram" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {visibleWidgets.includes('topPostsTable') && (
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Top Performing Posts</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50"><tr><th className="px-6 py-3">Platform</th><th className="px-6 py-3">Content</th><th className="px-6 py-3">Likes</th><th className="px-6 py-3">Comments</th><th className="px-6 py-3">Shares</th></tr></thead>
                                <tbody>{data.topPosts.map((p, i) => <tr key={i} className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4 font-medium text-gray-900">{p.platform}</td><td className="px-6 py-4">{p.content}</td><td className="px-6 py-4">{p.likes}</td><td className="px-6 py-4">{p.comments}</td><td className="px-6 py-4">{p.shares}</td></tr>)}</tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </ReportPageLayout>
    );
};

export default SocialMediaReport;
