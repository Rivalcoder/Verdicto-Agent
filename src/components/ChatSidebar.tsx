'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Clock, 
  Star, 
  Trash2, 
  MoreVertical,
  Bot,
  User,
  Calendar,
  Filter
} from 'lucide-react';

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isStarred?: boolean;
  type: 'user' | 'assistant';
}

const ChatSidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState('1');

  const chatHistory: ChatHistory[] = [
    {
      id: '1',
      title: 'Contract Review - Johnson vs Corp',
      lastMessage: 'I need help reviewing this employment contract...',
      timestamp: '2 min ago',
      unreadCount: 2,
      isStarred: true,
      type: 'user'
    },
    {
      id: '2',
      title: 'IP Litigation Research',
      lastMessage: 'Based on the patent analysis, here are the key findings...',
      timestamp: '1 hour ago',
      type: 'assistant'
    },
    {
      id: '3',
      title: 'Settlement Negotiation Strategy',
      lastMessage: 'Let me analyze the settlement terms and provide recommendations...',
      timestamp: '3 hours ago',
      isStarred: true,
      type: 'assistant'
    },
    {
      id: '4',
      title: 'Client Intake - Smith Case',
      lastMessage: 'Please help me prepare questions for the initial client meeting...',
      timestamp: '1 day ago',
      unreadCount: 1,
      type: 'user'
    },
    {
      id: '5',
      title: 'Legal Research - Property Law',
      lastMessage: 'I found several relevant precedents for your property dispute case...',
      timestamp: '2 days ago',
      type: 'assistant'
    },
    {
      id: '6',
      title: 'Document Drafting - NDA',
      lastMessage: 'Here is the draft NDA with all the necessary clauses...',
      timestamp: '3 days ago',
      type: 'assistant'
    },
    {
      id: '7',
      title: 'Case Analysis - Personal Injury',
      lastMessage: 'Based on the medical records, here is my assessment...',
      timestamp: '1 week ago',
      isStarred: true,
      type: 'assistant'
    }
  ];

  const filteredChats = chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const starredChats = chatHistory.filter(chat => chat.isStarred);
  const recentChats = chatHistory.filter(chat => !chat.isStarred);

  return (
    <div className="w-80 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chat History</h2>
          <Button size="sm" className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            <Filter className="h-3 w-3 mr-1" />
            All
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            <Star className="h-3 w-3 mr-1" />
            Starred
          </Button>
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Starred Chats */}
          {starredChats.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Starred
              </h3>
              {starredChats.map((chat) => (
                <Card
                  key={chat.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedChat === chat.id 
                      ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {chat.type === 'assistant' ? (
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {chat.title}
                          </h4>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            {chat.unreadCount && (
                              <Badge className="h-5 w-5 p-0 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                                {chat.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate mb-1">
                          {chat.lastMessage}
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {chat.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Recent Chats */}
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Recent
            </h3>
            {recentChats.map((chat) => (
              <Card
                key={chat.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedChat === chat.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'hover:bg-gray-50 dark:hover:bg-slate-700'
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {chat.type === 'assistant' ? (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {chat.title}
                        </h4>
                        <div className="flex items-center gap-1">
                          {chat.unreadCount && (
                            <Badge className="h-5 w-5 p-0 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                              {chat.unreadCount}
                            </Badge>
                          )}
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate mb-1">
                        {chat.lastMessage}
                      </p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {chat.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>Last active: 2 minutes ago</span>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
