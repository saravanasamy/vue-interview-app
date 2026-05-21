<template>
  <div class="detail-page">
    <!-- Back button -->
    <RouterLink to="/" class="back-btn">← Back to Questions</RouterLink>

    <!-- Not found -->
    <div v-if="!question" class="not-found">
      <p>Question not found.</p>
      <RouterLink to="/">Go Home</RouterLink>
    </div>

    <template v-else>
      <!-- Header -->
      <div class="detail-header">
        <div class="badges">
          <span class="category-badge">{{ categoryLabel }}</span>
          <span class="difficulty-badge" :class="question.difficulty">
            {{ question.difficulty }}
          </span>
          <span class="q-number">Q{{ question.id }} of {{ totalQuestions }}</span>
          <span v-if="isViewed" class="viewed-badge">✓ Viewed</span>
        </div>
        <h1>{{ question.question }}</h1>
        <p class="short-answer">💡 {{ question.shortAnswer }}</p>
      </div>

      <!-- Answer -->
      <div class="answer-section">
        <h2>📖 Detailed Answer</h2>
        <div class="answer-text" v-html="formattedAnswer"></div>
      </div>

      <!-- Code Example -->
      <div class="code-section" v-if="question.code">
        <h2>💻 Code Example</h2>
        <div class="code-header">
          <span class="code-lang">Vue 3 — Composition API</span>
          <div class="code-actions">
            <button @click="toggleBookmark" class="bookmark-btn" :class="{ bookmarked: isBookmarked }">
              {{ isBookmarked ? '🔖 Bookmarked' : '🔖 Bookmark' }}
            </button>
            <button @click="copyCode" class="copy-btn">
              {{ copied ? '✅ Copied!' : '📋 Copy' }}
            </button>
          </div>
        </div>
        <pre class="code-block"><code>{{ question.code }}</code></pre>
      </div>

      <!-- Navigation -->
      <div class="nav-section">
        <RouterLink v-if="prevQuestion" :to="`/question/${prevQuestion.id}`" class="nav-btn prev">
          ← Q{{ prevQuestion.id }}: {{ truncate(prevQuestion.question, 50) }}
        </RouterLink>
        <RouterLink v-if="nextQuestion" :to="`/question/${nextQuestion.id}`" class="nav-btn next">
          Q{{ nextQuestion.id }}: {{ truncate(nextQuestion.question, 50) }} →
        </RouterLink>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { questions, categories } from '../data/questions.js'
import { useProgressStore } from '../stores/progressStore.js'

const route = useRoute()
const copied = ref(false)

// Pinia store — tracks which questions are viewed and bookmarked
const progressStore = useProgressStore()

// storeToRefs() keeps reactive getters reactive when destructured (see Q21)
const { isViewed: isViewedFn, isBookmarked: isBookmarkedFn } = storeToRefs(progressStore)

const question = computed(() =>
  questions.find(q => q.id === Number(route.params.id))
)

// Computed booleans for the current question's state in the store
const isViewed = computed(() => question.value ? isViewedFn.value(question.value.id) : false)
const isBookmarked = computed(() => question.value ? isBookmarkedFn.value(question.value.id) : false)

const totalQuestions = questions.length

// Mark as viewed when the page loads — demonstrates onMounted + Pinia action
onMounted(() => {
  if (question.value) progressStore.markViewed(question.value.id)
})

// Category display label
const categoryLabel = computed(() => {
  if (!question.value) return ''
  const cat = categories.find(c => c.id === question.value.category)
  return cat ? cat.label : question.value.category
})

// Prev/Next navigation
const currentIndex = computed(() =>
  questions.findIndex(q => q.id === Number(route.params.id))
)
const prevQuestion = computed(() =>
  currentIndex.value > 0 ? questions[currentIndex.value - 1] : null
)
const nextQuestion = computed(() =>
  currentIndex.value < questions.length - 1 ? questions[currentIndex.value + 1] : null
)

