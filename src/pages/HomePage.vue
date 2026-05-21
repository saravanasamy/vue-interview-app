<template>
  <div class="home-page">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-text">
        <h2>Vue JS Interview Questions</h2>
        <p>20 questions from Beginner to Advanced — each with clear explanations and code examples.</p>
        <StatsBar />
      </div>
    </section>

    <!-- Controls -->
    <section class="controls">
      <SearchBar v-model="searchQuery" />
      <CategoryFilter v-model="activeCategory" />
    </section>

    <!-- Results info -->
    <div class="results-info" v-if="searchQuery || activeCategory !== 'all'">
      <span>Showing <strong>{{ filteredQuestions.length }}</strong> of {{ questions.length }} questions</span>
      <button v-if="searchQuery || activeCategory !== 'all'" @click="clearFilters" class="clear-filters">
        Clear filters ✕
      </button>
    </div>

    <!-- Question Grid -->
    <section class="question-grid" v-if="filteredQuestions.length > 0">
      <QuestionCard
        v-for="question in filteredQuestions"
        :key="question.id"
        :question="question"
      />
    </section>

    <!-- Empty state -->
    <div class="empty-state" v-else>
      <p>😕 No questions found for "<strong>{{ searchQuery }}</strong>"</p>
      <button @click="clearFilters" class="btn-primary">Show all questions</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { questions } from '../data/questions.js'
import QuestionCard from '../components/QuestionCard.vue'
import SearchBar from '../components/SearchBar.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import StatsBar from '../components/StatsBar.vue'

// Reactive state — Vue tracks these and re-renders when they change
const searchQuery = ref('')
const activeCategory = ref('all')

// computed — filters only when searchQuery or activeCategory changes
const filteredQuestions = computed(() => {
  return questions.filter(q => {
    const matchesCategory = activeCategory.value === 'all' || q.category === activeCategory.value
    const matchesSearch = !searchQuery.value ||
      q.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      q.shortAnswer.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

function clearFilters() {
  searchQuery.value = ''
  activeCategory.value = 'all'
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.hero {
  background: linear-gradient(135deg, #e8f5e9 0%, #f0fff4 100%);
  border-radius: 16px;
  padding: 36px 40px;
  border: 1px solid #c6f6d5;
}

.hero h2 {
  font-size: 28px;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 8px 0;
}

.hero p {
  font-size: 16px;
  color: #4a5568;
  margin: 0 0 24px 0;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.results-info {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: #666;
}

.clear-filters {
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 13px;
  cursor: pointer;
  color: #888;
  transition: all 0.2s;
}

.clear-filters:hover {
  border-color: #e53e3e;
  color: #e53e3e;
}

.question-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #888;
}

.empty-state p {
  font-size: 18px;
  margin-bottom: 20px;
}

.btn-primary {
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #2d9c6e;
}
</style>
