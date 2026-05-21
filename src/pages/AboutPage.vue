<template>
  <div class="about-page">
    <h2>About This App</h2>

    <div class="about-card">
      <h3>🎯 Purpose</h3>
      <p>
        This app is built to help you <strong>learn Vue JS</strong> and
        <strong>prepare for interviews</strong> at the same time. Every Vue concept
        used to build this app is also explained as a question in the Q&amp;A.
      </p>
    </div>

    <div class="about-card">
      <h3>💚 Built With Vue 3</h3>
      <p>This app itself demonstrates the Vue concepts you're learning:</p>
      <ul>
        <li v-for="concept in concepts" :key="concept.name" class="concept-item">
          <span class="concept-icon">{{ concept.icon }}</span>
          <div>
            <strong>{{ concept.name }}</strong>
            <span class="concept-desc">— {{ concept.desc }}</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="about-card">
      <h3>📚 Topics Covered</h3>
      <div class="topic-grid">
        <div v-for="cat in categories" :key="cat.id" class="topic-chip">
          {{ cat.label }}
        </div>
      </div>
    </div>

    <div class="about-card tip-card">
      <h3>💡 How to use this app</h3>
      <ol>
        <li>Browse questions on the <RouterLink to="/">Home page</RouterLink></li>
        <li>Use the <strong>search bar</strong> to find a specific topic</li>
        <li>Filter by <strong>category</strong> to focus on one area</li>
        <li>Click any question to read the <strong>full answer + code</strong></li>
        <li>Use <strong>← →</strong> navigation to go through questions in order</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { categories } from '../data/questions.js'

const concepts = [
  { icon: '⚙️', name: 'Composition API', desc: 'script setup used in every component' },
  { icon: '🔄', name: 'ref + computed', desc: 'reactive search and category filtering' },
  { icon: '🗺️', name: 'Vue Router', desc: 'navigation between home and detail pages' },
  { icon: '🍍', name: 'Pinia', desc: 'progressStore tracks viewed/bookmarked questions' },
  { icon: '🔑', name: 'storeToRefs', desc: 'destructures store state while keeping reactivity' },
  { icon: '🧩', name: 'Components', desc: 'QuestionCard, SearchBar, CategoryFilter, StatsBar' },
  { icon: '📤', name: 'Props + Emits', desc: 'v-model on SearchBar and CategoryFilter' },
  { icon: '🎯', name: 'Directives', desc: 'v-for, v-if, v-model used throughout' },
  { icon: '🔗', name: 'RouterLink', desc: 'navigation without page reload' },
  { icon: '🎨', name: 'Scoped CSS', desc: 'styles isolated per component' },
  { icon: '🪝', name: 'Composables', desc: 'useLocalStorage wraps localStorage with reactivity' },
]
</script>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 700px;
}

.about-page h2 {
  font-size: 26px;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0;
}

.about-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e8e8e8;
}

.about-card h3 {
  font-size: 17px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 14px 0;
}

.about-card p, .about-card li {
  font-size: 14px;
  color: #555;
  line-height: 1.7;
}

.about-card ul, .about-card ol {
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.about-card ol {
  counter-reset: steps;
  list-style: none;
}

.about-card ol li {
  counter-increment: steps;
  padding-left: 28px;
  position: relative;
}

.about-card ol li::before {
  content: counter(steps);
  position: absolute;
  left: 0;
  top: 1px;
  background: #42b883;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.concept-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.concept-icon {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}

.concept-desc {
  color: #888;
  font-weight: 400;
}

.topic-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.topic-chip {
  background: #e8f5e9;
  color: #2d6a4f;
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.tip-card {
  background: #f0fff4;
  border-color: #c6f6d5;
}

.tip-card a {
  color: #42b883;
  font-weight: 600;
}
</style>
