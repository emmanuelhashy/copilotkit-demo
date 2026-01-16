# Agentic Playlist Builder with CopilotKit

An AI-powered playlist management application with CopilotKit.

## Features

### 🎵 Playlist Management
- **Add Songs**: Ask AI to add songs with natural language
- **Remove Songs**: Remove by title, artist, or position
- **Reorder Tracks**: Move songs to different positions
- **Mark Favorites**: Toggle favorites with AI commands
- **Update Playlist Name**: Rename your playlist via AI

## Installation

1. Install dependencies:
```bash
npm install
```

Required packages:
- `@copilotkit/react-core`
- `@copilotkit/react-ui`
- `@copilotkit/runtime`

2. Set up your Google AI API key in `.env.local`:
```env
GOOGLE_API_KEY=your_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Usage Examples

### Playlist Commands
- "Add 'Imagine' by John Lennon to the playlist"
- "Remove the first song"
- "Move song 3 to position 1"
- "Mark 'Bohemian Rhapsody' as favorite"
- "Rename the playlist to 'Road Trip Mix'"

## Architecture

This app uses CopilotKit's Direct-to-LLM architecture:

- **useCopilotReadable**: Exposes app state to AI models
- **useCopilotAction**: Defines actions AI can invoke
- **CopilotPopup**: Provides the chat interface
- **CopilotKit Provider**: Wraps the app with AI capabilities

## Components

- `PlaylistBuilder.tsx`: Main playlist component with AI integration
- `app/api/copilotkit/route.ts`: API route for CopilotKit runtime

## Learn More

- [CopilotKit Documentation](https://docs.copilotkit.ai)
- [Next.js Documentation](https://nextjs.org/docs)
