# M.B Educational Platform — Enterprise Backend Architecture

A scalable, high-throughput educational platform backend built using NestJS, TypeScript, and a hybrid Monolith and Microservices architecture. Designed for performance, data consistency, real-time engagement, and automated quality assurance.

---

## Technical Stack & Frameworks

* **Core Framework:** NestJS v10+, Node.js runtime (v20 LTS).
* **Language:** TypeScript with strict mode and ESLint enforcement.
* **Database & ORM:** PostgreSQL primary database with TypeORM for query building and schema migrations.
* **In-Memory Store:** Redis for application-level caching, session storage, and rate limiting.
* **Asynchronous Queuing:** BullMQ on top of Redis for offloading background tasks and event drivers.
* **Real-time Engine:** Socket.io / WebSockets for bi-directional communication.
* **DevOps & Testing:** Docker, Docker Compose, Jest, Supertest, and GitHub Actions CI/CD.

---

## Architectural Features & Core Capabilities

### 1. Authentication & Enterprise Security
* **Stateless JWT:** Token-based authentication using short-lived Access Tokens and Refresh Token rotation mechanisms.
* **Role-Based Access Control (RBAC):** Guard-level authorization enforcing dynamic permissions across Admin, Instructor, and Student roles.
* **Data Security:** Argon2 password hashing, request payload validation using class-validator, and CORS configuration.

### 2. Async Queue & Background Jobs
* **Distributed Queue System:** Offloads long-running tasks such as transactional email delivery, OTP processing, and notification generation to BullMQ workers.
* **Fault Tolerance:** Built-in automatic retry strategies and exponential backoff mechanisms for failed background jobs.

### 3. Real-Time Communication System
* **WebSocket Gateway:** Isolated chat infrastructure supporting direct messaging and multi-user chat rooms.
* **Event Handlers:** Instant message persistence, typing indicators, read receipts, and presence detection.

### 4. Database Performance & Caching
* **Caching Layer:** Redis cache interceptors minimizing read-heavy database load for static content and course structures.
* **Query Optimization:** Indexed relational models, lazy/eager loading strategies, and database transaction controls for execution integrity.

---

## Isolated Microservices Architecture

To process intensive workloads without degrading primary platform operations, sensitive domains are decoupled into dedicated microservices:

### Payment Gateway Microservice
* Independent execution context handling checkout workflows, dynamic payment provider routing, and idempotency checks.
* Automated webhook listeners for handling provider callbacks, failure fallbacks, and transaction audit trails.

### Video Streaming Microservice (HLS/DASH)
* Decoupled media processing service handling secure video ingestion, segmenting, and dynamic bitrate encoding.
* Adaptive HTTP Live Streaming (HLS) delivery with tokenized URL authentication to prevent unauthorized content distribution.

---

## Testing & Continuous Integration (CI/CD)

* **Unit Testing:** Isolated test cases executing via Jest for service methods and domain logic.
* **End-to-End (E2E) Testing:** Automated integration test suite running Supertest against live PostgreSQL database containers inside CI runners.
* **Automated CI/CD Pipeline:** GitHub Actions workflow executing build verification, linting, unit tests, and integration suites on every pull request and branch merge.

---

## Getting Started

### Environment Requirements
* Node.js v20+
* Docker Desktop / Docker Engine
* PostgreSQL 15+
* Redis 7+

### Local Setup
1. Clone the repository:
   git clone https://github.com/Mogamed-gabal/M.B-Edu-Platform.git

2. Install dependencies:
   npm ci

3. Configure environment variables (.env file):
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgrespassword
   DB_DATABASE=edu_platform
   REDIS_HOST=localhost
   REDIS_PORT=6379

4. Run database migrations:
   npm run migration:run

5. Start the application:
   npm run start:dev

### Running Tests
* Unit Tests: npm run test
* E2E Tests: npm run test:e2e
* Test Coverage: npm run test:cov