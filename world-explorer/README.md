# 🌍 WORLD EXPLORER
> *“Learn the world. One country at a time.”*

An interactive, production-quality educational web application designed to teach users about world geography, sovereign nations, national flag symbolism, capitals, languages, beginner audio phrases, and cross-national comparisons.

Inspired by **National Geographic**, **Duolingo**, modern interactive atlases, and premium SaaS dashboards.

---

## ⚡ 5-Second Recruiter & Visitor Demo

Rather than reading paragraphs of text, visitors can immediately experience the entire educational loop directly from the homepage within **5 seconds**:

1. Click **Asia** (or any continent pill)
2. Select **🇯🇵 Japan**
3. Inspect **🚩 Flag Symbolism** ("Red circle represents the rising sun")
4. Listen to **🗣️ Japanese Greeting** (🔊 *Konnichiwa*)
5. Answer the **🎮 1-Click Instant Quiz** and trigger celebratory confetti!

---

## 🧭 Key Features & Architecture

### 1. Interactive TopoJSON World Map (`/explore`)
- Accurate geographical boundaries powered by **Natural Earth 110m TopoJSON** via `react-simple-maps`.
- Smooth pan and zoom controls (+, -, reset).
- Continent jump-filter pills (Africa, Asia, Europe, North America, South America, Oceania).
- Real-time country hover tooltips with flags, capitals, populations, and instant profile navigation.
- In-map search to highlight matching sovereign states.

### 2. Rich Sovereign Nation Profiles (`/countries/[slug]`)
Every country features 9 structured educational sections:
- **Overview**: Flag, official name, continent, subregion, ISO codes.
- **Flag Section**: *"Why does this flag look like this?"* with interactive element breakdown explaining documented historical and cultural symbolism.
- **Geography & Capital**: Coordinates, land area, population density, neighboring border nations.
- **Languages**: Strictly distinguished between **Official / Constitutional status** and **Widely spoken / recognized minority tongues**.
- **Beginner Phrases**: Categorized phrases (👋 Greetings, 🙏 Courtesy, 🍜 Food, 🧭 Travel, 🔢 Numbers, 🙂 Conversation) with Web Speech API audio synthesis and educational disclaimer.
- **Culture & Facts**: Verified factual milestones, UNESCO heritage sites, and global cultural contributions.
- **Related Nations**: Neighboring borders and continental peers.
- **Mastery Quiz**: Embedded quick check to record country mastery.

### 3. "Learn a Country in 60 Seconds" (`/learn` & `/learn/[slug]`)
- Guided 6-step Duolingo-style stepper with animated transitions (Framer Motion).
- Walks learners sequentially through: Continent → Flag → Capital → Language → Audio Greeting → Quick Check Quiz.
- Completion celebration screen with confetti and instant progress tracking.

### 4. Interactive Games Suite (`/games`)
- **🚩 National Flag Quiz (`/games/flag-quiz`)**: Identify countries by flag with difficulty levels (Easy, Medium, Hard), streak tracking, timer toggle, and answer explanations.
- **🏙️ Country & Capital Trivia (`/games/country-quiz`)**: Multi-format quiz covering capitals, continents, languages, and True/False questions.
- **🃏 3D Flag Memory Match (`/games/memory`)**: 3D flip card matching pairs of flags and country names with moves counter, timer, and score.
- **🧩 Continent Sorter (`/games/continents`)**: Drag-and-drop or tap placement of nations into 6 continental drop zones with instant feedback.

### 5. Country Comparison Tool (`/compare`)
- Select two countries side-by-side (e.g., 🇮🇳 India vs. 🇯🇵 Japan).
- Comparative overview of capitals, population, land area, currency, languages, *"How do you say hello?"*, and flag symbolism without arbitrary or competitive rankings.

### 6. Daily World Challenge (`/daily-challenge`)
- One curated geography question per calendar day.
- Daily streak tracker and *"Did you know?"* educational insights.

### 7. Spaced Repetition & Progress Dashboard (`/progress`)
- Anonymous browser `localStorage` persistence with reactive cross-component synchronization.
- Real-time metrics: Countries learned, Flags mastered, Continents explored, Quiz accuracy (%).
- **Automated Spaced Repetition**: Difficult countries are scheduled into the *"Review Today"* queue based on incorrect quiz answers.
- **Weak Areas Tracker**: Highlights countries with lower recognition accuracy.
- **Achievement Badges**: Sophisticated milestone badges (World Explorer, Vexillologist, Cartographer, Polyglot Scout, etc.).

### 8. Global Search (`Cmd+K` / `Ctrl+K`)
- Instant debounced command palette searching countries, capitals, continents, and languages.

### 9. Design System & Accessibility
- Clean light mode with subtle gradients and soft shadows.
- High-contrast dark mode respecting system preferences without Flash of Unstyled Content (FOUC).
- Mobile-first responsive layouts with drawer navigation.
- Semantic HTML5, visible focus states, ARIA labels, and reduced-motion support.

---

## 📊 Data Methodology

The application explicitly documents its country roster methodology:
> **195 countries based on 193 United Nations Member States plus 2 UN General Assembly Observer States (the Holy See and the State of Palestine).**

Geographic boundaries are sourced directly from Natural Earth public domain map datasets.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm 9+

### Installation
```bash
# Navigate to the project directory
cd world-explorer

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser. (Port 3001 is used to avoid conflict with the root portfolio running on port 3000).

### Production Build
```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components & Client Hooks)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Cartography**: [react-simple-maps](https://www.react-simple-maps.io/) & [world-atlas](https://github.com/topojson/world-atlas) (Natural Earth 110m TopoJSON)
- **Celebrations**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Speech**: Browser Web Speech API (`SpeechSynthesisUtterance`)

---

## 🔮 Extensibility & Roadmap

The codebase is strictly typed and normalized:
- **Authentication**: `useLearningProgress` is isolated in `src/lib/store.ts` and can be switched from `localStorage` to a Supabase/Firebase backend with minimal changes.
- **Additional Data**: Countries, continents, and languages are defined in standalone normalized files under `src/data/`, keeping logic decoupled from UI components.
- **Audio Upgrade**: The `AudioButton` component can easily point to native audio recordings or CDN sound files while falling back to Web Speech synthesis.
