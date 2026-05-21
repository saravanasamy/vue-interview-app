<template>
  <div class="stats-bar">
    <div class="stat">
      <span class="stat-num">{{ total }}</span>
      <span class="stat-label">Total Questions</span>
    </div>
    <div class="stat">
      <span class="stat-num beginner">{{ beginnerCount }}</span>
      <span class="stat-label">Beginner</span>
    </div>
    <div class="stat">
      <span class="stat-num intermediate">{{ intermediateCount }}</span>
      <span class="stat-label">Intermediate</span>
    </div>
    <div class="stat">
      <span class="stat-num advanced">{{ advancedCount }}</span>
      <span class="stat-label">Advanced</span>
    </div>
    <!-- Pinia: live progress from progressStore -->
    <div class="stat progress-stat">
      <span class="stat-num progress">{{ viewedCount }}/{{ total }}</span>
      <span class="stat-label">Viewed</span>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: completionPercent + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { questions } from '../data/questions.js'
import { useProgressStore } from '../stores/progressStore.js'

const total = questions.length
const beginnerCount = computed(() => questions.filter(q => q.difficulty === 'beginner').length)
const intermediateCount = computed(() => questions.filter(q => q.difficulty === 'intermediate').length)
const advancedCount = computed(() => questions.filter(q => q.difficulty === 'advanced').length)

// Pinia store — read progress stats reactively via storeToRefs
const progressStore = useProgressStore()
const { viewedCount, completionPercent } = storeToRefs(progressStore)
</script>

<style scoped>
.stats-bar {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-num {
  font-size: 28px;
  font-weight: 800;
  color: #42b883;
  line-height: 1;
}

.stat-num.beginner   { color: #065f46; }
.stat-num.intermediate { color: #92400e; }
.stat-num.advanced   { color: #991b1b; }

.stat-label {
  font-size: 12px;
  color: #888;
  font-weight: 500;
}

.progress-stat {
  min-width: 90px;
}

.stat-num.progress { color: #6366f1; }

.progress-bar {
  width: 80px;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 4px;
}

.progress-fill {
  height: 100%;
  background: #6366f1;
  border-radius: 2px;
  transition: width 0.4s ease;
}
</style>
