import type { Brand, AllBrandsData, DashboardData, UserRole, User } from '../types';

// A factory function to create varied data for each brand
const createBrandData = (brandName: Brand): DashboardData => {
    const baseRevenue = { 'Frank & Co': 1248560, 'The Palace': 2500000, 'Mondial': 1800000, 'LakuEmas': 950000 }[brandName];
    const multiplier = baseRevenue / 1248560;

    return {
        executiveMetrics: [
            { title: 'Total Revenue', value: `$${Math.round(baseRevenue).toLocaleString()}`, change: `${(10 + Math.random() * 5).toFixed(1)}%`, isPositive: true, period: 'vs previous period', tooltip: 'The total income generated from all marketing and sales activities.' },
            { title: 'Marketing ROI', value: `${Math.round(300 + Math.random() * 50)}%`, change: `${(2 + Math.random() * 4).toFixed(1)}%`, isPositive: true, period: 'vs previous period', tooltip: 'Return on Investment for marketing activities.' },
            { title: 'Customer Acquisition', value: `$${(40 + Math.random() * 10).toFixed(2)}`, change: `${(1 + Math.random() * 3).toFixed(1)}%`, isPositive: true, period: 'vs previous period', tooltip: 'Customer Acquisition Cost (CAC).' },
            { title: 'Customer Lifetime Value', value: `$${(250 + Math.random() * 50).toFixed(2)}`, change: `${(3 + Math.random() * 4).toFixed(1)}%`, isPositive: true, period: 'vs previous period', tooltip: 'Predicted net profit from a customer.' },
        ],
        secondaryMetrics: [
            { title: 'Total Marketing Spend', value: `$${Math.round(389250 * multiplier).toLocaleString()}`, change: '8.7%', isPositive: true, period: 'vs previous period', tooltip: 'Total spend on all marketing.' },
            { title: 'Conversion Rate', value: `${(3 + Math.random()).toFixed(1)}%`, change: '0.5%', isPositive: true, period: 'vs previous period', tooltip: 'Percentage of users who complete a desired action.' },
            { title: 'Blended CPA', value: `$${(35 + Math.random() * 5).toFixed(2)}`, change: '3.2%', isPositive: false, period: 'vs previous period', tooltip: 'Average Cost Per Acquisition across all channels.' },
        ],
        revenueByChannelData: [
            { name: 'Paid Media', value: Math.round(498240 * multiplier), color: '#0ea5e9', revenue: `$${Math.round(498240 * multiplier).toLocaleString()}` },
            { name: 'Organic Search', value: Math.round(385420 * multiplier), color: '#3b82f6', revenue: `$${Math.round(385420 * multiplier).toLocaleString()}` },
            { name: 'Social Media', value: Math.round(189560 * multiplier), color: '#10b981', revenue: `$${Math.round(189560 * multiplier).toLocaleString()}` },
            { name: 'Direct', value: Math.round(175340 * multiplier), color: '#f97316', revenue: `$${Math.round(175340 * multiplier).toLocaleString()}` },
        ],
        channelEfficiencyData: [
            { name: 'Google Ads', roas: 3.2 + Math.random() }, { name: 'Meta Ads', roas: 2.5 + Math.random() }, { name: 'Email', roas: 4.8 + Math.random() }, { name: 'Display', roas: 1.5 + Math.random() }, { name: 'Affiliates', roas: 2.8 + Math.random() },
        ],
        topCampaigns: [
            { name: 'Summer Sale Promotion', platform: 'Google Ads', spend: `$${Math.round(32450 * multiplier).toLocaleString()}`, revenue: `$${Math.round(124890 * multiplier).toLocaleString()}`, roas: '3.85x', cpa: '$28.45', conversions: `${Math.round(1286 * multiplier).toLocaleString()}` },
            { name: 'New Collection Launch', platform: 'Meta Ads', spend: `$${Math.round(28750 * multiplier).toLocaleString()}`, revenue: `$${Math.round(95620 * multiplier).toLocaleString()}`, roas: '3.33x', cpa: '$35.12', conversions: `${Math.round(852 * multiplier).toLocaleString()}` },
        ],
        organicSearchOverviewMetrics: [
             { title: 'Organic Traffic', value: Math.round(256890 * multiplier).toLocaleString(), change: '8.2%', isPositive: true, period: 'vs previous period', tooltip: 'Visitors from unpaid search results.' },
             { title: 'Bounce Rate', value: '42.8%', change: '3.1%', isPositive: false, period: 'vs previous period', tooltip: 'Visitors who leave after one page.' },
             { title: 'Conversion Rate', value: '2.4%', change: '0.3%', isPositive: true, period: 'vs previous period', tooltip: 'Organic visitors who convert.' },
             { title: 'Organic Revenue', value: `$${Math.round(385420*multiplier).toLocaleString()}`, change: '12.8%', isPositive: true, period: 'vs previous period', tooltip: 'Revenue from organic search.' },
        ],
        topPages: [
            { path: '/product/wedding-rings', sessions: Math.round(42350 * multiplier).toLocaleString(), bounceRate: '38.2%', avgTime: '2:45', conversions: Math.round(1286 * multiplier).toLocaleString() },
            { path: '/blog/engagement-guide', sessions: Math.round(35780 * multiplier).toLocaleString(), bounceRate: '45.6%', avgTime: '3:12', conversions: Math.round(852 * multiplier).toLocaleString() },
        ],
        alerts: [
            { id: 1, type: 'warning', title: `High CAC on ${brandName}`, description: 'Customer acquisition cost for Facebook campaigns has increased by 18% in the last 7 days.' },
            { id: 2, type: 'danger', title: 'Underperforming Campaign', description: '"Spring Collection" campaign is performing 32% below target ROAS. Consider optimizing or pausing.' },
        ],
        paidMediaTabMetrics: [{ title: 'Total Ad Spend', value: `$${Math.round(156890*multiplier).toLocaleString()}`, change: '12.5%', isPositive: false, period: 'vs previous period' }, { title: 'Total Clicks', value: `${(2.1*multiplier).toFixed(1)}M`, change: '22.1%', isPositive: true, period: 'vs previous period' }, { title: 'Avg. CPC', value: '$0.07', change: '8.1%', isPositive: false, period: 'vs previous period' }, { title: 'Avg. CTR', value: '2.8%', change: '0.4%', isPositive: true, period: 'vs previous period' },],
        paidMediaPerformanceData: Array.from({ length: 12 }, (_, i) => ({ name: `Week ${i + 1}`, spend: (10000 + Math.random() * 5000)*multiplier, clicks: (150000 + Math.random() * 50000)*multiplier, conversions: (500 + Math.random() * 200)*multiplier })),
        spendByPlatformData: [{ name: 'Google Ads', value: 98420*multiplier }, { name: 'Meta Ads', value: 58470*multiplier }, { name: 'LinkedIn Ads', value: 24500*multiplier }, { name: 'Twitter Ads', value: 12400*multiplier }],
        organicSearchTabMetrics: [{ title: 'Total Organic Sessions', value: Math.round(256890*multiplier).toLocaleString(), change: '8.2%', isPositive: true, period: 'vs previous period' }, { title: 'New Users', value: Math.round(180320*multiplier).toLocaleString(), change: '10.1%', isPositive: true, period: 'vs previous period' }, { title: 'Avg. Session Duration', value: '2m 15s', change: '5.2%', isPositive: true, period: 'vs previous period' }, { title: 'Goal Completions', value: Math.round(8430*multiplier).toLocaleString(), change: '12.3%', isPositive: true, period: 'vs previous period' },],
        organicTrafficData: Array.from({ length: 30 }, (_, i) => ({ name: `Day ${i + 1}`, sessions: (8000 + Math.random() * 2000)*multiplier })),
        topKeywords: [{ keyword: 'diamond engagement rings', position: '1', monthlySearches: '110K', clicks: '25.3K' }, { keyword: `buy ${brandName.toLowerCase()} jewelry`, position: '3', monthlySearches: '85K', clicks: '15.1K' }],
        socialMediaMetrics: [{ title: 'Total Followers', value: `${(1.2*multiplier).toFixed(1)}M`, change: `${(15*multiplier).toFixed(0)}K`, isPositive: true, period: 'last 30 days' }, { title: 'Engagement Rate', value: '4.2%', change: '0.8%', isPositive: true, period: 'vs previous period' }, { title: 'Total Reach', value: `${(3.5*multiplier).toFixed(1)}M`, change: '12%', isPositive: true, period: 'vs previous period' }, { title: 'Website Clicks', value: `${(89.3*multiplier).toFixed(1)}K`, change: '25%', isPositive: true, period: 'vs previous period' },],
        followerGrowthData: [
            { name: 'Jan', Meta: 4000*multiplier, Twitter: 2400*multiplier, Instagram: 3200*multiplier }, 
            { name: 'Feb', 'Meta': 4500*multiplier, Twitter: 2800*multiplier, Instagram: 3800*multiplier }, 
            { name: 'Mar', 'Meta': 5200*multiplier, Twitter: 3000*multiplier, Instagram: 4500*multiplier },
        ],
        topPosts: [{ platform: 'Instagram', content: `Video: Unboxing our new collection at ${brandName}!`, likes: `${(15.2*multiplier).toFixed(1)}K`, comments: '2.3K', shares: '1.1K' }],
        ecommerceMetrics: [{ title: 'Total Orders', value: Math.round(22450*multiplier).toLocaleString(), change: '15.8%', isPositive: true, period: 'vs previous period' }, { title: 'Average Order Value', value: `$${(88.50*multiplier).toFixed(2)}`, change: '3.2%', isPositive: true, period: 'vs previous period' }, { title: 'Total Sales', value: `$${(1.98*multiplier).toFixed(2)}M`, change: '19.4%', isPositive: true, period: 'vs previous period' }, { title: 'Cart Abandonment Rate', value: '68.2%', change: '4.1%', isPositive: false, period: 'vs previous period' },],
        salesOverTimeData: Array.from({ length: 30 }, (_, i) => ({ name: `Day ${i + 1}`, revenue: (50000 + Math.random() * 15000)*multiplier, orders: (500 + Math.random() * 200)*multiplier })),
        topSellingProducts: [{ name: `Signature ${brandName} Ring`, sold: Math.round(4820*multiplier), revenue: `$${Math.round(722510*multiplier).toLocaleString()}` }],
        forecastMetrics: [{ title: 'Forecasted Revenue (Next 30D)', value: `$${(1.45*multiplier).toFixed(2)}M`, change: '16%', isPositive: true, period: 'projection' }, { title: 'Projected ROAS', value: '345%', change: '33%', isPositive: true, period: 'projection' }, { title: 'Predicted Traffic Growth', value: '12%', change: '4%', isPositive: true, period: 'projection' }, { title: 'Likely Top Channel', value: 'Email', change: 'High Confidence', isPositive: true, period: 'projection' },],
        revenueForecastData: [...Array.from({ length: 20 }, (_, i) => ({ name: `Day ${i + 1}`, actual: (30000 + i * 1000 + Math.random() * 5000)*multiplier, forecast: null })), ...Array.from({ length: 10 }, (_, i) => ({ name: `Day ${i + 21}`, actual: null, forecast: (50000 + i * 1200 + Math.random() * 4000)*multiplier })),],
        forecastAlerts: [{ id: 1, type: 'info', title: 'Budget Allocation Opportunity', description: 'Our model predicts that shifting 10% of Display budget to Google Search could increase overall conversions by 8%.' }],
        kols: [
            { name: 'Aura Aurelia', platform: 'Instagram', followers: '1.2M', engagementRate: '5.8%', cost: `$${Math.round(15000*multiplier).toLocaleString()}`, attributedRevenue: `$${Math.round(75000*multiplier).toLocaleString()}`, roi: '5.0x' },
            { name: 'Benny a.k.a The Gem', platform: 'TikTok', followers: '3.5M', engagementRate: '12.2%', cost: `$${Math.round(25000*multiplier).toLocaleString()}`, attributedRevenue: `$${Math.round(110000*multiplier).toLocaleString()}`, roi: '4.4x' },
        ],
        publishers: [
            { name: 'Vogue', category: 'Fashion', impressions: `${(2.5*multiplier).toFixed(1)}M`, clicks: `${(15*multiplier).toFixed(0)}K`, spend: `$${Math.round(20000*multiplier).toLocaleString()}`, revenue: `$${Math.round(80000*multiplier).toLocaleString()}` },
            { name: 'Forbes', category: 'Lifestyle', impressions: `${(1.8*multiplier).toFixed(1)}M`, clicks: `${(8*multiplier).toFixed(0)}K`, spend: `$${Math.round(12000*multiplier).toLocaleString()}`, revenue: `$${Math.round(42000*multiplier).toLocaleString()}` },
        ],
        offlineCampaigns: [
            { name: 'City Mall Atrium', channel: 'Print Magazine', budget: `$${Math.round(50000*multiplier).toLocaleString()}`, estimatedReach: '2.5M', measuredImpact: '+18% In-Store Footfall' },
            { name: 'Prime Time TVC', channel: 'TV', budget: `$${Math.round(120000*multiplier).toLocaleString()}`, estimatedReach: '8.0M', measuredImpact: '+25% Brand Search Lift' },
        ]
    };
};

