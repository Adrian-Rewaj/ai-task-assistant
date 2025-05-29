AI Task Assistant (WIP)

AI Task Assistant is an AI-powered assistant designed to help manage and interact with tasks using natural language.

This project is in an early stage and provides a modular monorepo setup using modern tools like Turborepo, TypeScript, and Next.js.

🧱 Project Structure

This monorepo is powered by Turborepo and includes:

```
apps/
├── frontend # Next.js frontend
├── backend # Express.js backend (API)
```

🚀 Getting Started

1. Install dependencies

npm install

Installs all dependencies across apps and packages.

2. Set up environment variables

For backend: copy apps/backend/.env.example to apps/backend/.env.

For frontend: copy apps/frontend/.env.example to apps/frontend/.env.

3. Run development servers

# Run all apps (backend + frontend) - turbo (in root)

npm run dev

# Run backend

cd apps/backend
npm run dev

# Run frontend

cd apps/web
npm run dev

⚙️ Features (Planned)

✅ Monorepo structure with shared tooling

✅ Shared UI components and TypeScript config

⏳ OpenAI API integration (WIP)

⏳ Prompt/chat UI (WIP)

⏳ Task CRUD functionality (WIP)

⏳ Tests and CI/CD pipelines (WIP)

🧪 Tech Stack

Next.js

Express.js

TypeScript

Turborepo

Tailwind CSS

ESLint + Prettier

📁 Environment Config

Use .env in apps/frontend for frontend variables.

Use .env in apps/backend for backend/API keys.

💡 Notes

This is a foundational setup for a scalable AI assistant app. Contributions and suggestions are welcome!

📄 License

MIT License
