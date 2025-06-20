"use client"

import React, { useState } from 'react'
import Chatbot from "@/components/chat-box"
import Sidebar, { Conversation } from "@/components/ui/sidebar";
import { Menu, X } from "lucide-react";

const initialConversations: Conversation[] = [];

const HomePage = () => {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handler to select a conversation
  const handleSelect = (id: string) => setActiveId(id);

  // Handler to rename a conversation
  const handleRename = (id: string, newTitle: string) => {
    setConversations(conversations =>
      conversations.map(conv => conv.id === id ? { ...conv, title: newTitle } : conv)
    );
  };

  // Handler to delete a conversation
  const handleDelete = (id: string) => {
    setConversations(conversations => conversations.filter(conv => conv.id !== id));
    if (activeId === id) setActiveId(null);
  };

  return (
    <main className="w-full h-dvh bg-background">
      <div className="max-w-4xl mx-auto h-full flex relative">
        {/* Hamburger menu always visible */}
        <button
          className="absolute top-4 left-4 z-30 bg-white/80 rounded-full p-2 border shadow"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="size-6" />
        </button>
        {/* Sidebar overlay for all screen sizes */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setSidebarOpen(false)} />
        )}
        <aside
          className={`
            w-64 border-r bg-white/80 h-full
            fixed z-50 top-0 left-0 transition-transform duration-200
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {/* Close button always visible in sidebar */}
          <div className="flex justify-end p-2">
            <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
              <X className="size-6" />
            </button>
          </div>
          <Sidebar
            conversations={conversations}
            activeId={activeId}
            onSelect={id => {
              handleSelect(id);
              setSidebarOpen(false); // close sidebar after selecting
            }}
            onRename={handleRename}
            onDelete={handleDelete}
          />
        </aside>
        <div className="flex-1 h-full">
          <Chatbot />
        </div>
      </div>
    </main>
  )
};

export default HomePage
