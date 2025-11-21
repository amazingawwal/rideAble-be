# rideAble — Accessible Ride Platform

Making transportation inclusive, one ride at a time.

rideAble is an accessibility-focused ride platform designed to help people with mobility disabilities request rides. This project consists:

Backend: NestJS + Prisma + PostgreSQL

Routing Engine: OpenRouteService (ORS)

Authentication: JWT Access 

Infrastructure Ready: CI/CD, environment configs, seeding, and modular architecture

# Features
## Core User Features

### Request a ride with accessibility options

#### Real-time route calculation (distance, ETA, geometry)

#### Secure login/signup using JWT

### User + Driver roles

### View ride history and ride status

## Driver Features

### Accept or reject ride requests

#### Mark vehicle availability

### Assignment based on accessibility match

## Security

### Access token  authentication flow

### Bcrypt password hashing

### Role-based authorization (rider, driver, admin)

## Routing

### Google Map and OpenRouteService Directions API

- Free & no card required

- Returns distance, duration, and route geometry for map rendering


## Developer Experience

### Prisma database migrations

### Centralized config

### Seed scripts for initial admin & test data

### Production-ready folder structure

## Tech Stack - Backend

NestJS

Prisma ORM

PostgreSQL

JWT Authentication

OpenRouteService Routing API

ESLint + Prettier

Husky 

GitHub Actions (CI/CD Ready)


## Environment Variables

Create .env files:

Backend .env
DATABASE_URL="postgresql://user:password@localhost:5432/rideable"
JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_ACCESS_EXPIRES_IN="Xm"
JWT_REFRESH_EXPIRES_IN="Xd"
ORS_API_KEY="your_openrouteservice_api_key"


## Database Setup

Install dependencies:
```bash
 npm install
```

Run migrations:
```bash 
npx prisma migrate dev
```

Seed the database:
```bash 
npm run prisma:seed
```


Running the API (locally)
```bash
npm run start:dev
```





## Production Deployment

Deploy on Render


## Supports:

Install dependencies

Lint

Format

Default Admin (Seed)

```
The seed script creates a default admin:

email: admin email
password: Admin password
role: ADMIN

```

# Roadmap
## Phase 1 — MVP

✔ User signup/login
✔ Request ride
✔ Driver assignment
✔ Routing + ETA
✔ Database seeding
✔ Authentication
⬜ Payment integration
⬜ SMS notifications

## Phase 2
⬜ Real-time tracking (WebSockets)
⬜ Push notifications
⬜ Driver earnings dashboard

## Phase 3
⬜ Accessibility Rating System
⬜ NGO Partnerships
⬜ Fleet Management Tools

# Contributing

Pull requests welcome!


# License

MIT License
© 2025 rideAble