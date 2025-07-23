import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import type { ReportWidget } from '../../types';

interface CustomizeMetricsModalProps {
    reportName: string;
    allWidgets: ReportWidget[];
    visibleWidgets: string[];
    onClose: () => void;
    onSave: (selected: string[]) => void;
}

const CustomizeMetricsModal: React.FC<CustomizeMetricsModalProps> = ({ reportName, allWidgets, visibleWidgets, onClose, onSave }) => {
    const [selectedWidgets, setSelectedWidgets] = useState<string[]>(visibleWidgets);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleToggleWidget = (widgetId: string) => {
        setSelectedWidgets(prev =>
            prev.includes(widgetId)
                ? prev.filter(id => id !== widgetId)
                : [...prev, widgetId]
        );
    };
    
    const handleSelectAll = () => setSelectedWidgets(allWidgets.map(w => w.id));
    const handleDeselectAll = () => setSelectedWidgets([]);

    const modalContent = (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" 
            aria-modal="true" 
            role="dialog"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-2xl w-full"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Customize Report</h3>
                        <p className="mt-1 text-base text-gray-500">
                            Select the metrics you want to see on the "{reportName}" report.
                        </p>
                    </div>
                     <button
                        type="button"
                        className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <div className="mt-6 border-t border-b border-gray-200 py-4">
                    <div className="flex justify-between items-center mb-4">
                        <p className="font-semibold text-gray-700">Available Widgets</p>
                        <div className="flex gap-4">
                             <button onClick={handleSelectAll} className="text-sm font-medium text-blue-600 hover:text-blue-800">Select All</button>
                             <button onClick={handleDeselectAll} className="text-sm font-medium text-blue-600 hover:text-blue-800">Deselect All</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-80 overflow-y-auto pr-2">
                        {allWidgets.map(widget => (
                            <label key={widget.id} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200/80 cursor-pointer hover:bg-gray-100 transition-colors">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                                    checked={selectedWidgets.includes(widget.id)}
                                    onChange={() => handleToggleWidget(widget.id)}
                                />
                                <div>
                                    <span className="font-semibold text-gray-800">{widget.name}</span>
                                    <p className="text-sm text-gray-500">{widget.description}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2.5 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm transition-colors"
                        onClick={() => onSave(selectedWidgets)}
                    >
                        Save and Close
                    </button>
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:mt-0 sm:text-sm transition-colors"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
    
    const modalRoot = document.getElementById('modal-root');
    return modalRoot ? ReactDOM.createPortal(modalContent, modalRoot) : null;
};

export default CustomizeMetricsModal;
