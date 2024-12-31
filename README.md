# VSC Hohenthurm Website

A fullstack application for the VSC Hohenthurm sports club.

## Stack

- Next.js with React
- Shadcn/UI components
- TailwindCSS
- Sanity.io CMS

## Features

- Content management through Sanity Studio
- Dynamic page generation
- SEO optimization & pre-rendered content using Next.js

## Architecture

The application follows a headless CMS architecture, with Sanity.io managing content and Next.js handling the frontend. This enables:

- Real-time content updates
- Structured content modeling
- Type-safe content queries
- Optimized image delivery

## SanityPress

The app architecture is based on Sanitypress (see [here](https://github.com/nuotsu/sanitypress) ). Many different components are added to allow for the current site design, including server-side forms for tournament registrations + dynamic content loading to allow for archive & "last published" pages.

## Development

```bash
npm install
npm run dev
```

Your env needs the following structure:

```
NEXT_PUBLIC_BASE_URL = 'http://localhost:8000'
NEXT_PUBLIC_SANITY_PROJECT_ID = ______
NEXT_PUBLIC_SANITY_DATASET = ______
NEXT_PUBLIC_SANITY_TOKEN = ______
DRAFT_KEY = ______ # this is used within the middleware to allow for dev draft pages outside of the Sanity CMS.
```

Visit [vsc-hohenthurm.de](https://vsc-hohenthurm.de) to see the live site.

## License

MIT
