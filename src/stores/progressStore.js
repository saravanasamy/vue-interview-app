import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { questions } from '../data/questions.js'

/**
 * progressStore — tracks which questions the user has viewed and bookmarked.
 *
 * Uses the Composition-API style of defineStore (recommended in Vue 3).
 * State is persisted to localStorage so progress survives page refresh.
 *
 * Interview concept: This store demonstrates:
 *  - defineStore with setup syntax
 *  - ref() for state
 *  - computed() for getters
 *  - Actions (plain functions)
 *  -  for side effects (auto-save to localStorage)
 */
export const useProgressStore = defineStore('progress', () => {
  // ── STATE ──────────────────────────────────────────────────────
  // Load persisted data from localStorage on startup
  const _savedViewed = JSON.parse(localStorage.getItem('viewed_ids') || '[]')
  const _savedBookmarks = JSON.parse(localStorage.getItem('bookmark_ids') || '[]')

  const viewedIds = ref(new Set(_savedViewed))
  const bookmarkIds = ref(new Set(_savedBookmarks))

  // ── GETTERS (computed) ─────────────────────────────────────────
  const viewedCount = computed(() => viewedIds.value.size)

  const bookmarkCount = computed(() => bookmarkIds.value.size)

  const completionPercent = computed(() =>
    Math.round((viewedIds.value.size / questions.length) * 100)
  )

  const isViewed = computed(() => (id) => viewedIds.value.has(id))

  const isBookmarked = computed(() => (id) => bookmarkIds.value.has(id))

  const bookmarkedQuestions = computed(() =>
    questions.filter(q => bookmarkIds.value.has(q.id))
  )

  // ── ACTIONS ────────────────────────────────────────────────────
  function markViewed(id) {
    viewedIds.value = new Set([...viewedIds.value, id])
    persist()
  }

  function toggleBookmark(id) {
    const next = new Set(bookmarkIds.value)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    bookmarkIds.value = next
    persist()
  }

  function resetProgress() {
    viewedIds.value = new Set()
    bookmarkIds.value = new Set()
    persist()
  }

  // ── INTERNAL: persist to localStorage ─────────────────────────
  function persist() {
    localStorage.setItem('viewed_ids', JSON.stringify([...viewedIds.value]))
    localStorage.setItem('bookmark_ids', JSON.stringify([...bookmarkIds.value]))
  }

  return {
    viewedIds,
    bookmarkIds,
    viewedCount,
    bookmarkCount,
    completionPercent,
    isViewed,
    isBookmarked,
    bookmarkedQuestions,
    markViewed,
    toggleBookmark,
    resetProgress,
  }
})
