# Wayvo — Morocco's Premium AI Travel Companion

A modern, mobile-first React application for discovering and booking Morocco travel experiences, powered by AI.

## Features

- **AI Travel Assistant** — Chat with Wayvo AI for instant, multilingual travel advice
- **Human Specialists** — Connect with certified Moroccan travel experts
- **Smart Search** — Filter by category, city, price, and sort options
- **Itinerary Builder** — AI-generated day-by-day travel plans
- **Wishlist** — Save experiences with localStorage persistence
- **Booking Flow** — Multi-step booking with guest selection and payment
- **Emergency Help** — Offline-ready emergency contacts and guides
- **Partner Portal** — Dashboard for hotels, guides, and tour operators

## Tech Stack

- React 19 (Hooks, Context-free state management)
- CSS Custom Properties (design system)
- Recharts (analytics charts)
- Anthropic Claude API (AI chat)
- localStorage (data persistence)

## Quick Start

```bash
# 1. Clone and install
cd wayvo-app
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env and add your Anthropic API key

# 3. Start development
npm start

# 4. Build for production
npm run build
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Environment Variables
| Variable | Required | Description |
|----------|----------|-------------|
| `REACT_APP_ANTHROPIC_API_KEY` | Yes | Claude API key for AI chat |

## Project Structure

```
wayvo-app/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # Reusable UI (Logo, Card, Pill, etc.)
│   │   ├── home/       # Home tab
│   │   ├── search/     # Search & filter
│   │   ├── booking/    # Booking flow
│   │   ├── chat/       # AI & agent chat
│   │   ├── plan/       # Itinerary builder
│   │   ├── support/    # Help & emergency
│   │   ├── profile/    # User profile
│   │   ├── wishlist/   # Saved items
│   │   ├── packages/   # Multi-day tours
│   │   ├── partner/    # Partner portal
│   │   └── onboarding/ # User onboarding
│   ├── data/           # Static data (items, agents, etc.)
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Helpers & constants
│   ├── styles/         # CSS variables & animations
│   ├── App.js          # Main app component
│   └── index.js        # Entry point
├── .env.example        # Environment template
├── vercel.json         # Vercel config
├── netlify.toml        # Netlify config
└── package.json
```

## Key Improvements Over Original

1. **Fixed critical bugs:**
   - Added CSS custom properties (was undefined, breaking UI)
   - Replaced `window.storage` with `localStorage` (was non-existent API)
   - Added proper Anthropic API headers (was missing auth)
   - Fixed model name to current `claude-sonnet-4-6`

2. **Architecture:**
   - Split monolithic component into 20+ focused components
   - Added custom hooks for debounce, click-outside, scroll
   - Centralized constants and data

3. **Performance:**
   - React.memo on Card components
   - Debounced search (200ms)
   - useMemo for filtered results

4. **Accessibility:**
   - aria-labels on all interactive elements
   - role attributes for screen readers
   - focus-visible styles
   - Semantic HTML (article, nav, button)

5. **UX:**
   - Loading states for AI operations
   - Toast notifications
   - Empty states
   - Error handling with user-friendly messages

## License

MIT
