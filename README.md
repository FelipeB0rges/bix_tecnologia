# Financial Dashboard

A dashboard for financial data visualization built with Next.js and TypeScript.

## Features

- User authentication with session persistence
- Protected dashboard routes
- Financial data visualization with Charts
- Dynamic filtering with persistence
- Responsive design for desktop and mobile

## Tech Stack

- Next.js
- TypeScript
- Styled Components
- Chart.js
- Zustand for state management

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/financial-dashboard.git
cd financial-dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Ensure the `transactions.json` file is placed in the `src/data` directory.

## Running Locally

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000

## Building for Production

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm run start
# or
yarn start
```

## Local Storage

This application uses localStorage for:
- User authentication session
- Filter preferences

If you experience any issues, try clearing your browser's local storage.

## Deployment

The easiest way to deploy this application is using Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure the build settings

## License

MIT
