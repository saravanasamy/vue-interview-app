export const categories = [
  { id: 'all', label: '🌟 All' },
  { id: 'basics', label: '📘 Basics' },
  { id: 'directives', label: '🎯 Directives' },
  { id: 'composition', label: '⚙️ Composition API' },
  { id: 'components', label: '🧩 Components' },
  { id: 'state', label: '🗂️ State Management' },
  { id: 'router', label: '🗺️ Vue Router' },
  { id: 'advanced', label: '🚀 Advanced' },
]

export const questions = [
  // ─── BASICS ───────────────────────────────────────────────────────────
  {
    id: 1,
    category: 'basics',
    difficulty: 'beginner',
    question: 'What is Vue JS and what makes it special?',
    shortAnswer: 'Vue is a progressive JavaScript framework for building UIs with reactive data binding and a component-based architecture.',
    answer: `Vue JS is a **progressive JavaScript framework** for building user interfaces.

"Progressive" means you can adopt it gradually — use a small piece of Vue on one part of a page, or build a full Single Page Application (SPA).

**Key features that make Vue special:**

1. **Reactive Data Binding** — Change a variable, the UI updates automatically. No DOM manipulation needed.
2. **Component-based** — Build complex UIs from small, reusable pieces.
3. **Single File Components (.vue)** — HTML, JS, and CSS all in one file.
4. **Easy to learn** — If you know HTML, CSS, and basic JS, you can start Vue quickly.
5. **Virtual DOM** — Efficient rendering by only updating what changed.`,
    code: `<!-- HelloWorld.vue — your first Vue component -->
<template>
  <!-- The template is your HTML -->
  <div>
    <h1>Hello, {{ name }}!</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Click me</button>
  </div>
</template>

<script setup>
// The script is your JavaScript logic
import { ref } from 'vue'

const name = ref('World')   // reactive variable
const count = ref(0)

function increment() {
  count.value++              // updating it auto-updates the UI
}
</script>

<style scoped>
/* scoped = styles only apply to THIS component */
h1 { color: #42b883; }
</style>`,
  },

  {
    id: 2,
    category: 'basics',
    difficulty: 'beginner',
    question: 'What is the Virtual DOM and why does Vue use it?',
    shortAnswer: 'The Virtual DOM is a JavaScript copy of the real DOM. Vue diffs old vs new, then only updates what changed — making it fast.',
    answer: `The **Virtual DOM (VDOM)** is a lightweight JavaScript object that represents your real DOM tree, kept in memory.

**Why?** Directly touching the real DOM is slow. The browser has to recalculate layouts, repaint, etc. The VDOM lets Vue batch and minimise those expensive real DOM operations.

**How it works step by step:**
1. Your data changes (e.g. \`count.value++\`)
2. Vue creates a **new** Virtual DOM tree
3. Vue **diffs** the new tree against the old tree (finds exactly what changed)
4. Vue **patches** only the changed nodes in the real DOM

\`\`\`
Your data changes
       ↓
 New VDOM created
       ↓
 Diff: new vs old VDOM
       ↓
 Only changed nodes → Real DOM  ✅ Fast!
\`\`\`

**Result:** Even if you have a list of 1000 items, if only one item changes, Vue touches only that one DOM node.`,
    code: `// You write this (simple and declarative):
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>

// Vue internally creates a Virtual DOM like:
{
  tag: 'ul',
  children: [
    { tag: 'li', key: 1, text: 'Apple' },
    { tag: 'li', key: 2, text: 'Banana' },
  ]
}

// When items[0].name changes to 'Mango':
// Vue only updates the first <li> text node.
// It does NOT re-render the whole list!`,
  },

  {
    id: 3,
    category: 'basics',
    difficulty: 'beginner',
    question: 'What is the difference between ref() and reactive()?',
    shortAnswer: 'ref() wraps any value (primitive or object) and requires .value. reactive() only works on objects and does not need .value.',
    answer: `Both \`ref()\` and \`reactive()\` create reactive state, but they work differently.

**ref()** — wraps ANY value (string, number, boolean, object, array). You access/change it with \`.value\`.

**reactive()** — only works with objects/arrays. No \`.value\` needed. Direct property access.

**Simple rule:** Use \`ref()\` for everything. Use \`reactive()\` only when you have a group of related properties (like a form object).

**Important:** In the \`<template>\`, Vue automatically unwraps refs — so you write \`{{ count }}\` not \`{{ count.value }}\`.`,
    code: `<script setup>
import { ref, reactive } from 'vue'

// ref() — any value type
const count = ref(0)           // number
const name = ref('John')       // string
const isOpen = ref(false)      // boolean
const tags = ref(['vue', 'js']) // array

// Access with .value in <script>
count.value++          // ✅
name.value = 'Jane'    // ✅

// reactive() — objects only
const user = reactive({
  name: 'John',
  age: 25,
  address: { city: 'Chennai' }
})

// Direct property access (no .value)
user.name = 'Jane'      // ✅
user.age++              // ✅
user.address.city = 'Mumbai'  // ✅ deep reactive too

// ❌ Don't do this — loses reactivity!
// let user = reactive({ name: 'John' })
// user = { name: 'Jane' }  // replaces the whole object
</script>

<template>
  <!-- In template, ref is auto-unwrapped (no .value needed) -->
  <p>{{ count }}</p>    <!-- not count.value -->
  <p>{{ name }}</p>

  <!-- reactive works the same in template -->
  <p>{{ user.name }}</p>
  <p>{{ user.address.city }}</p>
</template>`,
  },

  // ─── DIRECTIVES ──────────────────────────────────────────────────────
  {
    id: 4,
    category: 'directives',
    difficulty: 'beginner',
    question: 'What are Vue Directives? List the most important ones.',
    shortAnswer: 'Directives are special v- attributes in the template that give instructions to Vue about how to handle a DOM element.',
    answer: `Directives are special **attributes starting with \`v-\`** that tell Vue to do something to a DOM element.

| Directive | Shorthand | Purpose |
|-----------|-----------|---------|
| \`v-if\` | — | Add/remove element from DOM |
| \`v-else\` | — | Else branch of v-if |
| \`v-else-if\` | — | Else-if branch |
| \`v-show\` | — | Toggle \`display:none\` |
| \`v-for\` | — | Render a list |
| \`v-bind\` | \`:\` | Bind an attribute to data |
| \`v-on\` | \`@\` | Listen to DOM events |
| \`v-model\` | — | Two-way data binding |
| \`v-text\` | — | Set element text |
| \`v-html\` | — | Set inner HTML |
| \`v-pre\` | — | Skip compilation |

The shorthand versions (\`:\` and \`@\`) are used in real projects — you'll rarely see the full \`v-bind:\` or \`v-on:\` forms.`,
    code: `<template>
  <!-- v-bind (:) — bind attribute to data -->
  <img :src="user.avatar" :alt="user.name" />
  <a :href="profileUrl" :class="{ active: isActive }">Profile</a>

  <!-- v-on (@) — listen to events -->
  <button @click="handleClick">Click</button>
  <input @keyup.enter="submitForm" @input="onInput" />

  <!-- v-if / v-else-if / v-else -->
  <div v-if="role === 'admin'">Admin Panel</div>
  <div v-else-if="role === 'user'">User Dashboard</div>
  <div v-else>Please Login</div>

  <!-- v-show — stays in DOM, just hidden -->
  <div v-show="isMenuOpen">Dropdown Menu</div>

  <!-- v-for — must always have :key -->
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }} — {{ item.price }}
    </li>
  </ul>

  <!-- v-model — two-way binding -->
  <input v-model="searchQuery" placeholder="Search..." />
  <select v-model="selectedCategory">
    <option v-for="cat in categories" :key="cat" :value="cat">
      {{ cat }}
    </option>
  </select>
</template>`,
  },

  {
    id: 5,
    category: 'directives',
    difficulty: 'beginner',
    question: 'What is the difference between v-if and v-show?',
    shortAnswer: 'v-if removes/adds the element from the DOM. v-show toggles CSS display:none. Use v-show for frequent toggles, v-if for rare ones.',
    answer: `Both \`v-if\` and \`v-show\` control visibility, but in different ways.

**v-if:**
- When \`false\` → element is **completely removed** from the DOM
- When \`true\` → element is **created** and inserted
- Higher cost when toggling (creates/destroys the component)
- Lazy — if \`false\` initially, the component is never created

**v-show:**
- Element is **always in the DOM**
- When \`false\` → just adds \`display: none\` via CSS
- Lower cost to toggle (just changes a CSS property)
- Higher initial cost — always rendered even if hidden

**When to use which:**

| Use \`v-if\` | Use \`v-show\` |
|------------|---------------|
| Element rarely appears | Element toggles frequently |
| Admin/permission sections | Dropdowns, modals, tabs |
| Conditional that rarely changes | Accordion panels |
| Want to avoid rendering overhead | Things that flicker on/off |`,
    code: `<template>
  <!-- v-if: DOM element doesn't exist when false -->
  <!-- Good for: admin sections, error panels (rare) -->
  <AdminPanel v-if="user.isAdmin" />

  <!-- v-show: element exists but display:none when false -->
  <!-- Good for: tabs, dropdowns, frequent toggles -->
  <div v-show="isDropdownOpen" class="dropdown-menu">
    <a href="#">Profile</a>
    <a href="#">Settings</a>
    <a href="#">Logout</a>
  </div>
  <button @click="isDropdownOpen = !isDropdownOpen">
    Menu
  </button>

  <!-- With v-else (only works with v-if, not v-show) -->
  <div v-if="isLoading">
    <Spinner />
  </div>
  <div v-else>
    <UserList :users="users" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isDropdownOpen = ref(false)
const isLoading = ref(false)
</script>`,
  },

  {
    id: 6,
    category: 'directives',
    difficulty: 'beginner',
    question: 'How does v-model work? How do you use it on custom components?',
    shortAnswer: 'v-model creates two-way binding. On native inputs it syncs value + input event. On components it uses modelValue prop + update:modelValue emit.',
    answer: `\`v-model\` is shorthand for **binding a value + listening to changes** at the same time.

On a native input:
\`\`\`html
<input v-model="name" />
<!-- is the same as: -->
<input :value="name" @input="name = $event.target.value" />
\`\`\`

**v-model on different input types:**
- \`<input type="text">\` → binds \`value\` + \`input\` event
- \`<input type="checkbox">\` → binds \`checked\` + \`change\` event
- \`<select>\` → binds \`value\` + \`change\` event

**On custom components**, Vue uses a special prop + emit contract:
- The child receives \`modelValue\` prop
- The child emits \`update:modelValue\` when it changes
- The parent uses \`v-model\` as if it were a native input`,
    code: `<!-- ── Using v-model on native inputs ── -->
<template>
  <input v-model="name" />
  <input type="checkbox" v-model="isChecked" />
  <select v-model="selectedCity">
    <option value="chennai">Chennai</option>
    <option value="mumbai">Mumbai</option>
  </select>

  <p>Name: {{ name }}</p>
  <p>Checked: {{ isChecked }}</p>
  <p>City: {{ selectedCity }}</p>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
const isChecked = ref(false)
const selectedCity = ref('chennai')
</script>

<!-- ── Custom component with v-model ── -->

<!-- Parent.vue -->
<MyInput v-model="email" />
<!-- same as: <MyInput :modelValue="email" @update:modelValue="email = $event" /> -->

<!-- MyInput.vue (child) -->
<template>
  <div class="input-wrapper">
    <input
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      class="custom-input"
    />
  </div>
</template>

<script setup>
defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])
</script>`,
  },

  {
    id: 7,
    category: 'directives',
    difficulty: 'beginner',
    question: 'How does v-for work and why is :key important?',
    shortAnswer: 'v-for renders a list of elements. :key gives Vue a unique identifier per item so it can efficiently update only what changed.',
    answer: `\`v-for\` renders a list of elements by iterating over an array or object.

**The \`:key\` attribute is required** and must be unique per item. Without it:
- Vue cannot track which item changed
- Vue re-renders the whole list instead of just the changed item
- You get weird bugs when the list order changes (animations break, form state gets mixed up)

**Always use a unique ID as the key**, not the array index (index as key causes bugs when list is reordered or items are deleted from the middle).`,
    code: `<template>
  <!-- Basic list rendering -->
  <ul>
    <li v-for="user in users" :key="user.id">
      {{ user.name }} — {{ user.email }}
    </li>
  </ul>

  <!-- With index (only use index when list never reorders) -->
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ index + 1 }}. {{ item.name }}
    </li>
  </ul>

  <!-- Iterating an object -->
  <ul>
    <li v-for="(value, key) in userProfile" :key="key">
      {{ key }}: {{ value }}
    </li>
  </ul>

  <!-- v-for with components -->
  <UserCard
    v-for="user in filteredUsers"
    :key="user.id"
    :user="user"
    @delete="removeUser(user.id)"
  />

  <!-- v-for with a range (1 to 5) -->
  <span v-for="n in 5" :key="n">⭐</span>
</template>

<script setup>
import { ref, computed } from 'vue'

const users = ref([
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob',   email: 'bob@example.com' },
  { id: 3, name: 'Carol', email: 'carol@example.com' },
])

const userProfile = ref({ name: 'Alice', age: 28, city: 'Chennai' })

// ❌ BAD KEY: using index (breaks on delete/reorder)
// <li v-for="(item, index) in items" :key="index">

// ✅ GOOD KEY: using unique ID
// <li v-for="item in items" :key="item.id">
</script>`,
  },

  // ─── COMPOSITION API ─────────────────────────────────────────────────
  {
    id: 8,
    category: 'composition',
    difficulty: 'beginner',
    question: 'What is the Vue Component Lifecycle? When should I use each hook?',
    shortAnswer: 'Components go through created → mounted → updated → unmounted. Use onMounted to fetch data, onUnmounted to clean up timers/subscriptions.',
    answer: `Every Vue component has a **lifecycle** — a series of stages from creation to removal.

\`\`\`
  setup() runs  ←── always first
       ↓
  onBeforeMount()  ←── DOM not ready yet
       ↓
  onMounted()      ←── ✅ DOM ready! Fetch data here
       ↓
  [data/props change]
       ↓
  onBeforeUpdate() ←── before re-render
       ↓
  onUpdated()      ←── after re-render
       ↓
  [component removed]
       ↓
  onBeforeUnmount() ←── cleanup starts
       ↓
  onUnmounted()    ←── ✅ Clean up here (timers, listeners)
\`\`\`

**Most used hooks:**
- **onMounted** → fetch initial data, access DOM elements, start intervals
- **onUnmounted** → clear intervals, remove event listeners, cancel subscriptions
- **onUpdated** → respond after DOM updates (rare — use \`watch\` instead usually)`,
    code: `<script setup>
import { ref, onMounted, onUnmounted, onUpdated } from 'vue'

const users = ref([])
const time = ref(new Date())
let clockInterval = null

// Runs once — DOM is ready
onMounted(async () => {
  console.log('Component mounted!')

  // ✅ Safe to fetch data here
  users.value = await fetchUsers()

  // ✅ Start a clock
  clockInterval = setInterval(() => {
    time.value = new Date()
  }, 1000)

  // ✅ Access DOM elements
  document.title = 'Users Page'
})

// Cleanup — component is being removed
onUnmounted(() => {
  console.log('Component unmounted!')

  // ✅ ALWAYS clear intervals to prevent memory leaks
  clearInterval(clockInterval)
})

// Runs after every re-render (use sparingly)
onUpdated(() => {
  console.log('Component updated!')
})

async function fetchUsers() {
  const res = await fetch('/api/users')
  return res.json()
}
</script>`,
  },

  {
    id: 9,
    category: 'composition',
    difficulty: 'intermediate',
    question: 'What is the difference between computed() and watch()?',
    shortAnswer: 'computed() derives a value from state (cached, returns value). watch() runs a side effect when a value changes (no return value, used for async/API calls).',
    answer: `Both react to reactive data changes, but for different purposes.

**computed()** — derive a value. Think of it as a "smart getter":
- Returns a value
- **Cached** — only recalculates when its dependencies change
- Should be pure (no side effects)
- Use for: filtering, formatting, transforming data

**watch()** — react to a change with a side effect:
- Does NOT return a value
- Runs a callback when source changes
- Use for: API calls, saving to localStorage, logging, animations

**watchEffect()** — like watch but automatically tracks dependencies:
- Runs immediately on mount
- Auto-tracks any reactive variable you access inside it`,
    code: `<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')
const searchQuery = ref('')
const users = ref([])
const results = ref([])

// ── computed() — derive a value (cached) ──────────────────────
const fullName = computed(() => \`\${firstName.value} \${lastName.value}\`)

const filteredUsers = computed(() =>
  users.value.filter(u =>
    u.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

// fullName only recalculates when firstName or lastName changes
// Even if other state changes, it uses the cached value ✅

// ── watch() — side effect on change ──────────────────────────
// Runs when searchQuery changes
watch(searchQuery, async (newVal, oldVal) => {
  console.log('Changed from:', oldVal, 'to:', newVal)

  if (newVal.length > 2) {
    results.value = await searchApi(newVal)
  } else {
    results.value = []
  }
})

// Watch with options
watch(searchQuery, (newVal) => {
  saveToLocalStorage(newVal)
}, {
  immediate: true,   // run immediately on mount too
  deep: true,        // deep watch for nested objects
})

// Watch multiple sources
watch([firstName, lastName], ([newFirst, newLast]) => {
  console.log('Name changed:', newFirst, newLast)
})

// ── watchEffect() — auto-track dependencies ──────────────────
watchEffect(async () => {
  // Runs immediately AND whenever searchQuery changes
  // Vue auto-detects the dependency
  if (searchQuery.value) {
    results.value = await searchApi(searchQuery.value)
  }
})
</script>`,
  },

  {
    id: 10,
    category: 'composition',
    difficulty: 'intermediate',
    question: 'What are Composables and how do you create one?',
    shortAnswer: 'Composables are reusable functions that use the Composition API to encapsulate stateful logic — like Vue\'s version of React custom hooks.',
    answer: `**Composables** are plain JavaScript functions that:
- Start with \`use\` by convention (e.g., \`useCounter\`, \`useFetch\`)
- Use Vue's reactivity APIs (ref, computed, watch, lifecycle hooks)
- Can be shared across multiple components

**Why composables?**
Before Composition API, reusable logic was done with mixins — they had name conflicts, unclear sources, and hard-to-debug code. Composables fix all of this.

**Rules:**
- Always call composables at the **top level** of \`<script setup>\` (not inside conditions or loops)
- Name them \`useXxx\`
- Return the reactive state and functions callers need`,
    code: `// ── composables/useCounter.js ──────────────────────────────
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const isNegative = computed(() => count.value < 0)
  const doubled = computed(() => count.value * 2)

  function increment() { count.value++ }
  function decrement() { count.value-- }
  function reset() { count.value = initialValue }

  return { count, isNegative, doubled, increment, decrement, reset }
}

// ── composables/useFetch.js ────────────────────────────────
import { ref, onMounted } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function execute() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Request failed')
      data.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  onMounted(execute)

  return { data, loading, error, execute }
}

// ── Using composables in any component ────────────────────
<script setup>
import { useCounter } from '@/composables/useCounter'
import { useFetch } from '@/composables/useFetch'

// Each call creates its OWN isolated state
const counter1 = useCounter(0)
const counter2 = useCounter(100)

const { data: users, loading, error } = useFetch('/api/users')
</script>

<template>
  <div>
    <p>Counter 1: {{ counter1.count }}</p>
    <button @click="counter1.increment">+</button>

    <p v-if="loading">Loading users...</p>
    <p v-else-if="error">{{ error }}</p>
    <ul v-else>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>`,
  },

  // ─── COMPONENTS ──────────────────────────────────────────────────────
  {
    id: 11,
    category: 'components',
    difficulty: 'beginner',
    question: 'What are Props and Emits? How does parent-child communication work?',
    shortAnswer: 'Props pass data DOWN from parent to child. Emits send events UP from child to parent. Never mutate props directly in the child.',
    answer: `Vue components communicate through **props** (parent → child) and **emits** (child → parent).

\`\`\`
Parent ──── props ────→ Child
Parent ←─── emit ────── Child
\`\`\`

**Golden rule:** Data flows **down** via props. Events flow **up** via emits. Never mutate a prop directly inside the child — emit an event and let the parent handle it.

**Why?** If the child could change the prop directly, the parent wouldn't know about it. The UI would become unpredictable. By always emitting, the parent stays in control of its own data.`,
    code: `<!-- ── Parent.vue ─────────────────────────────────────────── -->
<template>
  <div>
    <h1>Users ({{ users.length }})</h1>

    <!-- Pass data DOWN as props -->
    <UserCard
      v-for="user in users"
      :key="user.id"
      :user="user"
      :is-admin="currentUser.isAdmin"
      @delete="handleDelete"
      @update="handleUpdate"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserCard from './UserCard.vue'

const users = ref([
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob',   email: 'bob@mail.com' },
])

// Handle events coming UP from child
function handleDelete(userId) {
  users.value = users.value.filter(u => u.id !== userId)
}

function handleUpdate(updatedUser) {
  const index = users.value.findIndex(u => u.id === updatedUser.id)
  users.value[index] = updatedUser
}
</script>

<!-- ── UserCard.vue (child) ─────────────────────────────────── -->
<template>
  <div class="card">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
    <span v-if="isAdmin" class="badge">Admin</span>

    <div class="actions">
      <!-- Emit events UP to parent -->
      <button @click="emit('delete', user.id)">Delete</button>
      <button @click="emit('update', { ...user, name: 'Updated' })">
        Edit
      </button>
    </div>
  </div>
</template>

<script setup>
// Define what props this component accepts
const props = defineProps({
  user: { type: Object, required: true },
  isAdmin: { type: Boolean, default: false },
})

// Define what events this component can emit
const emit = defineEmits(['delete', 'update'])

// ❌ WRONG — never mutate props directly
// props.user.name = 'New Name'

// ✅ RIGHT — emit and let parent handle it
// emit('update', { ...props.user, name: 'New Name' })
</script>`,
  },

  {
    id: 12,
    category: 'components',
    difficulty: 'intermediate',
    question: 'What are Slots? Explain default slots, named slots, and scoped slots.',
    shortAnswer: 'Slots let a parent inject HTML content into a child component. Named slots let you inject into specific spots. Scoped slots let the child pass data back up.',
    answer: `**Slots** are like "holes" in your component's template that the parent can fill with custom content.

Think of it like a card component:
- The card provides the outer shell (border, shadow, padding)
- The parent decides what goes inside (title, body, footer)

**Three types:**
1. **Default slot** — single content hole
2. **Named slots** — multiple named holes
3. **Scoped slots** — child passes data UP to the parent's slot content`,
    code: `<!-- ── 1. Default Slot ──────────────────────────────────── -->
<!-- Card.vue -->
<template>
  <div class="card">
    <slot>Default content if nothing provided</slot>
  </div>
</template>

<!-- Parent using it -->
<Card>
  <p>This paragraph goes inside the card!</p>
  <button>Click me</button>
</Card>

<!-- ── 2. Named Slots ─────────────────────────────────────── -->
<!-- PageLayout.vue -->
<template>
  <div class="page">
    <header>
      <slot name="header" />
    </header>
    <main>
      <slot />          <!-- default slot -->
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<!-- Parent using named slots -->
<PageLayout>
  <template #header>
    <h1>My Page Title</h1>
    <nav>...</nav>
  </template>

  <!-- default slot — no #name needed -->
  <p>This is the main page content</p>

  <template #footer>
    <p>© 2024 SoupedUp</p>
  </template>
</PageLayout>

<!-- ── 3. Scoped Slots — child exposes data to parent ─────── -->
<!-- DataList.vue — renders list, lets parent decide how each row looks -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <!-- Pass item UP to whoever is using this slot -->
      <slot :item="item" :index="index" />
    </li>
  </ul>
</template>

<script setup>
defineProps({ items: Array })
</script>

<!-- Parent uses the exposed data -->
<DataList :items="users">
  <template #default="{ item, index }">
    <!-- Parent decides how each user is displayed -->
    <strong>{{ index + 1 }}. {{ item.name }}</strong>
    <span class="badge">{{ item.role }}</span>
  </template>
</DataList>`,
  },

  // ─── STATE MANAGEMENT ─────────────────────────────────────────────
  {
    id: 13,
    category: 'state',
    difficulty: 'intermediate',
    question: 'What is Pinia and why use it instead of passing props?',
    shortAnswer: 'Pinia is Vue\'s official state management library. Use it when multiple unrelated components need the same data, avoiding prop drilling.',
    answer: `**When do you need Pinia?**

Imagine a user's profile data is needed in:
- The sidebar (shows avatar)
- The navbar (shows name)
- The profile page (shows all details)
- The settings page (edits details)

Passing this via props means every parent component in between must also pass it along — this is called **prop drilling** and it's messy.

**Pinia** is a centralised store — any component can read from or write to it directly.

**Pinia = State + Getters + Actions**
- **state** → like \`data()\` in Options API or \`ref()\` — your reactive data
- **getters** → like \`computed()\` — derived data from state
- **actions** → like \`methods()\` — functions that change state (can be async)`,
    code: `// ── stores/userStore.js ─────────────────────────────────────
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Composition-style Pinia store (recommended)
export const useUserStore = defineStore('user', () => {
  // STATE
  const currentUser = ref(null)
  const isAuthenticated = ref(false)
  const users = ref([])

  // GETTERS (computed)
  const displayName = computed(() =>
    currentUser.value?.name ?? 'Guest'
  )

  const adminCount = computed(() =>
    users.value.filter(u => u.role === 'admin').length
  )

  // ACTIONS
  async function login(email, password) {
    const user = await authApi.login({ email, password })
    currentUser.value = user
    isAuthenticated.value = true
  }

  function logout() {
    currentUser.value = null
    isAuthenticated.value = false
  }

  async function fetchUsers() {
    users.value = await usersApi.getAll()
  }

  return {
    currentUser, isAuthenticated, users,
    displayName, adminCount,
    login, logout, fetchUsers,
  }
})

// ── In ANY component ──────────────────────────────────────────
<script setup>
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
  <!-- READ state -->
  <p>Welcome, {{ userStore.displayName }}</p>

  <!-- CALL actions -->
  <button @click="userStore.logout()">Logout</button>

  <!-- USE getters -->
  <span>{{ userStore.adminCount }} admins</span>
</template>`,
  },

  // ─── ROUTER ──────────────────────────────────────────────────────────
  {
    id: 14,
    category: 'router',
    difficulty: 'beginner',
    question: 'How does Vue Router work? Explain routing, params, and navigation guards.',
    shortAnswer: 'Vue Router maps URLs to components. Use useRoute() for current route info, useRouter() for navigation. Guards run before/after navigation.',
    answer: `**Vue Router** handles navigation in a Single Page Application — changing what's displayed without a full page reload.

**Key concepts:**
1. **Routes** — URL patterns mapped to components
2. **\`<RouterView />\`** — where the matched component renders
3. **\`<RouterLink />\`** — navigates without page reload (like \`<a>\` but for SPAs)
4. **Dynamic segments** — \`/users/:id\` captures the ID
5. **Navigation Guards** — run code before/after navigation (auth checks, etc.)

**Three ways to navigate:**
- Declarative: \`<RouterLink to="/users">\`
- Programmatic: \`router.push('/users')\`
- Replace (no history): \`router.replace('/users')\``,
    code: `// ── router/index.js ─────────────────────────────────────────
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('../pages/Home.vue') },
    { path: '/users', component: () => import('../pages/Users.vue') },

    // Dynamic segment — :id is a param
    { path: '/users/:id', component: () => import('../pages/UserDetail.vue') },

    // Protected route with meta
    {
      path: '/admin',
      component: () => import('../pages/Admin.vue'),
      meta: { requiresAuth: true, role: 'admin' }
    },

    // Catch-all 404
    { path: '/:pathMatch(.*)*', component: () => import('../pages/NotFound.vue') },
  ]
})

// Navigation Guard — runs before EVERY navigation
router.beforeEach((to, from) => {
  const isLoggedIn = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isLoggedIn) {
    return '/login'   // redirect to login
  }
})

export default router

// ── In a component ──────────────────────────────────────────
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

// Read URL params: /users/42 → route.params.id = '42'
const userId = route.params.id

// Read query string: /users?search=john → route.query.search
const search = route.query.search

// Programmatic navigation
function goToUser(id) {
  router.push(\`/users/\${id}\`)           // add to history
  // router.push({ name: 'User', params: { id } })  // named route
}

function goBack() {
  router.back()   // browser back
}
</script>

<template>
  <!-- Declarative navigation -->
  <RouterLink to="/">Home</RouterLink>
  <RouterLink :to="\`/users/\${userId}\`">My Profile</RouterLink>
  <RouterLink :to="{ name: 'Admin' }">Admin</RouterLink>

  <!-- Where matched route renders -->
  <RouterView />
</template>`,
  },

  // ─── ADVANCED ─────────────────────────────────────────────────────────
  {
    id: 15,
    category: 'advanced',
    difficulty: 'intermediate',
    question: 'What is provide/inject and when should you use it?',
    shortAnswer: 'provide/inject lets an ancestor component share data with any descendant without passing props through every level in between (avoiding prop drilling).',
    answer: `\`provide\` / \`inject\` solves **prop drilling** — when you have to pass a prop through 3+ component levels just to reach the one that needs it.

\`\`\`
GrandParent  provides({ theme: 'dark' })
    ↓
  Parent      ← doesn't need theme, but had to pass it before
    ↓
   Child       ← doesn't need theme either
    ↓
 GrandChild   inject('theme')  ← gets it directly! ✅
\`\`\`

**When to use vs Context/Pinia:**
- \`provide/inject\` → for component-library patterns, plugin-like situations
- Pinia → for app-wide global state that many components need
- Props → when the component hierarchy is shallow (1-2 levels)`,
    code: `<!-- ── GrandParent.vue ──────────────────────────────────── -->
<script setup>
import { provide, ref, readonly } from 'vue'

const theme = ref('dark')
const user = ref({ name: 'Alice', role: 'admin' })

// Provide values to ALL descendants
provide('theme', readonly(theme))   // readonly = children can't mutate
provide('currentUser', user)
provide('updateTheme', (newTheme) => { theme.value = newTheme })
</script>

<!-- ── DeepChild.vue (any level deep) ───────────────────── -->
<script setup>
import { inject } from 'vue'

// Inject — with default fallback if not provided
const theme = inject('theme', 'light')
const currentUser = inject('currentUser')
const updateTheme = inject('updateTheme')
</script>

<template>
  <div :class="\`theme-\${theme}\`">
    <p>Hello {{ currentUser?.name }}</p>
    <button @click="updateTheme('light')">Light Mode</button>
    <button @click="updateTheme('dark')">Dark Mode</button>
  </div>
</template>

<!-- ── Real-world pattern: provide in a plugin/composable ── -->
// composables/useTheme.js
import { provide, inject, ref } from 'vue'

const THEME_KEY = Symbol('theme')

export function provideTheme() {
  const theme = ref('light')
  const toggle = () => { theme.value = theme.value === 'light' ? 'dark' : 'light' }
  provide(THEME_KEY, { theme, toggle })
  return { theme, toggle }
}

export function useTheme() {
  const context = inject(THEME_KEY)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}`,
  },

  {
    id: 16,
    category: 'advanced',
    difficulty: 'intermediate',
    question: 'What is keep-alive and when should you use it?',
    shortAnswer: '<keep-alive> caches component state when it\'s unmounted so it doesn\'t reset when you switch back. Use for tabs, multi-step forms, or expensive components.',
    answer: `Normally when a component is removed from the DOM (\`v-if\` becomes false, or you navigate away), Vue **destroys** it — all its state is lost. When it comes back, it starts fresh.

\`<keep-alive>\` **caches** the component instance instead of destroying it, so when it reappears, it resumes from where it left off.

**Use cases:**
- Tab panels (don't lose form input when switching tabs)
- Multi-step wizards (don't lose step 1 data when going to step 2)
- Expensive components that are slow to initialise (charts, large tables)
- Search results pages (user scrolls down, goes to detail, comes back — don't lose scroll position)

**Special lifecycle hooks with keep-alive:**
- \`onActivated\` — runs when the cached component becomes visible
- \`onDeactivated\` — runs when the cached component is hidden`,
    code: `<!-- ── Without keep-alive: form resets on tab switch ── -->
<component :is="activeTab" />  <!-- state lost on switch ❌ -->

<!-- ── With keep-alive: form state preserved ── -->
<keep-alive>
  <component :is="activeTab" />  <!-- state cached ✅ -->
</keep-alive>

<!-- ── Selective caching ── -->
<keep-alive include="UserForm,SettingsPanel">
  <component :is="currentView" />
</keep-alive>

<keep-alive :max="5">   <!-- keep at most 5 cached instances -->
  <RouterView />
</keep-alive>

<!-- ── Inside a cached component ── -->
<script setup>
import { ref, onMounted, onActivated, onDeactivated } from 'vue'

const scrollPosition = ref(0)

onMounted(() => {
  // Runs ONLY the first time the component mounts
  console.log('First mount')
})

onActivated(() => {
  // Runs every time the component becomes visible (after being cached)
  console.log('Tab became active!')
  window.scrollTo(0, scrollPosition.value)
  refreshData()   // optionally refresh stale data
})

onDeactivated(() => {
  // Runs when hidden (not destroyed)
  console.log('Tab hidden')
  scrollPosition.value = window.scrollY
})
</script>`,
  },

  {
    id: 17,
    category: 'advanced',
    difficulty: 'intermediate',
    question: 'What is the Options API vs Composition API? Which should I use?',
    shortAnswer: 'Options API organises code by type (data/methods/computed). Composition API organises by feature. Use Composition API for all new Vue 3 projects.',
    answer: `Vue 3 supports two styles of writing components:

**Options API** (Vue 2 style — still works in Vue 3):
- Code is organised into fixed "options": \`data\`, \`methods\`, \`computed\`, \`watch\`
- Easier for beginners coming from traditional JS
- Logic for one feature is **split across** multiple sections

**Composition API** (Vue 3 style — recommended):
- Code is organised by **feature** in \`<script setup>\`
- Related code stays together
- Better TypeScript support
- Reusable logic via composables

**Real problem with Options API** — imagine a component that has both a counter feature and a search feature. In Options API, counter's \`data\`, counter's \`methods\`, counter's \`computed\` are all separated. In Composition API, all counter code is together.`,
    code: `<!-- ── Options API (older style) ───────────────────────────── -->
<script>
export default {
  data() {
    return {
      count: 0,
      searchQuery: '',
      results: []
    }
  },
  computed: {
    doubled() { return this.count * 2 }
  },
  watch: {
    searchQuery(newVal) { this.search(newVal) }
  },
  methods: {
    increment() { this.count++ },
    async search(query) {
      this.results = await searchApi(query)
    }
  },
  mounted() {
    this.fetchInitialData()
  }
}
</script>

<!-- ── Composition API (<script setup>) — same component ──── -->
<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// ── Counter feature (all together) ───────────────
const count = ref(0)
const doubled = computed(() => count.value * 2)
function increment() { count.value++ }

// ── Search feature (all together) ────────────────
const searchQuery = ref('')
const results = ref([])

watch(searchQuery, async (newVal) => {
  results.value = await searchApi(newVal)
})

// ── Lifecycle ────────────────────────────────────
onMounted(fetchInitialData)
</script>

<!-- Key advantages of Composition API:
  ✅ Related logic is grouped together
  ✅ Easy to extract counter logic into useCounter() composable
  ✅ Better TypeScript inference
  ✅ No 'this' keyword confusion
  ✅ Smaller bundle size (tree-shakeable)
-->`,
  },

  {
    id: 18,
    category: 'advanced',
    difficulty: 'advanced',
    question: 'How do you optimise Vue performance? What are common performance pitfalls?',
    shortAnswer: 'Use v-memo, lazy routes, keep-alive, avoid deep watchers, use computed instead of methods in templates, and virtualise long lists.',
    answer: `**Top performance optimisations in Vue:**

1. **Lazy-load routes** — don't load all page components upfront
2. **\`<keep-alive>\`** — cache expensive components
3. **\`v-once\`** — render static content only once
4. **\`v-memo\`** — memoize sub-trees (Vue 3.2+)
5. **Computed instead of methods** in templates — methods run on every render, computed is cached
6. **Virtualise long lists** — use \`vue-virtual-scroller\` for 1000+ items
7. **Avoid large reactive objects** — \`shallowRef\`/\`shallowReactive\` for big data
8. **\`Object.freeze()\`** — for static data that never changes

**Common pitfalls:**
- Using methods in template instead of computed (recalculates every render)
- Deep watchers on large objects (\`{ deep: true }\`) — expensive
- Not keying \`v-for\` properly
- Mutating props directly`,
    code: `// ── 1. Lazy-load routes ──────────────────────────────────
const routes = [
  // ❌ Loads ALL pages upfront
  // { path: '/admin', component: AdminPage }

  // ✅ Loads AdminPage only when user visits /admin
  { path: '/admin', component: () => import('../pages/AdminPage.vue') },
]

// ── 2. computed vs method in template ────────────────────
// ❌ BAD — filterUsers() runs on EVERY render
<li v-for="u in filterUsers()">

// ✅ GOOD — computed is cached, only recalculates when deps change
const filteredUsers = computed(() =>
  users.value.filter(u => u.active)
)
<li v-for="u in filteredUsers">

// ── 3. v-once — static content ────────────────────────────
<!-- Renders once, Vue skips it on future updates -->
<AppHeader v-once />

// ── 4. v-memo — memoize sub-trees ─────────────────────────
<!-- Only re-renders this li if item.id changes -->
<li v-for="item in list" :key="item.id" v-memo="[item.id]">
  <ExpensiveItemComponent :item="item" />
</li>

// ── 5. shallowRef for large datasets ──────────────────────
// ❌ Deep reactive — Vue tracks every nested property
const bigData = ref(largeDataset)

// ✅ shallowRef — only the top-level ref is reactive
// Use when you replace the whole array, not mutate items
const bigData = shallowRef(largeDataset)

// ── 6. Object.freeze for static data ──────────────────────
// Config that never changes — Vue won't add reactivity
const COUNTRY_LIST = Object.freeze([
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' },
  // ...200 more countries
])`,
  },

  {
    id: 19,
    category: 'composition',
    difficulty: 'beginner',
    question: 'What is the difference between Composition API and Options API lifecycle?',
    shortAnswer: 'Options API uses beforeCreate/created/mounted etc. Composition API uses onMounted/onUnmounted etc. inside setup(). The concepts are the same.',
    answer: `The lifecycle stages are the same — only the **syntax** differs.

| Options API | Composition API |
|---|---|
| \`beforeCreate\` | Not needed — \`setup()\` replaces it |
| \`created\` | Not needed — \`setup()\` replaces it |
| \`beforeMount\` | \`onBeforeMount()\` |
| \`mounted\` | \`onMounted()\` |
| \`beforeUpdate\` | \`onBeforeUpdate()\` |
| \`updated\` | \`onUpdated()\` |
| \`beforeUnmount\` | \`onBeforeUnmount()\` |
| \`unmounted\` | \`onUnmounted()\` |
| \`activated\` | \`onActivated()\` |
| \`deactivated\` | \`onDeactivated()\` |
| \`errorCaptured\` | \`onErrorCaptured()\` |

In Composition API, \`setup()\` itself replaces \`beforeCreate\` and \`created\`.`,
    code: `<!-- ── Options API lifecycle ────────────────────────────── -->
<script>
export default {
  data() { return { users: [] } },

  async created() {
    // Runs after instance is created (no DOM yet)
    console.log('created')
  },

  async mounted() {
    // DOM is ready
    this.users = await fetchUsers()
  },

  beforeUnmount() {
    clearInterval(this.timer)
  },
}
</script>

<!-- ── Composition API lifecycle (equivalent) ────────────── -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const users = ref([])
let timer = null

// setup() runs first — like created()
console.log('setup runs — no DOM yet')

onMounted(async () => {
  // DOM is ready
  users.value = await fetchUsers()
  timer = setInterval(refreshData, 30000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<!-- Key: you can use multiple onMounted calls! -->
<script setup>
import { onMounted } from 'vue'

onMounted(() => { initCharts() })
onMounted(() => { fetchUserData() })   // both run on mount
</script>`,
  },

  {
    id: 20,
    category: 'advanced',
    difficulty: 'advanced',
    question: 'What are Teleport, Suspense, and defineAsyncComponent in Vue 3?',
    shortAnswer: 'Teleport renders content outside the component tree (e.g. modals). Suspense shows fallback while async components load. defineAsyncComponent lazy-loads components.',
    answer: `These are three powerful Vue 3 features for handling advanced UI patterns.

**\`<Teleport>\`** — renders a component's HTML to a different DOM location (outside the app root). Perfect for modals and tooltips that need to escape CSS overflow/z-index constraints.

**\`<Suspense>\`** — shows fallback content while an async component is loading. Works like a loading boundary.

**\`defineAsyncComponent()\`** — creates a component that is only loaded when first used (code splitting). Perfect for heavy components used rarely.`,
    code: `<!-- ── 1. Teleport — render modal in <body> ──────────────── -->
<template>
  <button @click="showModal = true">Open Modal</button>

  <!-- Renders inside <body>, not inside this component's DOM -->
  <Teleport to="body">
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Modal Title</h2>
        <button @click="showModal = false">Close</button>
      </div>
    </div>
  </Teleport>
</template>

<!-- ── 2. Suspense — loading state for async components ───── -->
<template>
  <Suspense>
    <!-- Main content (async component) -->
    <template #default>
      <AsyncUserDashboard />
    </template>

    <!-- Shown while loading -->
    <template #fallback>
      <div class="loading-screen">
        <Spinner />
        <p>Loading dashboard...</p>
      </div>
    </template>
  </Suspense>
</template>

<!-- ── 3. defineAsyncComponent — lazy load heavy components ── -->
<script setup>
import { defineAsyncComponent } from 'vue'

// Only loads RichTextEditor.vue when the component is first used
const RichTextEditor = defineAsyncComponent(
  () => import('./RichTextEditor.vue')
)

// With loading and error states
const HeavyChart = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  loadingComponent: () => import('./Spinner.vue'),
  errorComponent: () => import('./ErrorMessage.vue'),
  delay: 200,       // show loading after 200ms
  timeout: 10000,   // error after 10s
})
</script>`,
  },

  // --- PINIA -----------------------------------------------------------------
  {
    id: 21,
    category: 'state',
    difficulty: 'intermediate',
    question: 'What is storeToRefs() and why do you need it?',
    shortAnswer: 'storeToRefs() destructures state and getters from a Pinia store while keeping them reactive. Without it, destructured values lose reactivity.',
    answer: `When you destructure from a Pinia store normally, the reactive links break — the template will not update when the store changes.

**storeToRefs()** wraps each property in a ref so destructuring stays reactive.

**Rule of thumb:**
- State and getters → use storeToRefs()
- Actions → destructure directly (plain functions, no wrapper needed)`,
    code: `import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

// BAD: loses reactivity — template will NOT update when store changes
const { currentUser, displayName } = userStore

// CORRECT: stays reactive
const { currentUser, displayName, isAuthenticated } = storeToRefs(userStore)

// Actions: destructure directly (no storeToRefs needed)
const { login, logout, fetchUsers } = userStore`,
  },

  {
    id: 22,
    category: 'state',
    difficulty: 'intermediate',
    question: 'How does $patch work in Pinia? When should you use it?',
    shortAnswer: '$patch lets you update multiple state properties at once in a single mutation — more efficient than multiple individual assignments.',
    answer: `**$patch** batches multiple state updates in one operation.

**Two forms:**
1. **Object form** — pass an object with only the properties you want to change. Others are untouched.
2. **Function form** — pass a callback receiving mutable state. Required for array mutations (push, splice).

**Why use $patch?**
- Groups changes into one mutation (cleaner devtools history)
- More efficient — Pinia triggers fewer watchers`,
    code: `const cart = useCartStore()

// Object form — update specific properties only
cart.$patch({
  couponCode: 'SAVE20',
  shippingAddress: { city: 'Chennai', zip: '600001' },
})

// Function form — required for array mutations
cart.$patch((state) => {
  state.items.push({ id: 3, name: 'Keyboard', qty: 1, price: 1200 })

  if (state.couponCode === 'SALE') {
    state.items.forEach(item => { item.price *= 0.9 })
  }
})`,
  },

  {
    id: 23,
    category: 'state',
    difficulty: 'intermediate',
    question: 'What is $subscribe in Pinia? How do you watch for store changes?',
    shortAnswer: '$subscribe fires every time any state changes, giving you the mutation type and full new state snapshot.',
    answer: `**$subscribe** listens to **any state change** in a Pinia store — like watch() for the entire store at once.

**Common use cases:**
- Auto-persist to localStorage on every change
- Analytics and logging — record every mutation
- Undo/redo — snapshot state on each change

**vs watch():** Use $subscribe when you want to react to ANY change. Use Vue watch() for a specific property or getter.`,
    code: `const cart = useCartStore()

// Fires on any state change in this store
const unsubscribe = cart.$subscribe((mutation, state) => {
  // mutation.type: 'direct' | 'patch object' | 'patch function'
  console.log('Changed via:', mutation.type)

  localStorage.setItem('cart', JSON.stringify(state))
})

// Or: watch a specific property with Vue watch()
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

const { totalPrice } = storeToRefs(cart)

watch(totalPrice, (newTotal) => {
  if (newTotal > 10000) showFreeShippingBanner()
})`,
  },

  {
    id: 24,
    category: 'state',
    difficulty: 'intermediate',
    question: 'What is the difference between Options Store and Setup Store in Pinia?',
    shortAnswer: 'Options store uses { state, getters, actions } object syntax. Setup store uses a function with ref/computed. Both work identically — Setup Store is recommended for Vue 3.',
    answer: `Pinia supports two syntaxes for defining stores.

**Options Store** (mirrors Vue Options API):
- state() returns a data object
- getters are computed-like properties
- actions use this to access state

**Setup Store (recommended for Vue 3):**
- Write a setup function with ref(), computed(), and plain functions
- Can use composables inside the store
- Better TypeScript inference
- Same mental model as Composition API components

Both produce an identical store.`,
    code: `// Options Store
export const useCounterOptions = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    doubled: (state) => state.count * 2,
  },
  actions: {
    increment() { this.count++ },
  },
})

// Setup Store (recommended)
export const useCounterSetup = defineStore('counter', () => {
  const count = ref(0)
  const doubled = computed(() => count.value * 2)

  function increment() { count.value++ }

  return { count, doubled, increment }
})

// Usage is identical for both styles
const counter = useCounterSetup()
counter.increment()
console.log(counter.doubled)   // 2`,
  },

  {
    id: 25,
    category: 'state',
    difficulty: 'advanced',
    question: 'How do you persist Pinia state to localStorage?',
    shortAnswer: 'Use $subscribe to auto-save on every mutation, call localStorage inside actions for precise control, or install pinia-plugin-persistedstate for zero-boilerplate persistence.',
    answer: `Three patterns for persisting Pinia state:

**1. $subscribe** — fires on any state change and saves the entire store. No changes to existing actions needed.

**2. Manual in actions** — call localStorage.setItem inside specific actions. Precise control.

**3. pinia-plugin-persistedstate** — install once, add persist: true to the store. Zero boilerplate. Best for production.

All patterns must also **restore** saved data when the store initialises.`,
    code: `// Pattern 1: $subscribe
const store = useCartStore()
store.$subscribe((_, state) => {
  localStorage.setItem('cart', JSON.stringify(state))
})

// Pattern 2: Manual inside the store
export const useCartStore = defineStore('cart', () => {
  const saved = JSON.parse(localStorage.getItem('cart') || 'null')
  const items = ref(saved?.items ?? [])

  function addItem(product) {
    items.value.push(product)
    localStorage.setItem('cart', JSON.stringify({ items: items.value }))
  }

  return { items, addItem }
})

// Pattern 3: pinia-plugin-persistedstate
// npm install pinia-plugin-persistedstate
// main.js: pinia.use(piniaPluginPersistedstate)

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  return { items }
}, { persist: true })`,
  }
]
