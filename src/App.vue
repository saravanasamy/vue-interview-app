<template>
  <div class="app-wrapper">
    <header class="app-header">
      <div class="header-inner">
        <div class="logo">
          <span class="logo-icon">💚</span>
          <div>
            <h1>Vue Interview Prep</h1>
            <p>Master Vue JS — One Question at a Time</p>
          </div>
        </div>
        <nav class="nav-links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>

    <main class="app-main">
      <RouterView />
    </main>

    <footer class="app-footer">
      <p>Built with Vue 3 · Composition API · Pinia · Vue Router</p>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
