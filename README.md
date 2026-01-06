# Matchmaker System

AI-powered matchmaking system with MCP integration.

## Quick Start

1. **Setup Supabase** - See [docs/SETUP.md](docs/SETUP.md)
2. **Run Backend** - `cd backend && bun install && bun run dev`
3. **Build MCP Server** - `cd mcp-server && bun install && bun run build`
4. **Run Landing Page** - `cd web && npm install && npm run dev`
5. **Configure MCP Client** - See [docs/MCP_SETUP.md](docs/MCP_SETUP.md)

## Project Structure

```
matchmaker/
├── backend/        # Hono REST API
├── web/            # Next.js landing page
├── mcp-server/     # MCP server
├── docs/           # Documentation
└── supabase/       # Database migrations
```

## Development Setup

### Prerequisites

- [Bun](https://bun.sh) v1.0.0 or higher
- [Node.js](https://nodejs.org) v18.0.0 or higher (for web app)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (for database)

### Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd matchmaker
```

2. Install backend dependencies:

```bash
cd backend
bun install
```

3. Install MCP server dependencies:

```bash
cd ../mcp-server
bun install
```

4. Install web app dependencies:

```bash
cd ../web
npm install
```

5. Set up environment variables for web app:

```bash
cd web
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

6. Set up Supabase (see [docs/SETUP.md](docs/SETUP.md))

### Running Tests

#### Backend

```bash
cd backend
bun test              # Run all tests
bun test --watch      # Watch mode for TDD
bun test --coverage   # With coverage report
```

#### MCP Server

```bash
cd mcp-server
bun test              # Run all tests
bun test --watch      # Watch mode for TDD
bun test --coverage   # With coverage report
```

#### Web App

```bash
cd web
npm test              # Run all tests (when available)
npm run build         # Test production build
```

### Development

#### Backend API

```bash
cd backend
bun run dev          # Start with hot reload
```

#### MCP Server

```bash
cd mcp-server
bun run dev          # Start with hot reload
```

#### Landing Page

```bash
cd web
npm run dev          # Start Next.js dev server at http://localhost:3000
```

## Continuous Integration

This project uses GitHub Actions for CI/CD:

- Tests run automatically on push and pull requests
- Both backend and MCP server are tested
- Dependencies managed by Dependabot

See `.github/workflows/test.yml` for details.

## Tech Stack

- **Runtime**: [Bun](https://bun.sh) (backend/MCP), [Node.js](https://nodejs.org) (web)
- **Backend**: [Hono](https://hono.dev)
- **Frontend**: [Next.js 14](https://nextjs.org) with App Router, [Tailwind CSS](https://tailwindcss.com)
- **MCP**: [@modelcontextprotocol/sdk](https://modelcontextprotocol.io)
- **Database**: [Supabase](https://supabase.com) (PostgreSQL)
- **Testing**: Bun's built-in test runner
- **Validation**: [Zod](https://zod.dev)

## License

MIT
