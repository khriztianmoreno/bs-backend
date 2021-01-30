# bs-backend 🐰💻

Hello and welcome! This Node.JS challenge project demonstrates a simple architecture building a full API with Node.JS, Express.JS, and MongoDB presents an architectural demo of these features:

- Built with Node.js and Express
- REST API

## Express Router and Routes

| Route               | HTTP Verb | Route Middleware   | Description                          |
| --------------------| --------- | ------------------ | ------------------------------------ |
| /api/users          | GET       |                    | Get list of users                    |
| /api/users          | POST      |                    | Creates a new user                   |
| /api/users/:id      | GET       | `validateParamId`  | Get a single user                    |
| /api/users/:id      | DELETE    | `validateParamId`  | Deletes a user                       |
| /api/task           | GET       |                    | Get list of task                     |
| /api/task           | POST      |                    | Creates a new task                   |
| /api/task/:id       | GET       | `validateParamId`  | Get a single task                    |
| /api/task/:id       | DELETE    | `validateParamId`  | Deletes a task                       |
| /api/task/user/:id  | GET       | `validateParamId`  | Get task by user                     |

## Usage

### Basic example **Create USER** `/api/users`:

Request Body:
```json
{
  "name": "CRISTIAN MORENO",
}
```

Response:
```json
{
    "_id": "6015c2d819ecc5bfdf14bc00",
    "name": "cristian moreno",
    "createdAt": "2021-01-30T20:34:32.961Z",
    "updatedAt": "2021-01-30T20:34:32.961Z",
    "__v": 0
}
```

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 14.15.x, npm >= 6.14.x
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Configure the env
```shell
$ cp env.example .env.development
```

3. Update `.env.development` with the required info

4. Run `npm run dev` to start the development server.
