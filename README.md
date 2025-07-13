# PayMe

A modern SaaS application built with a monorepo architecture.

## Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: Node.js with Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Monorepo**: Turborepo for build orchestration

## Project Structure

```
├── apps/
│   ├── web/          # Next.js frontend application
│   └── api/          # Express.js backend API
├── packages/
│   ├── shared/       # Shared types, schemas, and utilities
│   └── database/     # Prisma schema and database utilities
└── docs/            # Documentation
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PayMe
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

5. Start development servers:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- API: http://localhost:3001

## Development Commands

### Root level commands:
- `npm run dev` - Start all applications in development mode
- `npm run build` - Build all applications
- `npm run test` - Run tests across all packages
- `npm run lint` - Lint all packages
- `npm run typecheck` - Type check all packages

### Database commands:
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:seed` - Seed database with demo data
- `npm run db:studio` - Open Prisma Studio

## Architecture

This is a multi-tenant SaaS application with:

- **Authentication**: JWT-based auth with refresh tokens
- **Multi-tenancy**: Row-level security with tenant isolation
- **API**: RESTful API with validation and error handling
- **Database**: PostgreSQL with Prisma ORM
- **Frontend**: Server-side rendered React with Next.js

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request