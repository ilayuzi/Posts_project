# Posts App

This is a simple CRUD application for managing posts, built with React, Node.js, Express, and GraphQL.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [GraphQL API](#graphql-api)
- [Technologies Used](#technologies-used)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

## Prerequisites

Ensure you have the following installed:
- Node.js (v12 or later)
- npm (v6 or later) or yarn
- MongoDB (running locally or a cloud instance)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/ilayuzi/Posts_app.git
    cd Posts_app
    ```

2. Navigate to the backend directory and install dependencies:

    ```sh
    cd backend
    npm install
    ```

3. Navigate to the frontend directory and install dependencies:

    ```sh
    cd ../frontend
    npm install
    ```

4. Create a `.env` file in the `backend` directory with the following content:

    ```env
    NODE_ENV=development
    PORT=4000
    DATABASE=your_database_url
    DATABASE_PASSWORD=your_database_password
    ```

## Running the Application

1. Start the backend server:

    ```sh
    cd backend
    npm start
    ```

    The backend server will start on `http://localhost:4000`.
    to query the server you need to go to `http://localhost:4000/graphql`

2. Start the frontend development server:

    ```sh
    cd ../frontend
    npm start
    ```

    The frontend will start on `http://localhost:3000`.

## GraphQL API

The GraphQL API is exposed at `http://localhost:4000/graphql`.

### Example Queries

- **Get all posts:**

    ```graphql
    query {
      posts {
        _id
        title
        text
      }
    }
    ```

## Technologies Used

- **Frontend:**
  - React
  - React Router
  - Apollo Client

- **Backend:**
  - Node.js
  - Express
  - GraphQL
  - Apollo Server
  - MongoDB

## Troubleshooting

If you encounter any issues, check the following:

- Ensure MongoDB is running and the connection string is correct.
- Check the server logs for any errors.
- Ensure all dependencies are installed by running `npm install` in both `frontend` and `backend` directories.

