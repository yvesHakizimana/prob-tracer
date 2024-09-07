# Prob-tracer (Issue Tracker)

Prob-tracer is a Next.js web application designed to manage issues using CRUD (Create, Read, Update, Delete) functionalities. It integrates authentication and authorization to ensure secure access and control of issue tracking. The application provides a streamlined interface for creating, managing, and resolving issues in a team-based environment, making it ideal for software development projects or bug tracking.

## Features

- **Authentication & Authorization**:
    - Powered by **NextAuth.js** with Prisma as the database adapter.
    - Support for various OAuth providers and local credentials for user login.
    - Role-based access control to ensure that users can only perform actions according to their permissions.

- **CRUD Operations**:
    - Create, read, update, and delete issues efficiently.
    - Assign issues to different team members and track progress.

- **User-Friendly Interface**:
    - Built using React, **Radix UI**, and **Tailwind CSS** for a modern, responsive, and accessible design.
    - Uses **React Hook Form** for forms and validations.

- **Real-time updates**:
    - Manage issues efficiently with **React Query** for data fetching and caching.

- **Rich Text Editing**:
    - Markdown-supported issue descriptions with the help of **EasyMDE** (Markdown editor).

- **Data visualization**:
    - View issue statistics and progress through beautiful charts using **Recharts**.

- **Notifications**:
    - Real-time notifications on updates using **React Hot Toast**.

- **Security & Error Tracking**:
    - Integrated with **Sentry** for error monitoring and performance tracking.

## Technologies

- **Next.js**: React framework for server-side rendering and static site generation.
- **Prisma**: ORM for managing the database and handling queries.
- **NextAuth.js**: Authentication library with built-in support for multiple providers.
- **React Query**: Data fetching and state management library for React.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Radix UI**: Accessible and responsive components for building the UI.
- **Zod**: Schema validation library for validating data structures.
- **Recharts**: Charting library for visualizing data.

## Installation and Setup

### Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v14 or higher)
- NPM or Yarn
- PostgreSQL (or another database supported by Prisma)

### Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/prob-tracer.git
cd prob-tracer
```

### Step 2: Install dependencies

Install the required project dependencies:

```bash
npm install
```

### Step 3: Configure environment variables

Create a `.env` file in the root of your project. Add the following environment variables:

```env
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

You may also need to configure additional environment variables for OAuth providers (like GitHub, Google, etc.) if using external authentication providers.

### Step 4: Set up the database

Run the Prisma migrations to set up the database:

```bash
npx prisma migrate dev --name init
```

### Step 5: Run the development server

To start the development server, run:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code issues.

## Build and Deployment

To deploy the application, first build it for production:

```bash
npm run build
```

Then, run:

```bash
npm start
```

### Vercel

This project is optimized for deployment on Vercel. You can follow the official [Vercel documentation](https://vercel.com/docs) to set up and deploy the project.

## Linting

To ensure code quality, you can run the linter:

```bash
npm run lint
```

## Usage

1. **Login**: Authenticate via OAuth providers or a local account.
2. **Create Issues**: After logging in, users can create new issues, providing details like title, description (Markdown supported), priority, and assignee.
3. **View Issues**: All issues can be viewed and filtered based on status, priority, or assigned users.
4. **Update Issues**: Users with the necessary permissions can edit issues and update their status or content.
5. **Delete Issues**: Admin or authorized users can delete issues that are no longer relevant.
6. **View Statistics**: Visualize issue progress with real-time charts.

## Contributions

We welcome contributions! Please follow these steps if you want to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.