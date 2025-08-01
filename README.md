# 🎤 InterviewIQ – AI Interview Preparation Platform

A full-stack, SaaS-style web app where users upload their resume, get **AI-generated interview questions**, practise **Technical and HR rounds** with a voice-enabled AI interviewer, and receive **intelligent, scored feedback**. Access is **credit-based**, and credits can be purchased through **Razorpay**.

> Built to demonstrate real-world SaaS architecture: authentication, backend structuring, payments, AI integration and production deployment.

---

## ✨ Features

- 📄 **Resume analysis** – upload a PDF; text is extracted and the AI pulls out your role, experience, projects and skills
- 🤖 **AI-generated questions** – 5 questions per interview with progressive difficulty (easy → easy → medium → medium → hard), personalised to your role, experience, mode and resume
- 🧑‍💼 **Technical & HR modes** – practise either round type
- 🎙️ **Voice interview** – the AI interviewer (male/female avatar) speaks each question using speech synthesis, and your spoken answer is captured with speech recognition
- ⏱️ **Timed answers** – per-question time limits (60 / 60 / 90 / 90 / 120 s) with a circular timer; late or empty answers score 0
- 📊 **Intelligent feedback** – every answer is scored on **confidence, communication and correctness**, with short human-style feedback
- 📈 **Reports & analytics** – overall score, per-question breakdown, performance charts and a **downloadable PDF report**
- 🕘 **Interview history** – revisit past interviews and reports
- 💳 **Credit system** – each interview costs 50 credits; new users start with 100 free credits
- 💰 **Razorpay payments** – buy credit packs with server-side HMAC signature verification
- 🔐 **Google authentication** – Firebase Google sign-in with JWT sessions stored in HTTP cookies
- 🎞️ **Smooth UI** – Framer Motion (`motion`) animations and a responsive Tailwind CSS layout
- ☁️ **Deployed on Render**

---

## 🧰 Tech Stack

| Layer          | Technologies                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Frontend**   | React 19, Vite, Tailwind CSS 4, Redux Toolkit, React Router, Framer Motion (`motion`), Recharts, react-circular-progressbar, jsPDF + jspdf-autotable, React Icons, Axios |
| **Backend**    | Node.js, Express 5, Mongoose, JWT, cookie-parser, CORS, Multer, pdfjs-dist, Axios                                                                                        |
| **Database**   | MongoDB                                                                                                                                                                  |
| **Auth**       | Firebase Google Authentication + JWT                                                                                                                                     |
| **AI**         | OpenRouter API (`openai/gpt-4o-mini`)                                                                                                                                    |
| **Payments**   | Razorpay                                                                                                                                                                 |
| **Deployment** | Render                                                                                                                                                                   |

---

## 🗂️ Project Structure

```
interviewIQ/
├── client/                         # React (Vite) frontend
│   ├── public/
│   └── src/
│       ├── assets/                 # Images and AI avatar videos
│       ├── components/             # Navbar, Footer, AuthModel, Timer,
│       │                           # Step1SetUp, Step2Interview, Step3Report
│       ├── pages/                  # Home, Auth, InterviewPage, InterviewHistory,
│       │                           # InterviewReport, Pricing
│       ├── redux/                  # store.js, userSlice.js
│       ├── utils/firebase.js       # Firebase config
│       ├── App.jsx                 # Routes + current-user bootstrap
│       └── main.jsx
└── server/                         # Express backend
    ├── config/                     # connectDb.js, token.js (JWT)
    ├── controllers/                # auth, user, interview, payment
    ├── middlewares/                # isAuth.js, multer.js
    ├── models/                     # user, interview, payment
    ├── routes/                     # auth, user, interview, payment
    ├── services/                   # openRouter.service.js, razorpay.service.js
    ├── public/                     # temporary resume uploads
    └── index.js                    # App entry point
```

---

## 🔄 How It Works

1. **Sign in** with Google (Firebase) → the server creates the user (100 free credits) and sets a JWT cookie.
2. **Set up** the interview: choose role, experience and mode (Technical / HR), optionally upload a resume PDF.
3. **Generate questions** → the server checks you have ≥ 50 credits, asks the AI for 5 questions, deducts 50 credits and saves the interview.
4. **Interview** → the AI avatar asks each question aloud; you answer by voice or text within the time limit.
5. **Evaluation** → each answer is scored (confidence, communication, correctness) and given short feedback.
6. **Report** → final score, charts, per-question feedback and a PDF download; the interview is stored in your history.
7. **Need more credits?** Buy a pack on the Pricing page; Razorpay checkout → server verifies the signature → credits are added.

