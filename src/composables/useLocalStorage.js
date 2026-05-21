import { ref, watch } from 'vue'

/**
 * useLocalStorage — a composable that syncs a ref to localStorage.
 *
 * Interview concept: This is a real-world composable that:
 *  - Reads initial value from localStorage (with JSON parse + fallback)
 *  - Watches the ref and auto-saves on every change
 *  - Generic: works with any JSON-serialisable value
 *
 * Usage:
 *   const theme = useLocalStorage('theme', 'light')
 *   theme.value = 'dark'  // auto-saved to localStorage
 */
export function useLocalStorage(key, defaultValue) {
  // Try to read from storage, fall back to defaultValue
  function read() {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? JSON.parse(raw) : defaultValue
    } catch {
      return defaultValue
    }
  }

  const data = ref(read())

  // Auto-save whenever the ref changes
  watch(
    data,
    (newVal) => {
      try {
        localStorage.setItem(key, JSON.stringify(newVal))
      } catch (e) {
        console.warn('useLocalStorage: failed to save', key, e)
      }
    },
    { deep: true }
  )

  return data
}
