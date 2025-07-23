import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { GoogleGenAI, Chat } from '@google/genai';
import { HelpCircleIcon, SendIcon, SparklesIcon, XIcon, LoaderIcon, UserIcon } from './icons';
import type { ChatMessage } from '../types';

interface HelpWidgetProps {
    isOpen: boolean;
    onClose: () => void;
}

const suggestedPrompts = [
    "What does ROAS mean?",
    "How do I customize a report?",
    "Explain the dashboard layout"
];

const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
    // Basic XSS protection by escaping HTML tags first.
    const sanitizedText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    const html = sanitizedText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
        .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded text-sm font-mono text-brand-purple">$1</code>') // Inline code
        .replace(/\n/g, '<br />'); // Newlines

    return <div className="text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
};


const HelpWidget: React.FC<HelpWidgetProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && !chat) {
            try {
                const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: "You are a friendly and helpful AI assistant for the 'CMK Smart Dashboard'. Your role is to answer user questions about how to use the application, explain marketing terms (like ROAS, CPA, etc.), and guide them through its features. Keep your answers concise, clear, and helpful. Format your responses with markdown for better readability. If a question is unrelated to the dashboard or marketing concepts, politely decline to answer.",
                    },
                });
                setChat(newChat);

                const welcomeMessage: ChatMessage = {
                    sender: 'ai',
                    text: "Hello! How can I help you with the CMK Smart Dashboard today? Feel free to ask me anything about using the app or understanding the data.",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages([welcomeMessage]);
            } catch (error) {
                 console.error("Failed to initialize AI Chat:", error);
                 const errorMessage: ChatMessage = {
                    sender: 'ai',
                    text: "Sorry, I'm unable to start our chat right now. Please check your configuration.",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                 };
                 setMessages([errorMessage]);
            }
        } else if (!isOpen) {
            setChat(null);
            setMessages([]);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (prompt?: string) => {
        const textToSend = prompt || inputValue;
        if (!textToSend.trim() || isLoading || !chat) return;

        const userMessage: ChatMessage = {
            sender: 'user',
            text: textToSend,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: textToSend });
            const aiText = response.text;
            
            const aiMessage: ChatMessage = {
                sender: 'ai',
                text: aiText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error sending message to AI:", error);
            const errorMessage: ChatMessage = {
                sender: 'ai',
                text: "I'm sorry, but I'm having trouble connecting right now. Please try again later.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage();
    };

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <div className={`fixed bottom-6 right-6 w-[380px] h-[calc(100vh-4.5rem)] max-h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200/50 transition-all duration-300 ease-in-out z-40 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
            <header className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-t-2xl flex-shrink-0">
                <div className="flex items-center gap-3">
                    <HelpCircleIcon className="w-6 h-6" />
                    <h2 className="font-semibold text-lg">Help & Support</h2>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors" aria-label="Close help widget">
                    <XIcon className="w-6 h-6" />
                </button>
            </header>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-6">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {message.sender === 'ai' && (
                                <div className="w-8 h-8 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                                    <SparklesIcon className="w-5 h-5 text-brand-purple" />
                                </div>
                            )}
                            <div className={`max-w-[80%] rounded-xl ${message.sender === 'user' ? 'bg-brand-pink text-white rounded-br-none p-3' : 'bg-white text-gray-700 border border-gray-200/80 rounded-bl-none p-3'}`}>
                                {message.sender === 'ai' ? <SimpleMarkdown text={message.text} /> : <p className="text-sm">{message.text}</p>}
                            </div>
                             {message.sender === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                    <UserIcon className="w-5 h-5 text-gray-600" />
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                                <SparklesIcon className="w-5 h-5 text-brand-purple" />
                            </div>
                            <div className="bg-white text-gray-700 border border-gray-200/80 rounded-bl-none rounded-xl p-3 flex items-center gap-2">
                                <LoaderIcon className="w-5 h-5 animate-spin text-gray-500" />
                                <span className="text-sm text-gray-500">Thinking...</span>
                            </div>
                        </div>
                    )}
                </div>
                <div ref={messagesEndRef} />
            </div>

            <footer className="p-4 border-t border-gray-200 flex-shrink-0 bg-white rounded-b-2xl">
                <div className="mb-3 flex flex-wrap gap-2">
                    {suggestedPrompts.map(p => (
                         <button
                            key={p}
                            onClick={() => handleSendMessage(p)}
                            disabled={isLoading}
                            className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors disabled:opacity-50"
                        >
                            {p}
                        </button>
                    ))}
                </div>
                <form onSubmit={handleFormSubmit} className="relative">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask a question..."
                        className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition-all"
                        disabled={isLoading}
                    />
                     <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-brand-pink text-white rounded-full flex items-center justify-center hover:bg-brand-pink/90 disabled:bg-gray-300"
                        disabled={isLoading || !inputValue.trim()}
                        aria-label="Send message"
                    >
                        <SendIcon className="w-5 h-5" />
                    </button>
                </form>
            </footer>
        </div>
    , modalRoot);
};

export default HelpWidget;
