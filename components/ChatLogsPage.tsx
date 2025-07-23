import React, { useState } from 'react';
import type { ChatLog } from '../types';
import { SparklesIcon, UserIcon, ChatLogsIcon } from './icons';

const mockChatLogs: ChatLog[] = [
  {
    id: '1',
    title: 'Effectiveness of Summer Campaign',
    date: '2024-07-28',
    messages: [
      { sender: 'user', text: 'Which campaign was most effective for Frank & Co?', timestamp: '10:30 AM' },
      { sender: 'ai', text: "For Frank & Co, the 'Summer Sale Promotion' was the most effective campaign for engagement this quarter. It drove the highest number of sessions and conversions.", timestamp: '10:31 AM' },
      { sender: 'user', text: 'Show me the supporting data for that.', timestamp: '10:32 AM'},
      { sender: 'ai', text: 'Of course. The Summer Sale had 1,286 conversions with a ROAS of 3.85x. Here is the full breakdown...', timestamp: '10:33 AM'}
    ],
  },
  {
    id: '2',
    title: 'Cheapest CPL Analysis',
    date: '2024-07-27',
    messages: [
        { sender: 'user', text: 'Which CPL is the cheapest for The Palace?', timestamp: '02:15 PM' },
        { sender: 'ai', text: 'For The Palace, the channel with the cheapest Cost Per Lead (CPL) is currently Email Marketing, valued at $15.20.', timestamp: '02:16 PM' },
    ],
  },
    {
    id: '3',
    title: 'Demographic Engagement for Mondial',
    date: '2024-07-26',
    messages: [
        { sender: 'user', text: 'Show me the most engaged demographic for Mondial', timestamp: '11:05 AM' },
        { sender: 'ai', text: 'For Mondial, the most engaged demographic is Women aged 25-34, who show the highest interaction rates with social media posts and have the highest conversion rate on the website.', timestamp: '11:06 AM' },
        { sender: 'user', text: 'Can you break that down by platform?', timestamp: '11:07 AM'},
        { sender: 'ai', text: 'Certainly. On Instagram, this demographic accounts for 65% of likes and 70% of clicks. On Facebook, they represent 58% of the engagement...', timestamp: '11:08 AM'}
    ],
  },
];


const ChatLogsPage: React.FC = () => {
    const [selectedChat, setSelectedChat] = useState<ChatLog | null>(mockChatLogs[0]);

    return (
        <div className="flex h-full bg-white">
            {/* Left Panel: Chat History List */}
            <aside className="w-1/3 lg:w-1/4 h-full border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200 flex-shrink-0">
                    <h1 className="text-xl font-bold text-gray-800">Chat History</h1>
                    <p className="text-sm text-gray-500">Review past conversations</p>
                </div>
                <div className="flex-grow overflow-y-auto">
                    <nav className="p-2 space-y-1">
                        {mockChatLogs.map(log => (
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
                                <p className="text-xs text-gray-500">{log.date}</p>
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Right Panel: Chat Detail View */}
            <main className="flex-1 h-full flex flex-col">
                {selectedChat ? (
                    <>
                        <div className="p-4 border-b border-gray-200 flex-shrink-0">
                            <h2 className="text-lg font-bold text-gray-900">{selectedChat.title}</h2>
                            <p className="text-sm text-gray-500">Conversation from {selectedChat.date}</p>
                        </div>
                        <div className="flex-grow p-6 overflow-y-auto bg-gray-50/50">
                            <div className="space-y-6">
                                {selectedChat.messages.map((message, index) => (
                                    <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {message.sender === 'ai' && (
                                            <div className="w-8 h-8 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                                                <SparklesIcon className="w-5 h-5 text-brand-purple" />
                                            </div>
                                        )}
                                        <div className={`max-w-md p-3 rounded-xl ${message.sender === 'user' ? 'bg-brand-pink text-white rounded-br-none' : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none'}`}>
                                            <p className="text-sm">{message.text}</p>
                                            <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>{message.timestamp}</p>
                                        </div>
                                         {message.sender === 'user' && (
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                <UserIcon className="w-5 h-5 text-gray-600" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <ChatLogsIcon className="w-16 h-16 mx-auto text-gray-300" />
                            <h2 className="mt-2 text-lg font-medium text-gray-900">Select a conversation</h2>
                            <p className="mt-1 text-sm text-gray-500">Choose a chat from the left panel to see the details here.</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ChatLogsPage;