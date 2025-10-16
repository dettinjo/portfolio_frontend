<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://joeldettinger.de">
    <img src="public/favicon-home-dark.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Dual-Purpose Portfolio | Software & Photography</h3>

  <p align="center">
    A personal portfolio showcasing professional work in software development and photography, built with a modern hub-and-spoke architecture.
    <br />
    <a href="#about-the-project"><strong>Explore the Features »</strong></a>
    <br />
    <br />
    <a href="https://joeldettinger.de">View Demo</a>
    ·
    <a href="https://github.com/dettinjo/portfolio_frontend/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/dettinjo/portfolio_frontend/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#backend-setup-strapi">Backend Setup (Strapi)</a></li>
        <li><a href="#frontend-setup-nextjs">Frontend Setup (Next.js)</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://joeldettinger.de)

This repository contains a full-stack personal portfolio designed to showcase two distinct professional areas: software development and photography. The project uses a modern "hub-and-spoke" architecture where a central landing page directs users to specialized sub-sites.

Here's why this architecture is effective:
*   **Separation of Concerns:** Each portfolio is tailored to its specific audience with relevant layouts and content, providing a focused user experience.
*   **Headless & Dynamic:** All content, from project details to photo albums, is managed through a flexible Strapi Headless CMS, allowing for easy updates without redeploying the frontend.
*   **Modern User Experience:** The entire site supports internationalization (EN/DE) and features a dynamic light/dark theme that respects user preferences.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This project is built with a modern, decoupled architecture using the latest industry-standard tools for a fast, scalable, and developer-friendly experience.

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Tailwind][TailwindCSS]][Tailwind-url]
* [![Strapi][Strapi.io]][Strapi-url]
* [![Vercel][Vercel]][Vercel-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, you will need to set up both the backend (Strapi) and the frontend (Next.js) services.

### Prerequisites

Ensure you have the following software installed on your machine.
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   npm
    ```sh
    npm install npm@latest -g
    ```

### Backend Setup (Strapi)

The backend must be running first, as the frontend depends on its API. This project is a monorepo; these instructions assume you are running them from the `/backend` directory of the original project.

1.  Navigate into the `backend` directory.
    ```sh
    cd backend
    ```
2.  Install NPM packages.
    ```sh
    npm install
    ```
3.  Build the Strapi admin panel.
    ```sh
    npm run build
    ```
4.  Start the Strapi development server (runs on `http://localhost:1337`).
    ```sh
    npm run develop
    ```
5.  **Admin Setup & Permissions:** Navigate to `http://localhost:1337/admin` to create your administrator account. Then, go to **Settings > Roles > Public** and grant `find`, `findOne`, and `create` permissions for all your content types.

### Frontend Setup (Next.js)

These instructions should be run from the root directory of this codebase.

1.  Install NPM packages.
    ```sh
    npm install
    ```
2.  Create an environment file. In the root directory, create a new file named `.env.local` and add the following line to connect to your local Strapi instance:
    ```env
    NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
    ```
3.  Start the Next.js development server (runs on `http://localhost:3000`).
    ```sh
    npm run dev
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

A live demo of this project is running at **[joeldettinger.de](https://joeldettinger.de)**.

Locally, once both services are running, you can access the application at `http://localhost:3000`. The multi-domain architecture is handled by a middleware that rewrites requests to the appropriate internal Next.js routes, allowing you to see all parts of the portfolio through a single domain.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Separate Software & Photography portfolios
- [x] Headless CMS integration with Strapi
- [x] Internationalization (EN/DE)
- [x] Dynamic Light/Dark mode theming
- [ ] Add a blog/articles section managed from Strapi
- [ ] Implement more advanced animations and page transitions

See the [open issues](https://github.com/dettinjo/portfolio_frontend/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See the `LICENSE` file for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Project Link: [https://github.com/dettinjo/portfolio_frontend](https://github.com/dettinjo/portfolio_frontend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

This project was made possible by these incredible tools and libraries.

*   [shadcn/ui](https://ui.shadcn.com/)
*   [next-intl](https://next-intl.dev/)
*   [Framer Motion](https://www.framer.com/motion/)
*   [Lucide React](https://lucide.dev/)
*   [Devicon](https://devicon.dev/)
*   [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[issues-shield]: https://img.shields.io/github/issues/dettinjo/portfolio_frontend.svg?style=for-the-badge
[issues-url]: https://github.com/dettinjo/portfolio_frontend/issues
[license-shield]: https://img.shields.io/github/license/dettinjo/portfolio_frontend.svg?style=for-the-badge
[license-url]: https://github.com/dettinjo/portfolio_frontend/blob/main/LICENSE
[product-screenshot]: src/res/screenshots/portfolio_home.svg
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Strapi.io]: https://img.shields.io/badge/Strapi-2E7EEA?style=for-the-badge&logo=strapi&logoColor=white
[Strapi-url]: https://strapi.io/
[Vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
