<template>
  <RouterLink :to="`/question/${question.id}`" class="card-link">
    <div class="question-card" :class="`difficulty-${question.difficulty}`">
      <div class="card-top">
        <span class="category-badge">{{ categoryLabel }}</span>
        <span class="difficulty-badge" :class="question.difficulty">
          {{ question.difficulty }}
        </span>
      </div>

      <h3 class="card-question">{{ question.question }}</h3>

      <p class="card-short-answer">{{ question.shortAnswer }}</p>

      <div class="card-footer">
        <span class="read-more">Read Answer →</span>
        <div class="card-badges">
          <span v-if="isViewed" class="card-viewed">✓</span>
          <span v-if="isBookmarked" class="card-bookmarked">🔖</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { categories } from '../data/questions.js'
import { useProgressStore } from '../stores/progressStore.js'

const props = defineProps({
  question: { type: Object, required: true },
})

const categoryLabel = computed(() => {
  const cat = categories.find(c => c.id === props.question.category)
  return cat ? cat.label : props.question.category
})

// Read progress from Pinia store
const progressStore = useProgressStore()
const { isViewed: isViewedFn, isBookmarked: isBookmarkedFn } = storeToRefs(progressStore)

const isViewed = computed(() => isViewedFn.value(props.question.id))
const isBookmarked = computed(() => isBookmarkedFn.value(props.question.id))
</script>

<style scoped>
.card-link {
  text-decoration: none;
  display: block;
}

.question-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e8f5e9;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
}

.question-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(66, 184, 131, 0.15);
  border-color: #42b883;
}

.card-top {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.category-badge {
  background: #e8f5e9;
  color: #2d6a4f;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
}

.difficulty-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.difficulty-badge.beginner {
  background: #d1fae5;
  color: #065f46;
}

.difficulty-badge.intermediate {
  background: #fef3c7;
  color: #92400e;
}

.difficulty-badge.advanced {
  background: #fee2e2;
  color: #991b1b;
}

.card-question {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.4;
  margin: 0;
}

.card-short-answer {
  font-size: 13px;
  color: #555;
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

.card-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.read-more {
  font-size: 13px;
  color: #42b883;
  font-weight: 600;
}

.card-badges {
  display: flex;
  gap: 4px;
  align-items: center;
}

.card-viewed {
  background: #d1fae5;
  color: #065f46;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
}

.card-bookmarked {
  font-size: 13px;
}
</style>
