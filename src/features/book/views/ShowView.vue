<script setup lang="ts">
// external libraries imports
import { useRoute } from 'vue-router';

// internal application code imports
import { BookService } from '@/features/book/services/BookService';

// main variables
const route = useRoute();
const bookId = Number(route.params.id);
const book = BookService.getBookById(bookId);
</script>

<template>
  <section v-if="book" class="py-4">
    <div class="container">
      <div class="row g-4">
        <div class="col-12">
          <div class="card shadow-sm mb-4">
            <div class="card-body p-4 p-lg-5">
              <div class="row align-items-start g-4">
                <div class="col-12 col-md-auto">
                  <img src="https://picsum.photos/seed/picsum/536/354" alt="Book Cover"
                    class="img-fluid rounded shadow-sm" style="max-width: 18rem;" />
                </div>
                <div class="col">
                  <h2 class="h2 fw-bold text-dark mb-4">{{ book.title }}</h2>
                  <p class="text-secondary mb-0">
                    "{{ book.title }}" is an outstanding work in the {{ book.category }} category.
                    This work is an important part of our collection and has been carefully selected
                    to enrich the reading experience of our users.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="card shadow-sm">
            <div class="card-body p-4">
              <h3 class="h5 fw-semibold text-dark mb-4">Book Information</h3>
              <div class="d-flex flex-column gap-2">
                <div class="d-flex justify-content-between">
                  <span class="text-secondary">Title:</span>
                  <span class="fw-medium">{{ book.title }}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span class="text-secondary">Category:</span>
                  <span class="fw-medium">{{ book.category }}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span class="text-secondary">Price:</span>
                  <span class="fw-medium">${{ book.price }}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span class="text-secondary">Stock:</span>
                  <span class="fw-medium">{{ book.stock }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>