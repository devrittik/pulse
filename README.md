# PULSE

**Every Moment. Live.**

PULSE is a modern event-streaming platform built with Next.js 15, Sanity Studio, TypeScript, Tailwind CSS 4, and HLS.js. It provides a responsive dark interface for live, upcoming, and ended events, with all public content managed through Sanity CMS.

## Features

- Next.js 15 App Router and React 19
- Embedded Sanity Studio at `/studio`
- HLS (`.m3u8`) playback through HLS.js
- Muted autoplay with manual play, mute, unmute, and fullscreen controls
- Multiple stream sources per event
- Responsive event hero, cards, filters, and search
- Live-event badges and loading animations
- Sanity-managed site name, subtitle, logo, favicon, metadata, footer, and events
- Dynamic Open Graph and social metadata
- Dynamic Sanity favicon endpoint
- Centralized fallback content when Sanity is unavailable or empty
- Loading, error, empty, and not-found states
- Responsive dark theme with centralized design tokens
- Embedded Studio isolated from the public navbar and footer

## Technology

- [Next.js 15](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Sanity](https://www.sanity.io/)
- [HLS.js](https://github.com/video-dev/hls.js/)
- [Lucide React](https://lucide.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Sonner](https://sonner.emilkowal.ski/)

## Requirements

- Node.js 20.19 or newer; Node.js 22 LTS is recommended
- npm
- A Sanity project and dataset
- A Sanity account with project access for Studio operations

## Getting started

### 1. Clone and install

```bash
git clone <your-repository-url>
cd pulse
npm install
```

### 2. Configure the environment

Copy the environment template:

```bash
cp .env.example .env.local
```

Update `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01

# Required only for a private dataset.
SANITY_API_READ_TOKEN=

# Required only for unattended server-side writes or CI automation.
SANITY_API_WRITE_TOKEN=

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Never prefix a write token with `NEXT_PUBLIC_` or expose it in a client component.

### 3. Authenticate with Sanity

```bash
npx sanity login
```

### 4. Start development

```bash
npm run dev
```

Open:

- Website: [http://localhost:3000](http://localhost:3000)
- Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

If Sanity is not configured or has no events, the public site displays centralized fallback content.

## Sanity content

### Site Settings

Site Settings is configured as a singleton and controls:

- Site name
- Subtitle
- Description
- Logo
- Favicon
- Open Graph image
- Developer information and links
- Footer text

The landing-page title uses:

```text
{siteName} | {subtitle}
```

### Events

An event includes:

- Title and slug
- Portable-text description
- Event thumbnail
- Category and tags
- Featured and live flags
- Scheduled date and time
- Status: `live`, `upcoming`, or `ended`
- One or more HLS stream sources
- Default stream selection

The event thumbnail is also used as the video poster while a stream loads.

## Sanity commands

```bash
# Run standalone Sanity Studio
npm run studio

# Build or deploy standalone Studio
npm run studio:build
npm run studio:deploy

# Seed sample content
npm run sanity:seed
npm run sanity:seed:replace

# Preview and apply data normalization
npm run sanity:migrate:dry
npm run sanity:migrate

# Extract the schema
npm run sanity:schema

# Export or restore the production dataset
npm run sanity:dataset:export
npm run sanity:dataset:import
```

Always export a backup and run the dry migration before applying a production migration. Additional details are available in [`SANITY.md`](./SANITY.md).

## Available scripts

```bash
npm run dev           # Start the Next.js development server
npm run build         # Create a production build
npm run start         # Run the production build
npm run typecheck     # Run strict TypeScript validation
npm run format        # Format the project with Prettier
npm run format:check  # Check formatting without modifying files
```

## Production build

```bash
npm run typecheck
npm run format:check
npm run build
npm run start
```

The production site and embedded Studio are served from the same Next.js application.

## Project structure

```text
pulse/
├── scripts/                    # Seed and migration scripts
├── public/brand/               # Placeholder brand and PWA assets
├── src/
│   ├── app/
│   │   ├── (site)/             # Public routes and public-site layout
│   │   │   └── event/[slug]/   # Event player page
│   │   ├── api/favicon/        # Dynamic Sanity favicon endpoint
│   │   └── studio/             # Embedded Sanity Studio
│   ├── components/
│   │   ├── events/
│   │   ├── layout/
│   │   ├── player/
│   │   ├── shared/
│   │   └── ui/
│   ├── config/
│   ├── lib/
│   ├── sanity/schemas/
│   ├── theme/
│   └── types/
├── sanity.config.ts
├── tailwind.config.ts
└── SANITY.md
```

## Streaming notes

PULSE expects valid HLS URLs ending in `.m3u8`. The player:

- Uses native HLS on supported Safari devices
- Uses HLS.js in compatible browsers
- Starts automatically in muted mode
- Lets viewers manually unmute or pause playback
- Attempts network and media-error recovery
- Displays a toast when a fatal stream error occurs

The stream provider must permit browser playback and cross-origin requests. A URL working in VLC does not necessarily mean it allows browser playback.

## Deployment

PULSE can be deployed to Vercel or any platform supporting Next.js 15 and Node.js.

For Vercel:

1. Import the Git repository.
2. Add the variables from `.env.example`.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Deploy.
5. Add the production domain to the Sanity project's CORS origins with credentials enabled for Studio access.

## License

This project is available under the [MIT License](./LICENSE). Add a root `LICENSE` file using GitHub's MIT license template and replace the copyright holder with the appropriate person or organization.

Third-party streams, event media, fonts, logos, and other assets may have separate license terms.
