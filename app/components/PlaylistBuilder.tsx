"use client";

import { useState } from "react";
import { useCopilotPlaylist } from "../hooks/useCopilotPlaylist";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  isFavorite: boolean;
}

export default function PlaylistBuilder() {
  const [songs, setSongs] = useState<Song[]>([]);
  const playlistName = "Awesome Playlist";
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongArtist, setNewSongArtist] = useState("");
  const [newSongDuration, setNewSongDuration] = useState("");

  // Set up CopilotKit integration
  useCopilotPlaylist({ songs, setSongs, playlistName });

  const handleManualToggleFavorite = (id: string) => {
    setSongs((prev) =>
      prev.map((song) =>
        song.id === id ? { ...song, isFavorite: !song.isFavorite } : song
      )
    );
  };

  const handleManualRemove = (id: string) => {
    setSongs((prev) => prev.filter((song) => song.id !== id));
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSongTitle.trim() || !newSongArtist.trim()) return;

    const newSong: Song = {
      id: Date.now().toString(),
      title: newSongTitle.trim(),
      artist: newSongArtist.trim(),
      duration: newSongDuration.trim() || "0:00",
      isFavorite: false,
    };
    
    setSongs((prev) => [...prev, newSong]);
    setNewSongTitle("");
    setNewSongArtist("");
    setNewSongDuration("");
    setIsFormOpen(false);
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {playlistName}
          </h1>
          <p className="text-sm text-zinc-500 mt-2">{songs.length} songs</p>
        </div>

        {songs.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            <p className="text-lg">Your playlist is empty</p>
            <p className="text-sm mt-2">Ask the AI to add some songs!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {songs.map((song, index) => (
              <div
                key={song.id}
                className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-750 transition-colors"
              >
                <div className="text-lg font-semibold text-zinc-400 w-8">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {song.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {song.artist}
                  </p>
                </div>
                <div className="text-sm text-zinc-500">{song.duration}</div>
                <button
                  onClick={() => handleManualToggleFavorite(song.id)}
                  className="text-2xl hover:scale-110 transition-transform"
                  aria-label="Toggle favorite"
                >
                  {song.isFavorite ? "❤️" : "🤍"}
                </button>
                <button
                  onClick={() => handleManualRemove(song.id)}
                  className="text-zinc-400 hover:text-red-500 transition-colors"
                  aria-label="Remove song"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-8 left-8 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-2xl z-40"
        aria-label="Add song"
      >
        +
      </button>

      {/* Backdrop */}
      {isFormOpen && (
        <div
          onClick={() => setIsFormOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        />
      )}

      {/* Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-zinc-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isFormOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Panel Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-700">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Add New Song
            </h2>
            <button
              onClick={() => setIsFormOpen(false)}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 text-2xl"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Panel Content */}
          <form onSubmit={handleManualAdd} className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Song Title *
                </label>
                <input
                  type="text"
                  value={newSongTitle}
                  onChange={(e) => setNewSongTitle(e.target.value)}
                  placeholder="Enter song title"
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:border-blue-500 focus:outline-none text-zinc-900 dark:text-zinc-100"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Artist *
                </label>
                <input
                  type="text"
                  value={newSongArtist}
                  onChange={(e) => setNewSongArtist(e.target.value)}
                  placeholder="Enter artist name"
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:border-blue-500 focus:outline-none text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={newSongDuration}
                  onChange={(e) => setNewSongDuration(e.target.value)}
                  placeholder="e.g., 3:45"
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:border-blue-500 focus:outline-none text-zinc-900 dark:text-zinc-100"
                />
              </div>
            </div>

            {/* Panel Footer */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="flex-1 px-4 py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newSongTitle.trim() || !newSongArtist.trim()}
                className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
              >
                Add Song
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
