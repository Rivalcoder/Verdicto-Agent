"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, Mic, MicOff, Paperclip, Smile, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import ChatSidebar from "@/components/ChatSidebar";

const LegalAssistant = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content: "Hello! I'm your AI Legal Assistant. I can help you with legal research, document drafting, case analysis, and client communications. How can I assist you today?",
      timestamp: "10:30 AM",
      isLiked: false,
      isDisliked: false
    },
    {
      id: 2,
      type: "user",
      content: "Can you help me draft a non-disclosure agreement for a tech startup?",
      timestamp: "10:32 AM",
      isLiked: false,
      isDisliked: false
    },
    {
      id: 3,
      type: "assistant",
      content: "Absolutely! I'll help you draft a comprehensive NDA tailored for tech startups. I'll need some information: 1) What type of information will be disclosed? 2) Who are the parties involved? 3) What's the duration of confidentiality? 4) Any specific jurisdiction requirements?",
      timestamp: "10:32 AM",
      isLiked: false,
      isDisliked: false
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user" as const,
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isLiked: false,
        isDisliked: false
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage("");
      setIsTyping(true);
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      
      // Simulate AI response
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          type: "assistant" as const,
          content: "I understand your request. Let me analyze this and provide you with the most relevant legal guidance based on current regulations and best practices.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isLiked: false,
          isDisliked: false
        }]);
      }, 1500);
    }
  };

  const handleLike = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isLiked: !msg.isLiked, isDisliked: false }
        : msg
    ));
  };

  const handleDislike = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isDisliked: !msg.isDisliked, isLiked: false }
        : msg
    ));
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };


  return (
    <div className="h-screen flex bg-background overflow-hidden relative">
      {/* Right Sidebar - Chat History */}
      <div className="w-80 flex flex-col h-full bg-card shadow-lg">
        <ChatSidebar />
      </div>
      
      {/* Animated Divider Line - Between Chat and History */}
      <div className="absolute left-80 top-0 bottom-0 w-1 divider-line divider-glow z-10"></div>
      
      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-foreground">
                Virtual Legal Assistant
              </h1>
              <p className="text-sm text-muted-foreground">
                24/7 AI-powered legal assistance
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">Online</span>
            </div>
          </div>
        </div>
        
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-hidden bg-muted/20">
          <ScrollArea className="h-full">
            <div className="px-4 py-4 space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-message-slide-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    {msg.type === 'assistant' && (
                      <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`group relative ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-md ${
                        msg.type === 'user' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-card border border-border'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        <div className={`flex items-center justify-between mt-2 ${
                          msg.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          <span className="text-xs">{msg.timestamp}</span>
                          {msg.type === 'assistant' && (
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-muted"
                                onClick={() => handleCopy(msg.content)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-6 w-6 p-0 hover:bg-muted ${msg.isLiked ? 'text-green-600' : ''}`}
                                onClick={() => handleLike(msg.id)}
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-6 w-6 p-0 hover:bg-muted ${msg.isDisliked ? 'text-red-600' : ''}`}
                                onClick={() => handleDislike(msg.id)}
                              >
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {msg.type === 'user' && (
                      <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 justify-start animate-message-slide-in">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-card border border-border rounded-2xl p-4">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full typing-dot"></div>
                      <div className="w-2 h-2 bg-primary rounded-full typing-dot"></div>
                      <div className="w-2 h-2 bg-primary rounded-full typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>
        
        {/* Input Area - Fixed at bottom */}
        <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                placeholder="Ask your legal question... (Press Enter to send, Shift+Enter for new line)"
                value={message}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyPress}
                className="min-h-[44px] max-h-32 resize-none pr-12 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                rows={1}
              />
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-muted transition-colors"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-muted transition-colors"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleRecording}
                className={`h-10 w-10 rounded-full transition-all duration-200 ${isRecording ? "bg-red-100 text-red-600 border-red-200 hover:bg-red-200 animate-pulse" : "hover:bg-muted"}`}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button 
                onClick={handleSendMessage} 
                disabled={!message.trim()}
                className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50 transition-all duration-200 hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalAssistant;