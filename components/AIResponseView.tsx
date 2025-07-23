
import React from 'react';
import type { AIResponse } from '../types';
import { SparklesIcon, LightbulbIcon } from './icons';

interface AIResponseViewProps {
    response: AIResponse;
    onNewPrompt: () => void;
    setPrompt: (prompt: string) => void;
}

const AIResponseView: React.FC<AIResponseViewProps> = ({ response, onNewPrompt, setPrompt }) => {
    const { summary, keyFinding, data, recommendations, followUpQuestions } = response;
    const tableHeaders = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <div className="space-y-8 mt-6">
            {/* 1. Summary Section */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-blue-200 shadow-sm">
                <div className="flex items-start gap-4">
                    <SparklesIcon className="w-8 h-8 text-brand-pink flex-shrink-0 mt-1" />
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">AI Generated Insight</h2>
                        <p className="mt-2 text-gray-600 leading-relaxed">{summary}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 2. Key Finding */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col justify-center">
                        <h3 className="text-base font-semibold text-gray-500">{keyFinding.title}</h3>
                        <p className="text-4xl font-bold text-brand-pink mt-3">{keyFinding.value}</p>
                        <p className="mt-2 text-sm font-medium text-green-600">{keyFinding.change}</p>
                    </div>
                </div>

                {/* 3. Supporting Data */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Supporting Data</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    {tableHeaders.map(header => <th key={header} scope="col" className="px-6 py-3">{header.replace(/([A-Z])/g, ' $1').trim()}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, i) => (
                                    <tr key={i} className="bg-white border-b hover:bg-gray-50">
                                        {tableHeaders.map(header => {
                                            const value = row[header];
                                            const isNumeric = header === 'ROAS' || header === 'Conversions' || header === 'Sessions';
                                            return (
                                                <td key={header} className={`px-6 py-4 ${isNumeric ? 'font-medium' : ''} ${header === 'ROAS' ? 'text-green-600' : 'text-gray-900'}`}>
                                                    {value}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 4. Recommendations */}
             <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Actionable Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendations.map((rec, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex gap-4">
                            <div className="bg-green-100 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
                                <LightbulbIcon className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">{rec.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 5. Follow-up Questions */}
            <div>
                 <h3 className="text-xl font-bold text-gray-800 mb-4">Continue the Conversation</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     {followUpQuestions.map((q, i) => (
                        <button key={i} onClick={() => setPrompt(q)} className="text-left text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 p-4 rounded-lg flex-1 transition-colors hover:shadow-sm">
                            {q}
                        </button>
                     ))}
                 </div>
            </div>
            
            <div className="text-center pt-4">
                <button onClick={onNewPrompt} className="px-6 py-2 bg-brand-purple text-white rounded-full font-semibold hover:bg-brand-purple/90 transition-colors shadow-sm">
                    Ask Another Question
                </button>
            </div>
        </div>
    );
};

export default AIResponseView;
