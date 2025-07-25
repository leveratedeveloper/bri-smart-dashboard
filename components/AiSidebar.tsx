import React, { useState, useRef, useEffect } from 'react';
import type { ConversationItem, AIResponse } from '../types';
import { XIcon, LightbulbIcon, LoaderIcon, PlusIcon, ToolsIcon, MicIcon, SoundwaveIcon, AlertTriangleIcon, CheckCircleIcon } from './icons';

interface AiSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    conversation: ConversationItem[];
    onFollowUpSubmit: (prompt: string) => void;
    isLoading: boolean;
}

const AiSidebar: React.FC<AiSidebarProps> = ({ isOpen, onClose, conversation, onFollowUpSubmit, isLoading }) => {
    const [followUpPrompt, setFollowUpPrompt] = useState('');
    const conversationEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(isOpen) {
            conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversation, isOpen]);


    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!followUpPrompt.trim() || isLoading) return;
        onFollowUpSubmit(followUpPrompt);
        setFollowUpPrompt('');
    }

    const UserPromptBubble: React.FC<{prompt: string}> = ({prompt}) => (
        <div className="flex justify-end items-start gap-3">
            <div className="bg-gray-100 p-4 rounded-xl rounded-br-none max-w-md">
                <p className="text-sm text-gray-800">{prompt}</p>
            </div>
            <div className="text-center">
                 <img className="w-10 h-10 rounded-full" src="https://randomuser.me/api/portraits/women/44.jpg" alt="Admin"/>
                 <p className="text-xs text-gray-500 mt-1">Admin</p>
            </div>
        </div>
    );
    
    const KeyFindingCard: React.FC<{finding: AIResponse['keyFinding']}> = ({finding}) => (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h4 className="font-bold text-blue-800">{finding.title}</h4>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{finding.value}</p>
                    <p className="text-sm font-medium text-gray-600">{finding.change}</p>
                </div>
            </div>
        </div>
    );

    const DataTable: React.FC<{data: string[][]}> = ({ data }) => {
        if (!data || data.length === 0) return null;
    
        const headers = data[0];
        const rows = data.slice(1);

        if (!headers || headers.length === 0) return null;

        return (
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            {headers.map((header, index) => (
                                <th scope="col" key={index} className="px-6 py-3">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50 last:border-b-0">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const AiResponseContent: React.FC<{response: AIResponse}> = ({response}) => (
        <div className="space-y-6 text-gray-800">
            <div>
                <h3 className="text-xl font-bold">Analysis Summary</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">{response.summary}</p>
            </div>
    
            {response.keyFinding && <KeyFindingCard finding={response.keyFinding} />}
    
            {response.data && response.data.length > 0 && (
                <div>
                    <h4 className="text-lg font-bold mb-2">Supporting Data</h4>
                    <DataTable data={response.data} />
                </div>
            )}
    
            {response.recommendations && response.recommendations.length > 0 && (
                 <div>
                    <h3 className="text-xl font-bold">Actionable Recommendations</h3>
                    <div className="mt-4 space-y-4">
                    {response.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center">
                                <LightbulbIcon className="w-6 h-6 text-green-600"/>
                            </div>
                            <div>
                                <h4 className="font-semibold">{rec.title}</h4>
                                <p className="text-sm text-gray-600">{rec.description}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            )}
            
            {response.followUpQuestions && response.followUpQuestions.length > 0 && (
                <div>
                    <h4 className="text-base font-semibold text-gray-600">Suggested follow-up response:</h4>
                    <div className="mt-2 flex flex-col gap-2">
                        {response.followUpQuestions.map((q, i) => (
                            <button key={i} onClick={() => onFollowUpSubmit(q)} disabled={isLoading}
                                className="p-3 border border-pink-200 text-brand-pink text-left font-medium text-sm rounded-lg hover:bg-pink-50 transition-colors disabled:opacity-50">
                                {q}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    const ErrorBubble: React.FC<{message: string}> = ({message}) => (
        <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex-shrink-0 flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="bg-red-50 border border-red-200 p-4 rounded-xl max-w-md">
                <h4 className="font-bold text-red-800">Something went wrong</h4>
                <p className="text-sm text-red-700 mt-1">{message}</p>
            </div>
        </div>
    );

    const LoadingBubble = () => (
         <div className="flex justify-center items-center p-8">
            <LoaderIcon className="w-10 h-10 text-brand-pink animate-spin" />
        </div>
    );

    return (
        <aside className={`fixed top-0 right-0 h-full w-full w-lg-[500px] bg-white border-l border-gray-200 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out z-20 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <header className="flex-shrink-0 p-4 border-b border-gray-200">
                <div className="flex justify-between items-center mb-1">
                     <h2 className="text-xl font-bold text-gray-800">AI Analysis</h2>
                     <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
                        <XIcon className="w-6 h-6" />
                     </button>
                </div>
                <p className="text-sm text-gray-500">Last updated: Today</p>
            </header>

            <div className="flex-grow p-6 overflow-y-auto space-y-8">
                {conversation.map((item, index) => (
                    <div key={index}>
                        {item.sender === 'user' && item.userPrompt && <UserPromptBubble prompt={item.userPrompt} />}
                        {item.sender === 'ai' && (
                           <>
                            {item.isLoading && <LoadingBubble />}
                            {item.aiResponse && <AiResponseContent response={item.aiResponse} />}
                            {item.error && <ErrorBubble message={item.error} />}
                           </>
                        )}
                    </div>
                ))}
                 <div ref={conversationEndRef} />
            </div>

            <footer className="flex-shrink-0 p-4 border-t border-gray-200">
                <form onSubmit={handleFormSubmit} className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                       <button type="button" className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full"><PlusIcon className="w-5 h-5"/></button>
                       <button type="button" className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full"><ToolsIcon className="w-5 h-5"/></button>
                    </div>
                    <input
                        type="text"
                        value={followUpPrompt}
                        onChange={e => setFollowUpPrompt(e.target.value)}
                        placeholder="Ask a follow-up question..."
                        disabled={isLoading}
                        className="w-full pl-24 pr-20 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        {/* <button type="button" disabled={isLoading} className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50"><MicIcon className="w-5 h-5" /></button>
                        <button type="button" disabled={isLoading} className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50"><SoundwaveIcon className="w-5 h-5" /></button> */}
                    </div>
                </form>
            </footer>
        </aside>
    );
};

export default AiSidebar;