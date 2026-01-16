# Agentic Playlist Builder with CopilotKit

An AI-powered playlist management application demonstrating CopilotKit's Direct-to-LLM architecture.

## Features

### 🎵 Playlist Management
- **Add Songs**: Ask AI to add songs with natural language
- **Remove Songs**: Remove by title, artist, or position
- **Reorder Tracks**: Move songs to different positions
- **Mark Favorites**: Toggle favorites with AI commands
- **Update Playlist Name**: Rename your playlist via AI

### ✍️ AI-Powered Textarea
- **Write Content**: Ask AI to write text for you
- **Improve Text**: Get AI suggestions for better writing
- **Append Content**: Add more content to existing text
- **Clear Content**: Clear textarea with AI commands

## Installation

1. Install dependencies:
```bash
npm install
```

Required packages:
- `@copilotkit/react-core`
- `@copilotkit/react-ui`
- `@copilotkit/runtime`
- `openai`

2. Set up your OpenAI API key in `.env.local`:
```env
OPENAI_API_KEY=your_api_key_here
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

### Textarea Commands
- "Write a short bio about CopilotKit"
- "Improve the text and make it more professional"
- "Add a paragraph about AI integration"
- "Clear the textarea"

## Architecture

This app uses CopilotKit's Direct-to-LLM architecture:

- **useCopilotReadable**: Exposes app state to AI models
- **useCopilotAction**: Defines actions AI can invoke
- **CopilotPopup**: Provides the chat interface
- **CopilotKit Provider**: Wraps the app with AI capabilities

## Components

- `PlaylistBuilder.tsx`: Main playlist component with AI integration
- `AITextarea.tsx`: AI-powered textarea component
- `app/api/copilotkit/route.ts`: API route for CopilotKit runtime

## Learn More

- [CopilotKit Documentation](https://docs.copilotkit.ai)
- [Next.js Documentation](https://nextjs.org/docs)