### 💳 Credit plans

| Plan         | Price | Credits         |
| ------------ | ----- | --------------- |
| Free         | ₹0    | 100 (on signup) |
| Starter Pack | ₹100  | 150             |
| Pro Pack     | ₹500  | 650             |

---

## 🔌 API Reference

Base path: `/api`. All routes except `/auth/*` require the JWT cookie.

| Method | Endpoint                        | Description                                                                          |
| ------ | ------------------------------- | ------------------------------------------------------------------------------------ |
| POST   | `/auth/google`                  | Sign in / sign up with Google details (`name`, `email`)                              |
| GET    | `/auth/logout`                  | Clear the auth cookie                                                                |
| GET    | `/user/current-user`            | Get the logged-in user (incl. credits)                                               |
| POST   | `/interview/resume`             | Upload resume PDF (`multipart`, field `resume`) → role, experience, projects, skills |
| POST   | `/interview/generate-questions` | Create an interview and deduct 50 credits                                            |
| POST   | `/interview/submit-answer`      | Submit and evaluate one answer                                                       |
| POST   | `/interview/finish`             | Finalise the interview and return scores                                             |
| GET    | `/interview/get-interview`      | List the user's interviews                                                           |
| GET    | `/interview/report/:id`         | Get a detailed report                                                                |
| POST   | `/payment/order`                | Create a Razorpay order                                                              |
| POST   | `/payment/verify`               | Verify payment signature and add credits                                             |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB database (local or MongoDB Atlas)
- A Firebase project with **Google** sign-in enabled
- An OpenRouter API key
- Razorpay account (test mode keys are fine)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Configure the server

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
OPENROUTER_API_KEY=your_openrouter_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Start the API:

```bash
npm run dev
```

### 3. Configure the client

```bash
cd ../client
npm install
```

Create `client/.env`:

```env
VITE_FIREBASE_APIKEY=your_firebase_web_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Start the app:

```bash
npm run dev
```

Open **http://localhost:5173**.

> 🔧 **Local ports:** the client calls the API at `http://localhost:8000` (`ServerUrl` in `client/src/App.jsx`), and the server only allows CORS from `http://localhost:5173`. Set `PORT=8000` in `server/.env` (the server falls back to 6000 otherwise).

> 🔒 Never commit `.env` files. Both are already listed in `.gitignore`.

---

## ☁️ Deployment (Render)

1. **Backend** → create a _Web Service_ from the `server` folder
   - Build command: `npm install`
   - Start command: `node index.js`
   - Add the environment variables from the server `.env` section above.
2. **Frontend** → create a _Static Site_ from the `client` folder
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - Add `VITE_FIREBASE_APIKEY` and `VITE_RAZORPAY_KEY_ID`.
3. Update the production URLs:
   - Set `ServerUrl` in `client/src/App.jsx` (and other API calls) to your deployed backend URL.
   - Update the CORS `origin` in `server/index.js` to your deployed frontend URL.
   - For cross-site cookies in production, set `secure: true` and `sameSite: "none"` on the auth cookie in `auth.controller.js`.
   - Add your deployed domain to **Firebase → Authentication → Authorized domains**.
4. For a static site, add a rewrite rule `/* → /index.html` so React Router routes work on refresh.

---

## 🔐 Security Notes

- JWT stored in an HTTP cookie, verified by the `isAuth` middleware on protected routes
- Razorpay payments are verified server-side using an HMAC-SHA256 signature, and duplicate verification is ignored
- Resume uploads are limited to 5 MB and deleted from the server after text extraction
- Secrets live only in `.env` files

---

## 🔮 Future Improvements

- Verify the Firebase ID token on the server instead of trusting the client-sent name/email
- Restrict interview report/answer routes so users can only access their own interviews
- Rate limiting and input sanitisation for AI prompts
- More interview modes and question counts
- Automated tests and CI/CD

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome. Fork the repo, create a feature branch and open a pull request.

## 📄 License

No licence specified yet; add a `LICENSE` file (e.g. MIT) to define usage terms.
