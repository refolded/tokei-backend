# tokei-backend

A web based application for task management, Collaboration, and managing projects.

## Installation

```bash
  git clone https://github.com/refolded/tokei-backend.git
```

### Running tokei-backend

```bash
cd tokei-backend
yarn
```

-make a file called .env
-copy from .env.example to .env
-change DATABASE_URL with the URL found in ( notion > workspace > assets > credentials )

```bash
yarn prisma generate
yarn studio (optional)
yarn dev
```

## Tech Stack

**Server:** Node, postgres, prisma, graphql, typescript
