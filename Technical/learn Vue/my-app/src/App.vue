<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const posts = ref<Post[]>([])
const loading = ref(false)
const error = ref('')
const search = ref('')

async function fetchPosts() {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')

    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }

    const data: Post[] = await response.json()
    posts.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Something went wrong'
  } finally {
    loading.value = false
  }
}

const filteredPosts = ref<Post[]>([])

function filterPosts() {
  const term = search.value.toLowerCase().trim()

  if (term === '') {
    filteredPosts.value = posts.value
  } else {
    filteredPosts.value = posts.value.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.body.toLowerCase().includes(term)
    )
  }
}

function clearSearch() {
  search.value = ''
  filterPosts()
}

onMounted(async () => {
  await fetchPosts()
  filteredPosts.value = posts.value
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans py-12 px-5">
    <div class="max-w-3xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-12">
        <h1
          class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-blue-600 mb-4 tracking-tight">
          All Posts
        </h1>
        <div class="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-4"></div>
        <p class="text-slate-400 text-sm font-medium">
          Fetched from JSONPlaceholder API
        </p>
      </div>

      <!-- Search Bar -->
      <div class="relative mb-12 shadow-lg">
        <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <div class="w-4 h-4 border-2 border-slate-400 rounded-full"></div>
          <div class="w-2 h-0.5 bg-slate-400 transform rotate-45 absolute left-7 top-1/2 -mt-px"></div>
        </div>
        <input v-model="search" @input="filterPosts" type="text" placeholder="Search by title or content..."
          class="w-full py-4 pl-12 pr-12 bg-white border border-slate-200 rounded-2xl text-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all" />
        <button v-if="search" @click="clearSearch"
          class="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-lg transition-colors">
          X
        </button>
      </div>

      <!-- Loading State (Skeleton) -->
      <div v-if="loading" class="space-y-6">
        <div v-for="n in 4" :key="n" class="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 animate-pulse">
          <div class="flex justify-between">
            <div class="h-6 w-24 bg-slate-200 rounded-lg"></div>
            <div class="h-5 w-16 bg-slate-100 rounded-full"></div>
          </div>
          <div class="h-6 w-3/4 bg-slate-200 rounded"></div>
          <div class="space-y-2 pt-2">
            <div class="h-4 w-full bg-slate-100 rounded"></div>
            <div class="h-4 w-5/6 bg-slate-100 rounded"></div>
            <div class="h-4 w-2/3 bg-slate-100 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error"
        class="flex flex-col items-center justify-center py-20 px-5 bg-red-50 border border-red-200 rounded-2xl shadow-sm">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-5">
          <div class="w-8 h-0.5 bg-red-500 transform rotate-45 absolute"></div>
          <div class="w-8 h-0.5 bg-red-500 transform -rotate-45 absolute"></div>
        </div>
        <p class="text-red-600 text-lg font-medium mb-6">{{ error }}</p>
        <button type="button" @click="fetchPosts"
          class="px-8 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-all active:scale-95 shadow-md shadow-red-200 border-none cursor-pointer">
          Try Again
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredPosts.length === 0 && search !== ''"
        class="flex flex-col items-center justify-center py-20 px-5 bg-white border border-slate-100 rounded-2xl shadow-sm relative overflow-hidden">
        <div class="absolute w-40 h-40 bg-slate-50 rounded-full -top-16 -right-16"></div>
        <div class="absolute w-32 h-32 bg-slate-50 rounded-full -bottom-12 -left-12"></div>
        <p class="text-slate-500 text-lg relative z-10">No posts found for "<strong class="text-slate-800">{{ search
            }}</strong>"</p>
      </div>

      <!-- Posts List -->
      <div v-else class="grid gap-6">
        <div v-for="post in filteredPosts" :key="post.id"
          class="bg-white rounded-2xl border border-slate-100 p-6 transition-all duration-300 hover:shadow-2xl hover:border-transparent hover:-translate-y-1 group relative overflow-hidden cursor-default">

          <!-- Hover Gradient Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
          </div>

          <div class="flex items-center justify-between mb-5 relative z-10">
            <span class="bg-slate-800 text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-sm">
              Post #{{ post.id }}
            </span>
            <span class="text-slate-400 text-xs font-medium flex items-center gap-1.5">
              <span class="w-2 h-2 bg-green-400 rounded-full shadow-sm shadow-green-200"></span>
              User {{ post.userId }}
            </span>
          </div>

          <h2
            class="text-xl font-bold text-slate-800 mb-4 capitalize leading-snug group-hover:text-blue-600 transition-colors relative z-10">
            {{ post.title }}
          </h2>

          <p class="text-slate-500 text-sm leading-relaxed m-0 line-clamp-3 relative z-10">
            {{ post.body }}
          </p>

          <!-- Hover Action Footer -->
          <div
            class="mt-5 pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end relative z-10">
            <span class="text-blue-600 text-sm font-semibold flex items-center gap-2">
              Read More
              <span class="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Post Count Footer -->
      <div v-if="!loading && !error" class="text-center mt-12">
        <span
          class="inline-block bg-white border border-slate-200 text-slate-400 text-xs font-medium px-6 py-2.5 rounded-full shadow-sm">
          <span v-if="search === ''">
            Showing all {{ filteredPosts.length }} posts
          </span>
          <span v-else>
            Showing {{ filteredPosts.length }} of {{ posts.length }} posts
          </span>
        </span>
      </div>

    </div>
  </div>
</template>