"use client";

import React, { useEffect, useRef, useState } from 'react';
import {
    ArrowUpIcon,
    PlusIcon,
    CalculatorIcon,
    LineChartIcon,
    FileTextIcon,
    BarChart3Icon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { chat } from "@/actions/chat";
import { readStreamableValue } from "ai/rsc";
import { cn } from "@/lib/utils";
import MarkdownRenderer from "./markdown-renderer";
import { uploadMedia } from "@/actions/upload";

export type Message = {
    role: "user" | "assistant";
    content: string;
};

const prompts = [
    {
        icon: <CalculatorIcon strokeWidth={1.8} className="size-5" />,
        text: "Generate the monthly income statement",
    },
    {
        icon: <LineChartIcon strokeWidth={1.8} className="size-5" />,
        text: "Provide a 12-month cash flow forecast",
    },
    {
        icon: <FileTextIcon strokeWidth={1.8} className="size-5" />,
        text: "Help me to build an App",
    },
    {
        icon: <BarChart3Icon strokeWidth={1.8} className="size-5" />,
        text: "Create a real-time financial dashboard",
    },
];

const Chatbot = () => {
    const messageEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [input, setInput] = useState<string>("");
    const [conversation, setConversation] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasStartedChat, setHasStartedChat] = useState<boolean>(false);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation]);

    const handlePromptClick = (text: string) => {
        setInput(text);
        if (inputRef.current) {
            inputRef.current.textContent = text;
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: "user",
            content: input.trim(),
        };

        setInput("");
        setIsLoading(true);
        setConversation(prev => [...prev, userMessage]);
        setHasStartedChat(true);

        try {
            const { newMessage } = await chat([...conversation, userMessage]);

            let textContent = "";
            const assistantMessage: Message = { role: "assistant", content: "" };
            setConversation(prev => [...prev, assistantMessage]);

            for await (const delta of readStreamableValue(newMessage)) {
                textContent += delta;
                setConversation(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                        role: "assistant",
                        content: textContent,
                    };
                    return updated;
                });
            }

        } catch (error) {
            console.error("Error: ", error);
            setConversation(prev => [...prev, {
                role: "assistant",
                content: "Sorry, there was an error. Please try again.",
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const url = await uploadMedia(file);
            const userMessage: Message = {
                role: "user",
                content: `Uploaded file: [${file.name}](${url})`,
            };
            setConversation(prev => [...prev, userMessage]);
        } catch (error) {
            console.error("Upload error", error);
            setConversation(prev => [...prev, {
                role: "assistant",
                content: "File upload failed. Please try again.",
            }]);
        }
    };

    return (
        <div className="relative h-full flex flex-col items-center">
            <div className="flex-1 w-full max-w-3xl px-4">
                {!hasStartedChat ? (
                    <div className="flex flex-col justify-end h-full space-y-8">
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl font-semibold">Hi there 👋</h1>
                            <h2 className="text-xl text-muted-foreground">What can I help you with?</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
                            <AnimatePresence>
                                {prompts.map((prompt, index) => (
                                    <motion.button
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        onClick={() => handlePromptClick(prompt.text)}
                                        className="flex items-center gap-3 p-4 border rounded-xl hover:bg-muted text-sm"
                                    >
                                        {prompt.icon}
                                        <span>{prompt.text}</span>
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        animate={{
                            paddingBottom: input ? (input.split("\n").length > 3 ? "206px" : "110px") : "80px"
                        }}
                        transition={{ duration: 0.2 }}
                        className="pt-8 space-y-4"
                    >
                        {conversation.map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn("flex", {
                                    "justify-end": message.role === "user",
                                    "justify-start": message.role === "assistant"
                                })}
                            >
                                <div className={cn(
                                    "max-w-[80%] rounded-xl px-4 py-2",
                                    {
                                        "bg-foreground text-background": message.role === "user",
                                        "bg-muted": message.role === "assistant",
                                    }
                                )}>
                                    {message.role === "assistant" ? (
                                        <MarkdownRenderer content={message.content} />
                                    ) : (
                                        <p className="whitespace-pre-wrap">{message.content}</p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                        <div ref={messageEndRef} />
                    </motion.div>
                )}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, position: hasStartedChat ? "fixed" : "relative" }}
                className="w-full bg-gradient-to-t from-white via-white to-transparent pb-4 pt-6 bottom-0 mt-auto"
            >
                <div className="max-w-3xl mx-auto px-4">
                    <motion.div className="relative border rounded-2xl p-2.5 flex items-end gap-2 bg-background">
                        <input
                            type="file"
                            accept="*/*"
                            hidden
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                        />
                        <Button size="icon" variant="ghost" className="rounded-full" onClick={() => fileInputRef.current?.click()}>
                            <PlusIcon className="size-5" />
                        </Button>
                        <div
                            contentEditable
                            role="textbox"
                            ref={inputRef}
                            data-placeholder="Message..."
                            onInput={(e) => setInput(e.currentTarget.textContent || "")}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            className="flex-1 px-3 py-2 min-h-[36px] bg-background rounded-md text-sm empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)] whitespace-pre-wrap break-words focus:outline-none"
                        />
                        <Button size="icon" className="rounded-full" onClick={handleSend}>
                            <ArrowUpIcon className="size-5" />
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Chatbot;
