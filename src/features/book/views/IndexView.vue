<script setup lang="ts">
// external libraries imports
import { ref, watch } from 'vue';

// internal application code imports
import type { BookInterface } from '@/features/book/interfaces/BookInterface';
import { BookService } from '@/features/book/services/BookService';

// main variables
const books = BookService.getBooks();
const filteredBooks = ref(books);

// selectors
const selectableCategories = BookService.getUniqueCategories();
const selectedCategory = ref('');

// watchers
watch(selectedCategory, (newValue) => {
  if (newValue) {
    filteredBooks.value = books.filter((book: BookInterface) => book.category === newValue);
  } else {
    filteredBooks.value = books;
  }
});
</script>

<template>
  <section class="py-4">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="d-flex align-items-center gap-2">
          <label for="category-filter" class="form-label mb-0 fw-semibold text-body">Filter by Category:</label>
          <select id="category-filter" v-model="selectedCategory" class="form-select form-select-sm w-auto">
            <option value="">All Categories</option>
            <option v-for="category in selectableCategories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
      </div>

      <div class="row g-4">
        <div v-for="book in filteredBooks" :key="book.id" class="col-12 col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm border">
            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start mb-2 gap-2">
                <h3 class="card-title h5 mb-0 text-body flex-grow-1">
                  {{ book.title }}
                </h3>
                <span v-if="book.stock > 0" class="badge bg-success text-nowrap">
                  {{ book.stock }} available
                </span>
                <span v-else class="badge bg-danger text-nowrap">
                  Not available
                </span>
              </div>

              <div class="text-center mb-3">
                <img src="https://picsum.photos/seed/picsum/536/354" alt="Book Cover"
                  class="img-fluid rounded shadow-sm" />
              </div>

              <p class="text-body-secondary small mb-3">
                <i class="fas fa-tag me-2"></i>
                {{ book.category }}
              </p>

              <div class="bg-light rounded p-3 mb-3">
                <div class="d-flex justify-content-between small">
                  <span class="text-body-secondary">Price:</span>
                  <span class="fw-semibold">${{ book.price }}</span>
                </div>
              </div>

              <div class="text-center mt-auto">
                <RouterLink :to="`/books/${book.id}`" class="btn btn-outline-primary btn-sm">
                  More info <i class="fas fa-info-circle"></i>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>