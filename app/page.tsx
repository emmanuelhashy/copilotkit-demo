"use client";

import PlaylistBuilder from "./components/PlaylistBuilder";
import { CopilotPopup } from "@copilotkit/react-ui";

export default function Home() {
  return (
    <div className="min-h-screen from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black py-12 px-4">
      <main className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
            🎵 Agentic Playlist Builder
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2">
            AI-powered playlist management with CopilotKit
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            Click the AI assistant to manage your playlist
          </p>
        </div>

        <PlaylistBuilder />
      </main>

      <CopilotPopup
        instructions="You are an AI assistant helping users manage their playlist. You can add, remove, reorder songs, mark favorites, and update the playlist name. Be helpful and conversational."
        labels={{
          title: "Playlist Assistant",
          initial: "Hi! I can help you manage your playlist. Try asking me to add songs, reorder tracks, or mark favorites!",
        }}
      />
    </div>
  );
}