export const allBrandsData: AllBrandsData = {
    'Frank & Co': createBrandData('Frank & Co'),
    'The Palace': createBrandData('The Palace'),
    'Mondial': createBrandData('Mondial'),
    'LakuEmas': createBrandData('LakuEmas'),
};

export const allBrands: Brand[] = ['Frank & Co', 'The Palace', 'Mondial', 'LakuEmas'];

// --- User and Role Management Data ---

export const mockRoles: UserRole[] = [
    {
        id: 'c-level',
        name: 'C-Level',
        description: 'Full access to all brands and settings.',
        permissions: {
            canViewAllBrands: true,
            allowedReports: ['dashboard', 'report-paid-media', 'report-organic-search', 'report-social-media', 'report-ecommerce', 'report-kol', 'report-publishers', 'report-offline-media'],
            canManageUsers: true,
        },
    },
    {
        id: 'director',
        name: 'Director',
        description: 'View all reports for assigned brands.',
        permissions: {
            canViewAllBrands: false,
            allowedReports: ['dashboard', 'report-paid-media', 'report-organic-search', 'report-social-media', 'report-ecommerce', 'report-kol', 'report-publishers', 'report-offline-media'],
            canManageUsers: true,
        },
    },
    {
        id: 'manager',
        name: 'Manager',
        description: 'View specific reports for assigned brands.',
        permissions: {
            canViewAllBrands: false,
            allowedReports: ['dashboard', 'report-paid-media', 'report-social-media'],
            canManageUsers: false,
        },
    },
    {
        id: 'analyst',
        name: 'Analyst',
        description: 'View-only access to specific reports.',
        permissions: {
            canViewAllBrands: false,
            allowedReports: ['dashboard'],
            canManageUsers: false,
        },
    },
];

