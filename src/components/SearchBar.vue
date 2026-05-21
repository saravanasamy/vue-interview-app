<template>
  <div class="search-bar">
    <span class="search-icon">🔍</span>
    <input
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      type="text"
      placeholder="Search questions..."
      class="search-input"
    />
    <button v-if="modelValue" @click="emit('update:modelValue', '')" class="clear-btn">
      ✕
    </button>
  </div>
</template>

<script setup>
// This component demonstrates v-model on a custom component
defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 10px 16px;
  gap: 10px;
  transition: border-color 0.2s;
  width: 100%;
  max-width: 500px;
}

.search-bar:focus-within {
  border-color: #42b883;
}

.search-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.search-input {
  border: none;
  outline: none;
  font-size: 15px;
  width: 100%;
  background: transparent;
  color: #1a1a2e;
}

.search-input::placeholder {
  color: #aaa;
}

.clear-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #aaa;
  font-size: 14px;
  padding: 0 4px;
  flex-shrink: 0;
  transition: color 0.2s;
}

.clear-btn:hover {
  color: #e53e3e;
}
</style>
