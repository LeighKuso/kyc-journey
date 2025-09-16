
# KYC Journey App

This project is a modern React application for digital identity verification (KYC - Know Your Customer). It guides users through a multi-step process to submit personal details, upload identity and address documents, and complete a liveness (selfie) check. The app uses Firebase for authentication, Firestore for data storage, and Firebase Storage for secure file uploads.

## Features

- Multi-step KYC user journey with progress tracking
- Firebase authentication (Google or Anonymous Sign-In)
- Real-time Firestore integration for user data
- Responsive, modern UI with Tailwind CSS

## Getting Started

### Firebase Configs

to run this project locally you will need to populate a `.env` file with all the required Fiebase Config data.
```plaintext
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id # Optional
```

### Installation

Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Project Structure

- `app/components/` — Reusable UI components
- `app/verificationSteps/` — Step-specific forms and logic
- `app/routes/` — Main app routes (e.g., dashboard)
- `app/contexts/auth/` — Authentication context and hooks
- `app/firebase/` — Firebase configuration
- `app/services/` — Service functions for auth, Firestore, and storage