export const mockUsers: User[] = [
    {
        id: 'usr-1',
        name: 'Eleanor Vance',
        email: 'eleanor.vance@cmk.com',
        avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
        roleId: 'c-level',
        assignedBrands: [], // Gets all brands by role
        status: 'Active',
    },
    {
        id: 'usr-2',
        name: 'Marcus Holloway',
        email: 'marcus.holloway@cmk.com',
        avatarUrl: 'https://randomuser.me/api/portraits/men/46.jpg',
        roleId: 'director',
        assignedBrands: ['Frank & Co', 'The Palace'],
        status: 'Active',
    },
    {
        id: 'usr-3',
        name: 'Clara Oswald',
        email: 'clara.oswald@cmk.com',
        avatarUrl: 'https://randomuser.me/api/portraits/women/47.jpg',
        roleId: 'manager',
        assignedBrands: ['Frank & Co'],
        status: 'Active',
    },
    {
        id: 'usr-4',
        name: 'Arthur Pendragon',
        email: 'arthur.pendragon@cmk.com',
        avatarUrl: 'https://randomuser.me/api/portraits/men/48.jpg',
        roleId: 'analyst',
        assignedBrands: ['The Palace'],
        status: 'Active',
    },
    {
        id: 'usr-5',
        name: 'Gwen Stacy',
        email: 'gwen.stacy@cmk.com',
        avatarUrl: 'https://randomuser.me/api/portraits/women/49.jpg',
        roleId: 'director',
        assignedBrands: ['Mondial', 'LakuEmas'],
        status: 'Invited',
    },
];
