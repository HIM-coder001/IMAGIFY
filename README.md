# Imagify

A full-stack AI image generation app built with React and Node.js. Users type a text prompt, the app generates a high-quality image using the Clipdrop API, and all generated images are saved to a personal gallery. Credits are purchased via M-Pesa STK push.

## Demo

![Imagify Demo](./demo.gif)

> Record a short screen capture of the app and save it as `demo.gif` in the project root. Tools: [ScreenToGif](https://www.screentogif.com/) (Windows) or [LICEcap](https://www.cockos.com/licecap/).

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Auth**: JWT + bcrypt
- **Image generation**: Clipdrop text-to-image API
- **Payments**: M-Pesa Daraja STK push

## Features

- User registration and login with JWT authentication
- AI image generation from text prompts (1 credit per image)
- Personal gallery — all past generations saved and browsable
- Download any generated image
- New users start with 100 free credits
- Buy more credits with M-Pesa (Basic / Advanced / Business plans)
- Responsive design with animated UI

## Project Structure

```
IMAGIFY/
├── client/          # React frontend (Vite)
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── assets/
└── server/          # Express backend
    ├── config/
    ├── controllers/
    ├── middlewares/
    ├── models/
    └── routes/
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Clipdrop API key
- M-Pesa Daraja API credentials

### Server setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIPDROP_API=your_clipdrop_api_key
CONSUMER_KEY=your_mpesa_consumer_key
CONSUMER_SECRET=your_mpesa_consumer_secret
SHORTCODE=your_mpesa_shortcode
PASSKEY=your_mpesa_passkey
CALLBACK_URL=https://yourdomain.com/api/mpesa/callback
BASE_URL=https://sandbox.safaricom.co.ke
PORT=4000
```

```bash
npm run server
```

### Client setup

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

```bash
npm run dev
```

## Pricing Plans

| Plan     | Price (KSH) | Credits |
|----------|-------------|---------|
| Basic    | 100         | 100     |
| Advanced | 400         | 500     |
| Business | 3,000       | 5,000   |

## License

MIT
