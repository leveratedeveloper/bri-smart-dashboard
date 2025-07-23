
import React from 'react';
import { AlertTriangleIcon, LightbulbIcon, TrendingUpIcon, AlertCircleIcon } from './icons';
import type { Alert, AlertType } from '../types';

interface AlertCardProps {
  alert: Alert;
}

const alertStyles: { [key in AlertType]: { icon: React.ReactNode; bg: string; iconBg: string; text: string } } = {
  warning: {
    icon: <AlertTriangleIcon className="w-5 h-5 text-yellow-600" />,
    bg: 'bg-yellow-50 border-yellow-200',
    iconBg: 'bg-yellow-100',
    text: 'text-yellow-800',
  },
  danger: {
    icon: <AlertCircleIcon className="w-5 h-5 text-red-600" />,
    bg: 'bg-red-50 border-red-200',
    iconBg: 'bg-red-100',
    text: 'text-red-800',
  },
  info: {
    icon: <TrendingUpIcon className="w-5 h-5 text-blue-600" />,
    bg: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100',
    text: 'text-blue-800',
  },
  success: {
    icon: <LightbulbIcon className="w-5 h-5 text-green-600" />,
    bg: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100',
    text: 'text-green-800',
  },
};

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
    const styles = alertStyles[alert.type];

    return (
        <div className={`p-4 rounded-xl border ${styles.bg} ${styles.text}`}>
            <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${styles.iconBg}`}>
                    {styles.icon}
                </div>
                <div>
                    <h4 className="font-bold">{alert.title}</h4>
                    <p className="text-sm mt-1">{alert.description}</p>
                    <a href="#" className="text-sm font-semibold mt-2 inline-block hover:underline">View Details</a>
                </div>
            </div>
        </div>
    );
};

export default AlertCard;
