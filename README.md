# 🎩 Lord Chatterley

> **Note**: This repository has been archived and is preserved for historical reference.

**Lord Chatterley** is an interactive AI chat application built with **Astro** and deployed on **Cloudflare Pages**. It features a custom AI persona—a very posh gentleman who reluctantly answers user questions with humorous aristocrat condescension—powered by Cloudflare Workers AI streaming model.

---

## ✨ Features

- **Posh Gentleman AI Persona**: Powered by Cloudflare Workers AI running `@hf/thebloke/mistral-7b-instruct-v0.1-awq`.
- **Real-time Streaming**: EventStream / SSE (`sse.js`) streaming API for real-time AI response rendering.
- **WorkOS Authentication**: User authentication flow using WorkOS AuthKit, `@workos-inc/node`, `iron-session`, and middleware session validation.
- **Modern UI**: Styled with [Shoelace Web Components](https://shoelace.style/) and Pure.css grid layouts.
- **Serverless Edge Architecture**: Configured with `@astrojs/cloudflare` for SSR deployment on Cloudflare Pages.

---

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) (SSR mode)
- **Deployment Platform**: [Cloudflare Pages](https://pages.cloudflare.com/) + Cloudflare Workers AI (`env.AI`)
- **UI Components**: Shoelace UI, Pure.css
- **Authentication**: WorkOS Node SDK (`@workos-inc/node`), `iron-session`, `jose`
- **Streaming**: `sse.js` (Server-Sent Events)

---

## 🔑 Environment Variables

To run the application locally or deploy it to Cloudflare Pages, the following environment variables are required:

| Variable | Description |
| :--- | :--- |
| `WORKOS_API_KEY` | WorkOS Secret API Key |
| `WORKOS_CLIENT_ID` | WorkOS Client ID |
| `WORKOS_COOKIE_PASSWORD` | Encryption secret for `iron-session` cookies (min 32 chars) |

---

## 🧞 Local Development & Commands

```bash
# Install dependencies
npm install

# Generate Cloudflare Worker types
npm run cf-typegen

# Start local development server
npm run dev

# Preview with Wrangler Cloudflare Pages local bindings (Workers AI)
npm run preview

# Build for production
npm run build
```

---

## 📜 License

This project is open source and available under the MIT License.
