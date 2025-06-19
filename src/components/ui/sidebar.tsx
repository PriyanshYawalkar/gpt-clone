import React from "react";

type Chat = {
    id: string | number;
    name: string;
    lastMessage: string;
    avatarUrl?: string;
};

type SidebarProps = {
    chats: Chat[];
    onChatSelect: (id: string | number) => void;
    isOpen?: boolean; // For mobile toggle (optional)
    onClose?: () => void; // For mobile close button (optional)
};

export function Sidebar({
    chats,
    onChatSelect,
    isOpen = true,
    onClose,
}: SidebarProps) {
    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
                aria-hidden="true"
            />
            <aside
                className={`
          fixed top-0 left-0 h-full w-72 bg-zinc-900 border-r border-zinc-800 z-50
          flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-72 md:z-0
        `}
                aria-label="Sidebar"
            >
                {/* Close button for mobile */}
                <button
                    className="absolute top-4 right-4 md:hidden text-zinc-400 hover:text-white"
                    onClick={onClose}
                    aria-label="Close sidebar"
                    style={{ display: onClose ? "block" : "none" }}
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold px-6 py-5 border-b border-zinc-800">Recent Chats</h2>
                <ul className="flex-1 overflow-y-auto">
                    {chats.length === 0 && (
                        <li className="text-zinc-400 px-6 py-8 text-center">No recent chats</li>
                    )}
                    {chats.map((chat) => (
                        <li
                            key={chat.id}
                            className="flex items-center gap-3 px-6 py-4 cursor-pointer hover:bg-zinc-800 transition"
                            onClick={() => onChatSelect(chat.id)}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && onChatSelect(chat.id)}
                            role="button"
                            aria-label={`Open chat with ${chat.name}`}
                        >
                            {/* Avatar */}
                            {chat.avatarUrl ? (
                                <img
                                    src={chat.avatarUrl}
                                    alt={chat.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-lg font-semibold text-white">
                                    {chat.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .slice(0, 2)
                                        .toUpperCase()}
                                </div>
                            )}
                            {/* Chat info */}
                            <div className="flex-1 min-w-0">
                                <div className="text-base font-medium text-zinc-100 truncate">
                                    {chat.name}
                                </div>
                                <div className="text-sm text-zinc-400 truncate">
                                    {chat.lastMessage}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    );
}

export default Sidebar;