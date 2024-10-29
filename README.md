# Cinema Guru

Welcome to the **Cinema Guru** project! This app allows users to keep track of favorite movies and set up a "Watch Later" list. Built with React and leveraging Next.js, Tailwind CSS, and TypeScript, the app will utilize an existing backend API to manage movie data and incorporate authentication for user interaction.

## Resources

### Tools
You may use any tools and libraries covered in previous projects, including:

- **Next.js** - [https://nextjs.org](https://nextjs.org)
- **Tailwind CSS** - [https://tailwindcss.com](https://tailwindcss.com)
- **TypeScript** - [https://www.typescriptlang.org](https://www.typescriptlang.org)
- **Vercel Deployment** - [https://vercel.com/altons-projects-ca770a53](https://vercel.com/altons-projects-ca770a53)

## Learning Objectives

By completing this project, you will:
1. Translate a Figma design into a fully functional application.
2. Build a React front end that interacts with a backend API.
3. Integrate user authentication into the application.

## Project Overview

In this project, you’ll build a **movie tracking app** where users can:

- Keep a list of favorite movies.
- Set up a "Watch Later" list to track movies they plan to view.

The app will fetch movie data from a backend API and display it within a React/Next.js interface, utilizing the data fetching capabilities of Next.js or a client-side approach. Authentication will be added to create a personalized experience for users.

### Project Links

- **Project Figma** - [Cinema Guru Design](https://www.figma.com/design/AWVM8Ak0kY6aTdEbiqscFb/Cinema-Guru?node-id=0-1&node-type=canvas)

<img width="1440" alt="Screen Shot 2024-10-28 at 4 23 35 PM" src="https://github.com/user-attachments/assets/5fe830cf-5f8a-4c1f-a79c-1266e7c01256">
<img width="1440" alt="Screen Shot 2024-10-28 at 4 24 17 PM" src="https://github.com/user-attachments/assets/72bb78db-4747-4056-bf04-b46b40e0f1ec">
<img width="1440" alt="Screen Shot 2024-10-28 at 4 24 08 PM" src="https://github.com/user-attachments/assets/398664a2-b12f-466d-875b-8ca2010d885f">




- **Project Overview Video** -

- [Loom Overview](https://www.loom.com/share/8eb1e6cf1c3c435a8d1d8d64d04cc86c?sid=80baa4ed-8658-49ef-a5dd-5cb591b35530)

## Getting Started

The starter code includes an already built backend REST API. You have two implementation options:

1. **Client-side React app**: Build a client-side app in React that interacts with the backend API.
2. **Server-rendered app with Next.js**: Use Next.js data fetching and server action patterns to handle data interactions and rendering.

---

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd cinema-guru
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

### Deployment

To deploy this app, you can use Vercel:

1. Push your code to a GitHub repository.
2. Link the repository with your Vercel account.
3. Deploy directly from the Vercel dashboard.
=======
## Atlas Cinema Guru

This is the starter template for the Atlas Cinema Guru project. It contains the starting code for the movie database application.

![](./images/task-2-a.png)

### Getting Started

- Run `npm install` to install dependencies
- Run `npm run dev` to start the dev server
- Open http://localhost:3000 in a browser

### API Routes

If you would like to use client rendered components you will need to utilize these API endpoints:

- `GET /api/titles?page=1&minYear=2023&maxYear=2024&genres=Sci-Fi,Mystery` returns list of movies. Support pagination, filtering by min year, max year, and genres
- `GET /api/watch-later?page=1` return list of movies added to users watch later list. Support pagination.
- `GET /api/favorites?page=1` return list of movies added to users favorite list. Support pagination.
- `GET /api/activities?page=1` returns list of user’s app activity. Supports pagination
- `POST /api/watch-later/:id` Adds movie to a users watch later list.
- `DELETE /api/watch-later/:id` Removes a movie from a users watch later list.
- `POST /api/favorites/:id` Adds a movie to a a users favorites list.
- `DELETE /api/favorites/:id` Removes a movie from a users favorites list.

The code for these apis can be found in the [app/api](./app/api/) directory.

You can opt not to use the API and instead use server rendered components utilizing the data fetchers defined in `lib/data`.

### Database Setup

The appliction expects a postgres database to store data. You will need to create a postgres database in vercel and populate the following env variables:

```
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

Once the database is setup and the applicationcan connect you can [seed](https://en.wikipedia.org/wiki/Database_seeding) the database usuing the `GET /api/seed` endpoint. This will create necessary database tables and load starter data. See the code [here](./app/api/seed/route.ts).

Helper methods for interactinv with the database are already implemented in [/lib/data.ts](./lib/data.ts)

### Authentication

The applicaiton expects [Auth.js](https://authjs.dev/) to be configured for the application to authenticate and authorize users. You will need to add the following env variables:

```
# Run `npx auth` to set value. See https://cli.authjs.dev
AUTH_SECRET=


# Copy from github. See https://authjs.dev/guides/configuring-github#registering-your-app
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```
>>>>>>> a744fc8 (Initial Commit)
