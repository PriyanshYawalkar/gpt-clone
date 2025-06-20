import React, { useState } from "react";
import type { Message } from "@/components/chat-box";

export type Conversation = {
    id: string;
    title: string;
    messages: Message[];
};

type SidebarProps = {
    conversations: Conversation[];
    activeId: string | null;
    onSelect: (id: string) => void;
    onRename: (id: string, newTitle: string) => void;
    onDelete: (id: string) => void;
    onNewChat: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
    conversations,
    activeId,
    onSelect,
    onRename,
    onDelete,
    onNewChat,
}) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState("");

    return (
        <nav className="p-4 space-y-2">
            <h2 className="font-bold mb-4">Conversations</h2>
            <button
                className="w-full mb-4 py-2 px-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-300 transition"
                onClick={onNewChat}
            >
                + New Chat
            </button>
            {conversations.length === 0 && (
                <div className="text-muted-foreground text-sm">No conversations yet.</div>
            )}
            {conversations.map((conv) => (
                <div
                    key={conv.id}
                    className={`flex items-center gap-2 rounded px-2 py-1 cursor-pointer ${conv.id === activeId ? "bg-muted" : "hover:bg-muted/50"
                        }`}
                >
                    {editingId === conv.id ? (
                        <input
                            className="flex-1 rounded px-1 text-sm"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            onBlur={() => {
                                onRename(conv.id, editValue);
                                setEditingId(null);
                            }}
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    onRename(conv.id, editValue);
                                    setEditingId(null);
                                }
                            }}
                            autoFocus
                        />
                    ) : (
                        <span
                            className="flex-1 truncate"
                            onClick={() => onSelect(conv.id)}
                            title={conv.title}
                        >
                            {conv.title}
                        </span>
                    )}
                    <button
                        className="text-xs px-1 text-blue-600 hover:underline"
                        onClick={e => {
                            e.stopPropagation();
                            setEditingId(conv.id);
                            setEditValue(conv.title);
                        }}
                        title="Rename"
                    >
                        Rename
                    </button>
                    <button
                        className="text-xs px-1 text-red-500 hover:underline"
                        onClick={e => {
                            e.stopPropagation();
                            onDelete(conv.id);
                        }}
                        title="Delete"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </nav>
    );
};

export default Sidebar; 