# Ember & Oak

Ember & Oak is a responsive restaurant website for a Lagos restaurant, built with Next.js. It includes a browsable food menu, a cart and checkout flow, and table reservations.

## Features

- Responsive home page with restaurant story, featured dishes, services, and location details.
- Menu browsing with category filters, search, dish details, customizations, and availability information.
- Cart with item configuration, quantity and price summaries.
- Checkout options for dine-in, takeaway, and delivery.
- Reservation flow with date, time, party-size selection, confirmation, and calendar event download.
- Responsive navigation and motion effects.
- Search-engine and social sharing metadata, plus the branded favicon at `public/favicon.png`.

> **Prototype note:** Menu data, cart state, checkout, and reservation confirmations are implemented in the frontend. Checkout and reservation submissions are demo flows; they do not currently send orders or reservations to a backend or process real payments.

## Requirements

- Node.js compatible with Next.js 16.
- npm (the repository includes `package-lock.json`).

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To test on a phone connected to the same network, start the server bound to all network interfaces:

```bash
npm run dev -- --hostname 0.0.0.0
```

Then open the **Network** URL printed by Next.js on the phone. Your computer's firewall must allow the development server connection.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Create and verify an optimized production build. |
| `npm run start` | Serve the production build locally (run `npm run build` first). |
| `npm run lint` | Run ESLint. |

## Routes

| Route | Description |
| --- | --- |
| `/` | Home page and restaurant information. |
| `/menu` | Searchable and filterable menu. |
| `/checkout` | Cart checkout. Accepts an optional `table` query parameter for table-service orders. |
| `/reservations` | Table reservation form and confirmation. |

The menu also supports `?cart=1` to open the cart when the menu loads.

## Project structure

```text
src/
  app/                 App Router pages, route components, and global styles
  components/
    cart/              Cart drawer and cart UI
    layout/            Header, navigation, logo, and home-page sections
    ui/                Shared buttons, cards, and section wrapper
  data/                Restaurant menu data
  store/               Zustand cart and restaurant state
public/
  assets/              Restaurant and dish images
  favicon.png          Branded site icon
```

## Deployment

Deploy with [Vercel](https://vercel.com/) by importing the Git repository and using the default Next.js build settings.

Set `NEXT_PUBLIC_SITE_URL` to the canonical public site URL (for example, `https://www.example.com`) in the deployment environment. This gives Open Graph and Twitter previews an absolute URL for the restaurant image. On Vercel, the metadata can also fall back to Vercel's deployment URL variables when this setting is not provided.

## Technology

- Next.js App Router and React
- Tailwind CSS
- Framer Motion
- Zustand
- Inter and Fraunces fonts
