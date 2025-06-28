# URL Shortener Full-Stack Application
Consists of a robust backend API built with Node.js, NestJS, and PostgreSQL, and a user-friendly frontend built with React, Next.js, and TypeScript.
The application allows users to submit a long URL, receive a unique shortened link, and track the number of visits to that link.
## Features Implemented
This project successfully implements all core requirements and several extra credit features from the task description.
### Core Requirements
- [x] **React Application:** A user-friendly interface built with React and Next.js for submitting URLs.
- [x] **URL Shortening:** When a form is submitted, the backend generates and returns a shortened version of the URL.
- [x] **Database Integration:** Each shortened URL record is saved to a PostgreSQL database.
- [x] **Unique Slugs:** The backend ensures that every generated slug (e.g., `abc123`) is unique.
- [x] **Redirection:** Accessing a shortened URL redirects the user to the original destination URL.
- [x] **404 Handling:** Accessing a shortened URL with an invalid or non-existent slug displays a "Not Found" message.
- [x] **Link Listing:** A dedicated page lists all URLs that have been saved in the database, along with their visit counts.
### Extra Credit Features
- [x] **URL Validation:** The backend validates that the provided string is a properly formatted URL.
- [x] **Error Messaging:** The UI displays a clear error message if an invalid URL is submitted.
- [x] **Copy to Clipboard:** The interface provides a "Copy" button to easily copy the shortened URL.
- [x] **Visit Tracking:** The backend tracks the number of times each shortened URL is accessed.
- [x] **Rate Limiting:** The backend API includes rate-limiting to prevent abuse from bad actors.
- [ ] **User Accounts:** Not implemented.
- [ ] **Custom Slugs:** Not implemented.
- [ ] **Analytics Dashboard:** Not implemented (though the list page serves as a basic version).
- [ ] **Dockerization:** Not implemented.
## Tech Stack
The project is split into two main parts, each with its own stack.
#### Backend (`url-shortener-backend`)
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Validation:** `class-validator` & `class-transformer`
- **Rate Limiting:** `@nestjs/throttler`
- **Unique IDs:** `nanoid`
#### Frontend (`url-shortener-frontend`)
- **Framework:** Next.js
- **Library:** React
- **Language:** TypeScript
- **Styling:** CSS Modules (Manual CSS for stability and simplicity)
## Getting Started
To get the project running locally, follow these steps.
### Prerequisites
- Node.js (v18 or later)
- npm
- A running PostgreSQL instance
### 1. Clone the Repository
```bash
git clone https://github.com/warevista/url-shortener-warevista.git
cd <project-directory>
    cd url-shortener-backend
    npm install
    -- Create a user (replace with a strong password)
    CREATE ROLE your_db_user WITH LOGIN PASSWORD 'your_password';
    -- Create the database and assign ownership
    CREATE DATABASE url_shortener_db OWNER your_db_user;
    cp .env.example .env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_db_user
    DB_PASSWORD=your_password
    DB_DATABASE=url_shortener_db
    npm run start:dev
    cd url-shortener-frontend
    npm install
    touch .env.local
    NEXT_PUBLIC_API_URL=http://localhost:3001
    npm run dev
