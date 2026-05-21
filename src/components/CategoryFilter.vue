<template>
  <div class="category-filter">
    <button
      v-for="cat in categories"
      :key="cat.id"
      @click="emit('update:modelValue', cat.id)"
      :class="['cat-btn', { active: modelValue === cat.id }]"
    >
      {{ cat.label }}
    </button>
  </div>
</template>

<script setup>
import { categories } from '../data/questions.js'

defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cat-btn {
  border: 2px solid #e0e0e0;
  background: #fff;
  color: #555;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.cat-btn:hover {
  border-color: #42b883;
  color: #42b883;
}

.cat-btn.active {
  background: #42b883;
  border-color: #42b883;
  color: #fff;
}
</style>
