# tokei-backend

A web based application for task management, collaboration, and managing projects.

## Installation

```bash
git clone https://github.com/refolded/tokei-backend.git
cd tokei-backend
yarn
```

### Run locally

- Make a file called .env
- Copy from .env.example to .env
- Make sure DATABASE_URL is set to the correct URL 

#### Run the server

```bash
yarn dev
```

#### Browse the database

```bash
yarn prisma studio
```

## Tech Stack

**Server:** Node, postgres, prisma, graphql, typescript
