'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Plus, 
  Search, 
  Clock, 
  Star, 
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


  const starredChats = chatHistory.filter(chat => chat.isStarred);
  const recentChats = chatHistory.filter(chat => !chat.isStarred);

  return (
    <div className="w-full flex flex-col h-full bg-card">
      {/* Content */}
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Chat History</h2>
            <Button size="sm" className="h-8 w-8 p-0 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="p-4 border-b border-border flex-shrink-0">
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
          <div className="p-3 space-y-2">
            {/* Starred Chats */}
            {starredChats.length > 0 && (
              <div className="space-y-1.5 ">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Starred
                </h3>
                {starredChats.map((chat) => (
                  <Card
                    key={chat.id}
                    className={`cursor-pointer max-w-72 transition-all duration-200 hover:shadow-md ${
                      selectedChat === chat.id 
                        ? 'ring-2 ring-primary bg-primary/10' 
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <CardContent className="p-2 ">
                      <div className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-0.5">
                          {chat.type === 'assistant' ? (
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <Bot className="w-3 h-3 text-primary-foreground" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                              <User className="w-3 h-3 text-secondary-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <h4 className="text-xs font-medium text-foreground truncate">
                              {chat.title}
                            </h4>
                            <div className="flex items-center gap-1">
                              <Star className="w-2.5 h-2.5 text-yellow-500 fill-current" />
                              {chat.unreadCount && (
                                <Badge className="h-4 w-4 p-0 text-xs bg-destructive text-destructive-foreground rounded-full flex items-center justify-center">
                                  {chat.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mb-0.5 line-clamp-1">
                            {chat.lastMessage}
                          </p>
                          <div className="flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
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
            <div className="space-y-1.5">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Recent
              </h3>
              {recentChats.map((chat) => (
                <Card
                  key={chat.id}
                  className={`group cursor-pointer max-w-72 transition-all duration-300 hover:shadow-md ${
                    selectedChat === chat.id 
                      ? 'ring-2 ring-primary bg-primary/10' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <CardContent className="p-2">
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-0.5">
                        {chat.type === 'assistant' ? (
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <Bot className="w-3 h-3 text-primary-foreground" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-secondary-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-xs font-medium text-foreground truncate">
                            {chat.title}
                          </h4>
                          <div className="flex items-center gap-1">
                            {chat.unreadCount && (
                              <Badge className="h-4 w-4 p-0 text-xs bg-destructive text-destructive-foreground rounded-full flex items-center justify-center">
                                {chat.unreadCount}
                              </Badge>
                            )}
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <MoreVertical className="w-2.5 h-2.5" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-0.5 line-clamp-1">
                          {chat.lastMessage}
                        </p>
                        <div className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
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
        <div className="p-4 border-t border-border flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last active: 2 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;