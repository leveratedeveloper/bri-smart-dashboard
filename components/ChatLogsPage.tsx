import React, { useState, useEffect } from 'react';
import type { ChatLog, AIResponse, ConversationItem } from '../types';
import { supabase } from '../lib/supabase';
import { SparklesIcon, ChatLogsIcon, LoaderIcon, AlertTriangleIcon, LightbulbIcon, CheckCircleIcon } from './icons';

// Reusable components from AiSidebar.tsx
const UserPromptBubble: React.FC<{prompt: string}> = ({prompt}) => (
    <div className="flex justify-end items-start gap-3">
        <div className="bg-gray-100 p-4 rounded-xl rounded-br-none max-w-md">
            <p className="text-sm text-gray-800">{prompt}</p>
        </div>
        <div className="text-center">
             <img className="w-10 h-10 rounded-full" src="https://randomuser.me/api/portraits/women/44.jpg" alt="Admin"/>
             <p className="text-xs text-gray-500 mt-1">You</p>
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
                    <tr>{headers.map((h, i) => <th scope="col" key={i} className="px-6 py-3">{h}</th>)}</tr>
                </thead>
                <tbody>
                    {rows.map((row, rIndex) => (
                        <tr key={rIndex} className="bg-white border-b hover:bg-gray-50 last:border-b-0">
                            {row.map((cell, cIndex) => <td key={cIndex} className="px-6 py-4 whitespace-nowrap">{cell}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const AiResponseContent: React.FC<{response: AIResponse}> = ({response}) => (
    <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-brand-purple rounded-full flex-shrink-0 flex items-center justify-center">
            <SparklesIcon className="w-6 h-6 text-white"/>
        </div>
        <div className="space-y-6 text-gray-800 bg-white p-5 rounded-xl border border-gray-200/80 rounded-bl-none flex-1">
            <div>
                <h3 className="text-lg font-bold">Analysis Summary</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">{response.summary}</p>
            </div>
            {response.keyFinding && <KeyFindingCard finding={response.keyFinding} />}
            {response.data && response.data.length > 0 && (
                <div>
                    <h4 className="text-md font-bold mb-2">Supporting Data</h4>
                    <DataTable data={response.data} />
                </div>
            )}
            {response.recommendations && response.recommendations.length > 0 && (
                 <div>
                    <h3 className="text-lg font-bold">Actionable Recommendations</h3>
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
            {/* Follow-up questions are not interactive in history view */}
        </div>
    </div>
);

const ErrorBubble: React.FC<{message: string}> = ({message}) => (
    <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-red-100 rounded-full flex-shrink-0 flex items-center justify-center">
            <AlertTriangleIcon className="w-6 h-6 text-red-600" />
        </div>
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl max-w-md">
            <h4 className="font-bold text-red-800">An error occurred</h4>
            <p className="text-sm text-red-700 mt-1">{message}</p>
        </div>
    </div>
);


const ChatLogsPage: React.FC = () => {
    const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
    const [selectedChat, setSelectedChat] = useState<ChatLog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChatLogs = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('chat_logs')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching chat logs:", error);
            } else {
                setChatLogs(data as ChatLog[]);
                if (data && data.length > 0) {
                    setSelectedChat(data[0] as ChatLog);
                }
            }
            setLoading(false);
        };
        fetchChatLogs();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="flex h-full bg-white">
            <aside className="w-1/3 lg:w-1/4 h-full border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200 flex-shrink-0">
                    <h1 className="text-xl font-bold text-gray-800">Chat History</h1>
                    <p className="text-xs text-gray-500">Review past conversations</p>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <LoaderIcon className="w-8 h-8 animate-spin text-brand-pink" />
                        </div>
                    ) : chatLogs.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                            <ChatLogsIcon className="w-12 h-12 mx-auto text-gray-300 mb-2"/>
                            No chat history found.
                        </div>
                    ) : (
                        <nav className="p-2 space-y-1">
                            {chatLogs.map(log => (
                                <button
                                    key={log.id}
                                    onClick={() => setSelectedChat(log)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                                        selectedChat?.id === log.id 
                                            ? 'bg-brand-pink/10 text-brand-pink' 
                                            : 'hover:bg-gray-100'
                                    }`}
                                >
                                    <h3 className="font-semibold text-sm truncate">{log.title}</h3>
                                    <p className="text-xs text-gray-500">{formatDate(log.created_at)}</p>
                                </button>
                            ))}
                        </nav>
                    )}
                </div>
            </aside>

            <main className="flex-1 h-full flex flex-col">
                {selectedChat ? (
                    <>
                        <div className="p-4 border-b border-gray-200 flex-shrink-0">
                            <h2 className="text-lg font-bold text-gray-900">{selectedChat.title}</h2>
                            <p className="text-xs text-gray-500">Conversation from {formatDate(selectedChat.created_at)}</p>
                        </div>
                        <div className="flex-grow p-6 overflow-y-auto bg-gray-50/50">
                            <div className="space-y-6">
                                {selectedChat.conversation.map((item, index) => (
                                    <div key={index}>
                                        {item.sender === 'user' && item.userPrompt && <UserPromptBubble prompt={item.userPrompt} />}
                                        {item.sender === 'ai' && (
                                            <>
                                                {item.aiResponse && <AiResponseContent response={item.aiResponse} />}
                                                {item.error && <ErrorBubble message={item.error} />}
                                                {/* Don't show loading bubble in history */}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                         {loading ? (
                            <LoaderIcon className="w-8 h-8 animate-spin text-brand-pink" />
                         ) : (
                            <div className="text-center">
                                <ChatLogsIcon className="w-16 h-16 mx-auto text-gray-300" />
                                <h2 className="mt-2 text-lg font-medium text-gray-900">Select a conversation</h2>
                                <p className="mt-1 text-sm text-gray-500">Choose a chat from the left panel to see the details here.</p>
                            </div>
                         )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default ChatLogsPage;