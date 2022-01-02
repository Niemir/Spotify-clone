# Spotify Clone

Educational project to learn more about Typescript and Next.js.

Login in is handled by NextAuth.js and Spotify Auth Provider.

## Demo

https://spotify-clone-ebon.vercel.app/

## Spotify API

- [Spotify Dashboard, to get secrets for env file](https://developer.spotify.com/dashboard/login)
- [Spotify API Docs](https://developer.spotify.com/documentation/web-api/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/Niemir/Spotify-clone.git
```

Go to the project directory

```bash
  cd Spotify-clone
```

Copy .env-example into .env.local

```bash
  cp .env-example .env.local
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Tech Stack

**Client:** Next.js, Recoil, TailwindCSS

**Auth:** NextAuth.js
