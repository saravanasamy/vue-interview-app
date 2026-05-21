# Vue Interview Prep ⚡

A Vue 3 interview Q&A app covering 25 questions from Beginner to Advanced — each with detailed explanations and real code examples.

![Vue](https://img.shields.io/badge/Vue-3.4-42b883?logo=vuedotjs) ![Pinia](https://img.shields.io/badge/Pinia-2.1-ffd859?logo=pinia) ![Vite](https://img.shields.io/badge/Vite-5.0-646cff?logo=vite)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/saravanasamy/vue-interview-app.git

# 2. Navigate into the project
cd vue-interview-app

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📚 Topics Covered

| Category | Questions |
|---|---|
| 📘 Basics | What is Vue, Virtual DOM, ref vs reactive |
| 🎯 Directives | v-if/v-show, v-for/:key, v-model, all directives |
| ⚙️ Composition API | Lifecycle hooks, computed vs watch, composables, Options vs Composition |
| 🧩 Components | Props/emits, slots (default, named, scoped) |
| 🗂️ State (Pinia) | Pinia intro, storeToRefs, $patch, $subscribe, Options vs Setup store, localStorage persistence |
| 🗺️ Vue Router | Routes, params, navigation guards |
| 🚀 Advanced | provide/inject, keep-alive, Teleport, Suspense, performance |

---

## 🛠️ Tech Stack

- **Vue 3** — Composition API (`<script setup>`) throughout
- **Pinia** — state management (progress tracking store)
- **Vue Router v4** — client-side routing
- **Vite** — build tool and dev server

---

## ✨ Features

- 🔍 Search questions by keyword
- 🏷️ Filter by category and difficulty
- ✅ Track which questions you've viewed (saved to localStorage)
- 🔖 Bookmark questions to review later
- 📊 Live progress bar (Pinia store)
- ⬅️ ➡️ Prev/Next navigation between questions
- 📋 Copy code examples to clipboard

---

## 📁 Project Structure

```
src/
├── main.js                  # App entry — installs Pinia + Vue Router
├── App.vue                  # Root layout (header, router-view, footer)
├── router/
│   └── index.js             # Route definitions
├── stores/
│   └── progressStore.js     # Pinia store — viewed/bookmarked questions
├── composables/
│   └── useLocalStorage.js   # Custom composable — syncs ref to localStorage
├── data/
│   └── questions.js         # All 25 questions with answers and code examples
├── pages/
│   ├── HomePage.vue         # Question grid with search/filter
│   ├── QuestionDetailPage.vue  # Full answer + code example
│   └── AboutPage.vue        # App info
└── components/
    ├── QuestionCard.vue     # Card with viewed/bookmarked badges
    ├── SearchBar.vue        # v-model custom component
    ├── CategoryFilter.vue   # Category pill buttons
    └── StatsBar.vue         # Progress stats from Pinia store
```
