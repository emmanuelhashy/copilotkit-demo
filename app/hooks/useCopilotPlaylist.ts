import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  isFavorite: boolean;
}

interface UseCopilotPlaylistProps {
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  playlistName: string;
}

export function useCopilotPlaylist({ songs, setSongs, playlistName }: UseCopilotPlaylistProps) {
  // Expose playlist state to AI
  useCopilotReadable({
    description: "The current playlist state including all songs, their order, and favorites",
    value: {
      playlistName,
      songs: songs.map((song, index) => ({
        position: index + 1,
        id: song.id,
        title: song.title,
        artist: song.artist,
        duration: song.duration,
        isFavorite: song.isFavorite,
      })),
      totalSongs: songs.length,
    },
  });

  // Action: Add a new song
  useCopilotAction({
    name: "addSong",
    description: "Add a new song to the playlist. Use this when the user wants to add a song with title, artist, and duration.",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title of the song",
        required: true,
      },
      {
        name: "artist",
        type: "string",
        description: "The artist or band name",
        required: true,
      },
      {
        name: "duration",
        type: "string",
        description: "The duration in MM:SS format (e.g., '3:45')",
        required: false,
      },
    ],
    handler: async ({ title, artist, duration = "0:00" }) => {
      const newSong: Song = {
        id: Date.now().toString(),
        title,
        artist,
        duration,
        isFavorite: false,
      };
      setSongs((prev) => [...prev, newSong]);
      return `Added "${title}" by ${artist} to the playlist`;
    },
  });

  // Action: Remove a song
  useCopilotAction({
    name: "removeSong",
    description: "Remove a song from the playlist by its title, artist, or position number",
    parameters: [
      {
        name: "identifier",
        type: "string",
        description: "The song title, artist name, or position number (e.g., 'first', '1', 'Bohemian Rhapsody')",
        required: true,
      },
    ],
    handler: async ({ identifier }) => {
      const lowerIdentifier = identifier.toLowerCase();
      
      // Try to match by position
      if (lowerIdentifier === "first" || lowerIdentifier === "1") {
        const removed = songs[0];
        setSongs((prev) => prev.slice(1));
        return `Removed "${removed.title}" from the playlist`;
      }
      
      if (lowerIdentifier === "last") {
        const removed = songs[songs.length - 1];
        setSongs((prev) => prev.slice(0, -1));
        return `Removed "${removed.title}" from the playlist`;
      }

      // Try to parse as number
      const position = parseInt(lowerIdentifier);
      if (!isNaN(position) && position > 0 && position <= songs.length) {
        const removed = songs[position - 1];
        setSongs((prev) => prev.filter((_, i) => i !== position - 1));
        return `Removed "${removed.title}" from position ${position}`;
      }

      // Try to match by title or artist
      const songIndex = songs.findIndex(
        (song) =>
          song.title.toLowerCase().includes(lowerIdentifier) ||
          song.artist.toLowerCase().includes(lowerIdentifier)
      );

      if (songIndex !== -1) {
        const removed = songs[songIndex];
        setSongs((prev) => prev.filter((_, i) => i !== songIndex));
        return `Removed "${removed.title}" by ${removed.artist} from the playlist`;
      }

      return `Could not find song matching "${identifier}"`;
    },
  });

  // Action: Reorder songs
  useCopilotAction({
    name: "reorderSong",
    description: "Move a song to a different position in the playlist",
    parameters: [
      {
        name: "fromPosition",
        type: "number",
        description: "The current position of the song (1-indexed)",
        required: true,
      },
      {
        name: "toPosition",
        type: "number",
        description: "The target position for the song (1-indexed)",
        required: true,
      },
    ],
    handler: async ({ fromPosition, toPosition }) => {
      const fromIndex = fromPosition - 1;
      const toIndex = toPosition - 1;

      if (fromIndex < 0 || fromIndex >= songs.length || toIndex < 0 || toIndex >= songs.length) {
        return `Invalid positions. Playlist has ${songs.length} songs.`;
      }

      const newSongs = [...songs];
      const [movedSong] = newSongs.splice(fromIndex, 1);
      newSongs.splice(toIndex, 0, movedSong);
      setSongs(newSongs);

      return `Moved "${movedSong.title}" from position ${fromPosition} to position ${toPosition}`;
    },
  });

  // Action: Toggle favorite
  useCopilotAction({
    name: "toggleFavorite",
    description: "Mark or unmark a song as favorite",
    parameters: [
      {
        name: "identifier",
        type: "string",
        description: "The song title, artist, or position number",
        required: true,
      },
    ],
    handler: async ({ identifier }) => {
      const lowerIdentifier = identifier.toLowerCase();
      
      // Try position number
      const position = parseInt(lowerIdentifier);
      if (!isNaN(position) && position > 0 && position <= songs.length) {
        const song = songs[position - 1];
        setSongs((prev) =>
          prev.map((s, i) =>
            i === position - 1 ? { ...s, isFavorite: !s.isFavorite } : s
          )
        );
        return `${song.isFavorite ? "Unmarked" : "Marked"} "${song.title}" as favorite`;
      }

      // Try title or artist
      const songIndex = songs.findIndex(
        (song) =>
          song.title.toLowerCase().includes(lowerIdentifier) ||
          song.artist.toLowerCase().includes(lowerIdentifier)
      );

      if (songIndex !== -1) {
        const song = songs[songIndex];
        setSongs((prev) =>
          prev.map((s, i) =>
            i === songIndex ? { ...s, isFavorite: !s.isFavorite } : s
          )
        );
        return `${song.isFavorite ? "Unmarked" : "Marked"} "${song.title}" as favorite`;
      }

      return `Could not find song matching "${identifier}"`;
    },
  });
}
