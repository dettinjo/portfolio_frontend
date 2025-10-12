# My Portfolio - Software & Photography

This repository contains the full source code for my personal portfolio website, showcasing my work in both software development and photography. The project is built as a monorepo, containing a headless Strapi backend and a modern Next.js frontend.

The live portfolio can be viewed at: **joeldettinger.de**

## Core Features

-   **Dual Portfolios:** A unique "hub-and-spoke" architecture that cleanly separates the software development and photography sections, each tailored to its specific audience.
-   **Headless CMS:** All content, from project details to photo albums, is managed through a powerful and flexible Strapi admin panel.
-   **Internationalization (i18n):** The entire site is available in both English and German, with language detection and a manual switcher.
-   **Dynamic Theming:** A beautiful, theme-aware "Paper-like" design with full support for both Light and Dark modes.
-   **Modern Tech Stack:** Built with the latest industry-standard tools for a fast, scalable, and developer-friendly experience.
-   **Responsive Design:** Fully responsive layout that looks great on all devices, from mobile phones to desktop screens.

## Tech Stack

This project utilizes a modern, decoupled architecture.

### Frontend (`/frontend`)

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Internationalization:** [next-intl](https://next-intl.dev/)
-   **Icons:** [Devicon](https://devicon.dev/) & [Lucide React](https://lucide.dev/)
-   **Deployment:** [Vercel](https://vercel.com/)

### Backend (`/backend`)

-   **CMS:** [Strapi](https://strapi.io/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Database:** [SQLite](https://www.sqlite.org/) (for development, configurable for production)
-   **API:** RESTful API with automatic documentation

## Project Structure

The repository is a monorepo containing two main packages:

-   `./backend`: The Strapi CMS application. It manages all content and exposes it via a REST API.
-   `./frontend`: The Next.js application. It fetches data from the Strapi backend and renders the user-facing website.

my-portfolio/
├── backend/ # Strapi Headless CMS
└── frontend/ # Next.js Frontend Application


## Getting Started

To run this project locally, you will need to set up both the backend and the frontend.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   [npm](https://www.npmjs.com/) (or yarn/pnpm)

### 1. Setup the Backend (Strapi)

The backend must be running first, as the frontend depends on its API.

```bash
# 1. Navigate into the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Build the Strapi admin panel
npm run build

# 4. Start the Strapi development server
# This will run on http://localhost:1337 by default
npm run develop
```
After starting the server, navigate to http://localhost:1337/admin to create your first administrator account.

## Content Types:
You will need to configure the following Content Types in the Strapi admin panel:
- Software Project: For your development projects.
- Album: For grouping photography.
- Photo: For individual photos, with a relation to an Album.
- 
## API Permissions
Remember to go to **Settings > Roles > Public** in the Strapi admin panel and grant the necessary permissions for each content type:
-   For **Album**, **Photo**, **Software Project**, and **Skill Category**, enable the `find` and `findOne` actions.
-   For **Testimonial**, enable the `find`, `findOne`, and **`create`** actions. The `create` permission is required for the review submission form to work.

## 2. Setup the Frontend (Next.js)
Open a new terminal window for this part.
code
```bash
# 1. Navigate into the frontend directory
cd frontend

# 2. Create the environment file
# Create a new file named `.env.local` in the /frontend directory.
# Add the following line to connect to your local Strapi instance:
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337

# 3. Install dependencies
npm install

# 4. Start the Next.js development server
# This will run on http://localhost:3000 by default
npm run dev
```
You can now open http://localhost:3000 in your browser to see the live application.
# License
This project is licensed under the MIT License. See the LICENSE file for details.