// Format answer: bold **text**, line breaks
const formattedAnswer = computed(() => {
  if (!question.value) return ''
  return question.value.answer
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code class="inline-code">$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
})

function truncate(str, len) {
  return str.length > len ? str.slice(0, len) + '...' : str
}

async function copyCode() {
  if (!question.value?.code) return
  await navigator.clipboard.writeText(question.value.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

// Pinia action — toggles bookmark for the current question
function toggleBookmark() {
  if (question.value) progressStore.toggleBookmark(question.value.id)
}
</script>

<style scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 860px;
}

.back-btn {
  color: #42b883;
  font-weight: 600;
  text-decoration: none;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: gap 0.2s;
}

.back-btn:hover { gap: 8px; }

.detail-header {
  background: linear-gradient(135deg, #e8f5e9, #f0fff4);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #c6f6d5;
}

.badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  align-items: center;
}

.category-badge {
  background: #e8f5e9;
  color: #2d6a4f;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
}

.difficulty-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  text-transform: uppercase;
}

.difficulty-badge.beginner    { background: #d1fae5; color: #065f46; }
.difficulty-badge.intermediate { background: #fef3c7; color: #92400e; }
.difficulty-badge.advanced    { background: #fee2e2; color: #991b1b; }

.q-number {
  font-size: 12px;
  color: #888;
  margin-left: auto;
}

.viewed-badge {
  background: #d1fae5;
  color: #065f46;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
}

.detail-header h1 {
  font-size: 22px;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.short-answer {
  font-size: 15px;
  color: #4a5568;
  background: #fff;
  border-left: 4px solid #42b883;
  padding: 12px 16px;
  border-radius: 0 8px 8px 0;
  margin: 0;
}

.answer-section, .code-section {
  background: #fff;
  border-radius: 12px;
  padding: 28px;
  border: 1px solid #e8e8e8;
}

.answer-section h2, .code-section h2 {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 18px 0;
}

.answer-text {
  font-size: 15px;
  line-height: 1.8;
  color: #333;
}

.answer-text :deep(p) { margin: 0 0 12px 0; }
.answer-text :deep(strong) { color: #1a1a2e; font-weight: 700; }
.answer-text :deep(.inline-code) {
  background: #f0f0f0;
  padding: 1px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #d63384;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1a1a2e;
  padding: 10px 16px;
  border-radius: 8px 8px 0 0;
}

.code-lang {
  font-size: 12px;
  color: #42b883;
  font-weight: 600;
}

.code-actions {
  display: flex;
  gap: 8px;
}

.copy-btn, .bookmark-btn {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #ccc;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: rgba(66, 184, 131, 0.2);
  color: #42b883;
}

.bookmark-btn:hover {
  background: rgba(251, 191, 36, 0.2);
  color: #f59e0b;
}

.bookmark-btn.bookmarked {
  background: rgba(251, 191, 36, 0.15);
  color: #f59e0b;
  border-color: rgba(251, 191, 36, 0.4);
}

.code-block {
  background: #0d0d1a;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 0 0 8px 8px;
  overflow-x: auto;
  font-family: 'Courier New', Consolas, monospace;
  font-size: 13px;
  line-height: 1.7;
  white-space: pre;
  margin: 0;
}

.nav-section {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding-top: 8px;
  border-top: 1px solid #e8e8e8;
}

.nav-btn {
  text-decoration: none;
  background: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  padding: 12px 18px;
  font-size: 13px;
  font-weight: 600;
  color: #42b883;
  transition: all 0.2s;
  max-width: 48%;
  line-height: 1.4;
}

.nav-btn:hover {
  border-color: #42b883;
  background: #f0fff4;
}

.nav-btn.next { margin-left: auto; text-align: right; }

.not-found {
  text-align: center;
  padding: 60px;
  color: #888;
}
</style>
