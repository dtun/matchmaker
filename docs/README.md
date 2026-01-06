# Matchmaker Documentation

Complete technical documentation for the Matchmaker system.

## Documentation Index

### [ARCHITECTURE.md](./ARCHITECTURE.md)
**System architecture, design decisions, and technical overview**

What you'll find:
- System architecture diagrams
- Component relationships
- Technology stack details
- Design principles and patterns
- File structure
- Future enhancements
- Performance and security considerations

**Start here if:** You want to understand how the system is built and why.

---

### [DEPLOYMENT.md](./DEPLOYMENT.md)
**Complete deployment guide with multiple hosting options**

What you'll find:
- Deployment architecture diagrams
- Platform-specific deployment guides:
  - Railway (recommended for quick start)
  - Render
  - Fly.io
  - Traditional VPS
  - Docker
- Supabase setup (cloud & self-hosted)
- Environment configuration
- Database migrations
- Monitoring and observability
- Scaling strategies
- CI/CD pipelines
- Backup and disaster recovery

**Start here if:** You need to deploy the app to production.

---

### [API.md](./API.md)
**Complete REST API reference with examples**

What you'll find:
- Authentication methods
- All API endpoints with:
  - Request/response examples
  - Validation rules
  - Error responses
- People CRUD operations
- Introductions management
- Feedback system
- Matching endpoints
- cURL examples
- TypeScript client implementation

**Start here if:** You're building a client or integrating with the API.

---

### [DATABASE.md](./DATABASE.md)
**Database schema, RLS policies, and SQL reference**

What you'll find:
- Entity relationship diagrams
- Complete table schemas
- Row Level Security (RLS) policies
- Indexes and performance optimization
- Triggers and constraints
- Migration guides
- Common queries
- Backup strategies
- Monitoring queries

**Start here if:** You need to understand or modify the database.

---

### [FLOWS.md](./FLOWS.md)
**Sequence diagrams showing system interactions**

What you'll find:
- Authentication flows
- People management flows
- Introduction lifecycle
- Feedback workflows
- Matching algorithm flow
- MCP server interactions
- Error handling scenarios
- Performance timelines
- Concurrent operations

**Start here if:** You want to understand how data flows through the system.

---

## Quick Start Guide

### For Developers

1. **Understand the System**
   - Read [ARCHITECTURE.md](./ARCHITECTURE.md) for overview
   - Check [FLOWS.md](./FLOWS.md) for request lifecycles

2. **Set Up Locally**
   ```bash
   # Install dependencies
   cd backend && bun install
   cd ../mcp-server && bun install

   # Start Supabase
   supabase start

   # Run backend
   cd backend && bun run dev
   ```

3. **Explore the API**
   - Use [API.md](./API.md) as reference
   - Get JWT token: `bun run get-jwt`
   - Test endpoints with cURL

4. **Understand the Database**
   - Review [DATABASE.md](./DATABASE.md)
   - Access local DB: `supabase db studio`

### For Deployers

