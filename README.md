# Chat Application (NestJS + Socket.IO)

A real-time chat application built with NestJS, Socket.IO, and MongoDB. The system supports secure user authentication, message CRUD operations, and live conversation updates using WebSocket technology.

## Features

- User Authentication
  - Register with email and password
  - JWT-based login system
  - Password hashing (bcrypt)

- Real-time Chat
  - Send/receive messages in real-time via WebSocket (Socket.IO)
  - Join/leave conversation rooms dynamically
  - Load message history when entering a chat

- Message Management (CRUD)
  - Create: Send messages
  - Read: Load chat history
  - Update: Edit sent messages
  - Delete: Remove messages for self or all

- Authorization & Security
  - Role-based access control
  - WebSocket Guards with token verification
  - DTO validation and global exception filters

- Tech Stack
  - Backend: NestJS, Socket.IO, Postgresql, TypeScript
  - Frontend: ReactJs
  - Auth: JWT, bcrypt
  - REST + WebSocket architecture

