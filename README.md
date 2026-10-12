<div align="center">

![Alpha Backend Banner](assets/banner.svg)

# Alpha Backend — Real Estate Lead Ingestion & Cloudflare Turnstile Protected API

A high-throughput notification and contact inquiry microservice built for the **Uenal Immobilien** real estate ecosystem. Engineered with **Node.js**, **Express 5**, **TypeScript (ES Modules)**, **Cloudflare Turnstile token validation**, and **Nodemailer responsive HTML generation**.

[![Express.js](https://img.shields.io/badge/Express.js-5.x-black?style=for-the-badge&logo=express)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x_ESM-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Cloudflare Turnstile](https://img.shields.io/badge/Cloudflare-Turnstile_Verification-F38020?style=for-the-badge&logo=cloudflare)](https://developers.cloudflare.com/turnstile/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-HTML_Engine-009688?style=for-the-badge)](https://nodemailer.com/)
[![License](https://img.shields.io/badge/License-ISC-green?style=for-the-badge)](LICENSE)

</div>

---

## 🌟 Overview

**Alpha Backend** provides the critical security and notification bridge for luxury property websites across the Uenal Group (including `uenal-immobilien.de`, `uenal-fm.de`, and `uenal-gutachten.de`). It intercepts incoming consultation bookings, seller evaluation leads, and inquiry forms, verifies the client's Cloudflare Turnstile token to prevent spam, formats the submission into branded responsive HTML emails, and dispatches them instantly to the appropriate brokerage department.

Paired with [`alba_frontend`](https://github.com/shahjalal-labs/alba_frontend), it completes the lead intake architecture.

---

## 🚀 Key Features & Capabilities

- 🛡️ **Server-Side Cloudflare Turnstile Validation**: Cryptographic verification of client challenges with Cloudflare's siteverify API endpoint.
- ✉️ **Responsive HTML Email Generator**: Specialized email templates tailored for property valuation requests, seller inquiries, and general consultations.
- ⚡ **Express 5 & ES Modules Performance**: Built on modern ECMAScript module standards and Express 5 routing.
- 🌐 **Strict Multi-Origin CORS Security**: Granular origin filtering safeguarding enterprise real estate domains.
- 🚀 **Serverless & Container Ready**: Optimized for fast cold-starts on Vercel Serverless or Docker microservice deployments.

---

## 🏛️ System Architecture

```
[ Real Estate Leads & Buyers ]
               │
               ▼
[ Alba Frontend (Turnstile Client Challenge) ]
               │
               ▼ (POST Inquiries with Turnstile Token)
      [ Alpha Backend API Gateway ]
               │
               ├──► [ Cloudflare Turnstile Verification API ]
               │          │ (Validated)
               │          ▼
               └──► [ Nodemailer HTML Generation Engine ]
                          │
                          ▼ (SMTP Gateway)
               [ Licensed Real Estate Brokers ]
```

---

## 📁 Repository Structure

```
alpha_backend/
├── assets/
│   └── banner.svg                  # Architectural SVG project banner
├── src/
│   ├── app/
│   │   └── contact.route.ts        # Lead ingestion endpoints & validation logic
│   ├── services/
│   │   ├── verifyTurnstile.ts      # Cloudflare Turnstile token validation
│   │   ├── sendFormInfo.ts         # Nodemailer SMTP transport service
│   │   ├── inquieryFormHtml.ts     # Valuation inquiry HTML template
│   │   ├── messageFormHtml.ts      # General contact message template
│   │   ├── opinionHtml.ts          # Feedback & customer evaluation template
│   │   ├── thirdMessageFormHtml.ts # Property inspection template
│   │   └── formHtml.ts             # Base styling layout for outgoing emails
│   ├── app.ts                      # Express 5 application setup & CORS configuration
│   └── server.ts                   # HTTP listener entrypoint
├── .env.example                    # Sanitized environment configuration template
├── package.json                    # Project dependencies (Express 5, Nodemailer)
├── tsconfig.json                   # Strict TypeScript compiler options
└── vercel.json                     # Serverless deployment configuration
```

---

## 💻 Tech Stack Specification

| Domain | Selected Technologies |
| :--- | :--- |
| **Framework** | Express.js 5.0 (ES Modules) |
| **Language & Runtime** | Node.js (LTS), TypeScript 5.9 |
| **Bot Protection** | Cloudflare Turnstile Server Verification API |
| **Email Gateway** | Nodemailer (SMTP Transport) |
| **Cross-Origin Security** | CORS Middleware with domain whitelisting |

---

## 🛠️ Getting Started & Local Development

### Prerequisites

- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm`, `yarn`, or `pnpm`

### 1. Clone the Repository

```bash
git clone https://github.com/shahjalal-labs/alpha_backend.git
cd alpha_backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@example.com
SMTP_PASS=your_smtp_password
TURNSTILE_SECRET_KEY=your_cloudflare_turnstile_secret
```

### 4. Run Development Server

```bash
npm run dev
```

The API will be available at [http://localhost:5000](http://localhost:5000).

---

## 👨‍💻 Engineering & Authorship

Developed and engineered by **Md. Shahjalal**.

- **GitHub**: [@shahjalal-labs](https://github.com/shahjalal-labs)
- **Email**: [muhommodshahjalal@gmail.com](mailto:muhommodshahjalal@gmail.com)

---

## 📄 License

This project is open-source and available under the [ISC License](LICENSE).