1. **Choose Platform**
   - Read deployment options in [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Recommended: Railway for simplicity

2. **Set Up Supabase**
   - Create Supabase Cloud project
   - Run migrations: `supabase db push`
   - Get credentials from dashboard

3. **Deploy API**
   - Follow platform-specific guide
   - Set environment variables
   - Verify health endpoint

4. **Monitor**
   - Set up error tracking (Sentry)
   - Configure uptime monitoring
   - Review Supabase dashboard

### For API Consumers

1. **Authentication**
   - Sign up via Supabase
   - Get JWT token
   - Include in Authorization header

2. **API Reference**
   - Use [API.md](./API.md) for all endpoints
   - Check validation rules
   - Handle errors properly

3. **Understanding Responses**
   - Review [DATABASE.md](./DATABASE.md) for schema
   - Check [FLOWS.md](./FLOWS.md) for expected behavior

## Document Navigation Map

```
docs/
├── README.md              ← You are here
├── ARCHITECTURE.md        ← System design & components
│   ├── Component diagrams
│   ├── Data flow patterns
│   └── Tech stack details
├── DEPLOYMENT.md          ← How to deploy
│   ├── Platform guides
│   ├── Infrastructure diagrams
│   └── CI/CD setup
├── API.md                 ← API reference
│   ├── Authentication
│   ├── All endpoints
│   └── Client examples
├── DATABASE.md            ← Database schema
│   ├── ER diagrams
│   ├── RLS policies
│   └── Common queries
└── FLOWS.md              ← Interaction flows
    ├── Sequence diagrams
    ├── Lifecycle flows
    └── Error scenarios
```

## Common Questions

### How do I...

**...understand how authentication works?**
- [ARCHITECTURE.md](./ARCHITECTURE.md) → Authentication Flow
- [FLOWS.md](./FLOWS.md) → Authentication Flows
- [API.md](./API.md) → Authentication section

**...deploy to production?**
- [DEPLOYMENT.md](./DEPLOYMENT.md) → Choose your platform
- Follow step-by-step guide

**...add a new API endpoint?**
1. [DATABASE.md](./DATABASE.md) → Check if schema changes needed
2. [ARCHITECTURE.md](./ARCHITECTURE.md) → Understand route structure
3. Add route in `backend/src/routes/`
4. Update [API.md](./API.md) with new endpoint

**...understand the database schema?**
- [DATABASE.md](./DATABASE.md) → Complete schema reference
- [ARCHITECTURE.md](./ARCHITECTURE.md) → Schema design decisions

**...debug a failed request?**
- [FLOWS.md](./FLOWS.md) → Error handling flows
- [API.md](./API.md) → Error responses
- Check server logs

**...scale the system?**
- [DEPLOYMENT.md](./DEPLOYMENT.md) → Scaling considerations
- [ARCHITECTURE.md](./ARCHITECTURE.md) → Performance section

## Diagrams Legend

### Diagram Types Used

**Mermaid Diagrams** (all docs)
- 🔷 **Architecture Diagrams**: Component relationships
- 📊 **ER Diagrams**: Database schema
- 🔄 **Sequence Diagrams**: Request/response flows
- 📈 **State Diagrams**: Status transitions
- 🌊 **Flowcharts**: Process flows

### Color Coding

- 🔵 **Blue** (`#4a90e2`): Core services (API, MCP)
- 🟡 **Yellow** (`#fff4e1`): Application layer
- 🟢 **Green** (`#e8f5e9`): Data layer (Database)
- 🔴 **Red** (`#ffcdd2`): Errors/rejections
- ⚪ **Gray**: Supporting services

## Contributing to Documentation

### Adding New Documentation

1. **Create the file** in `docs/` folder
2. **Add to this README** in the index
3. **Use Mermaid** for diagrams
4. **Follow the structure** of existing docs

### Updating Existing Documentation

1. **Keep diagrams in sync** with code changes
2. **Update examples** with real data
3. **Test code snippets** before committing
4. **Version significant changes** in git

### Documentation Standards

- Use Mermaid for all diagrams
- Include code examples with syntax highlighting
- Provide both conceptual and practical information
- Link between related documentation
- Keep navigation clear and intuitive

## Tech Stack (for reference)

- **Runtime**: Bun
- **Backend**: Hono
- **Database**: PostgreSQL (Supabase)
- **MCP**: @modelcontextprotocol/sdk
- **Validation**: Zod
- **Documentation**: Markdown + Mermaid

## Additional Resources

### External Documentation

- [Hono Documentation](https://hono.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Bun Documentation](https://bun.sh/docs)
- [MCP Documentation](https://modelcontextprotocol.io)
- [Zod Documentation](https://zod.dev)

### Project Files

- [Main README](../README.md) - Project overview
- [Setup Guide](./SETUP.md) - Initial setup (if exists)
- [MCP Setup](./MCP_SETUP.md) - MCP configuration (if exists)

---

## Documentation Status

| Document | Last Updated | Status |
|----------|--------------|--------|
| README.md | 2025-01-04 | ✅ Complete |
| ARCHITECTURE.md | 2025-01-04 | ✅ Complete |
| DEPLOYMENT.md | 2025-01-04 | ✅ Complete |
| API.md | 2025-01-04 | ✅ Complete |
| DATABASE.md | 2025-01-04 | ✅ Complete |
| FLOWS.md | 2025-01-04 | ✅ Complete |

**Coverage**: System architecture, deployment, API reference, database schema, and interaction flows are fully documented.

---

**Need help?** Start with [ARCHITECTURE.md](./ARCHITECTURE.md) for a system overview, then dive into specific areas based on your needs.
