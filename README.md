# GPT-Clone

A modern, full-featured AI chatbot built with Next.js, TypeScript, and the Vercel AI SDK. Enjoy real-time streaming responses, multi-conversation management, file uploads, and a clean, responsive UI—just like ChatGPT.

---

## 🚀 Features

- **OpenAI GPT-4o Integration**: Chat with the latest OpenAI models using your own API key.
- **Real-Time Streaming**: See responses as they're generated, not after.
- **Multi-Conversation Sidebar**: Start, rename, delete, and switch between chats. Each chat keeps its own history.
- **Responsive UI**: Works beautifully on desktop and mobile, with a collapsible sidebar and smooth animations.
- **File Uploads**: Send files and get links in your chat.
- **Markdown Support**: Rich, formatted AI responses.
- **Prompt Suggestions**: Quick-start prompts for common tasks.
- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Vercel AI SDK, and more.

---

## 🧰 Tech Stack

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [OpenAI API](https://platform.openai.com/)
- [Framer Motion](https://www.framer.com/motion/) (animations)
- [Lucide Icons](https://lucide.dev/) (icons)
- [Firebase](https://firebase.google.com/) (optional, for uploads)

---

## 📦 Project Structure

```
src/
  actions/         # Server actions (chat, upload)
  app/             # Next.js app entry and layout
  components/      # React UI components
    chat-box.tsx   # Main chat UI
    ui/
      sidebar.tsx  # Sidebar for conversations
      button.tsx   # Reusable button
    markdown-renderer.tsx # Markdown rendering for AI responses
  lib/             # Utility and API integration
    openai.ts      # OpenAI API setup
    upload-media-client.ts # File upload logic
    utils.ts       # Utility functions
public/            # Static assets (SVGs, etc.)
```

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/PriyanshYawalkar/gpt-clone.git
cd gpt-clone
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your OpenAI API key:

```
OPENAI_API_KEY=your-openai-key-here
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to use your chatbot!

---

## 📝 Usage

- **Start a New Chat**: Click "+ New Chat" in the sidebar.
- **Switch Chats**: Click any chat in the sidebar to view its history.
- **Rename/Delete**: Use the "Rename" or "Delete" buttons next to each chat.
- **Send a Message**: Type in the input box and press Enter.
- **Upload Files**: Click the "+" button to upload a file.
- **Prompt Suggestions**: Click a prompt to auto-fill the input.

---

## 🧩 Customization

- **Model**: Change the model in `src/actions/chat.ts` (`gpt-4o` by default).
- **Styling**: Edit `tailwind.config.ts` and component classes for custom themes.
- **Providers**: Add more AI providers via the Vercel AI SDK.

---

## 🛡️ License

MIT

---

## 🙋‍♂️ Contributing

Pull requests and issues are welcome! If you have ideas or find bugs, please open an issue or PR.

---

## 💡 Credits

- Built by [Priyansh Yawalkar](https://github.com/PriyanshYawalkar)
- Inspired by [Vercel AI SDK Examples](https://sdk.vercel.ai/docs)
