// external libraries imports
import { defineStore } from 'pinia';

// internal application code imports
import type { BookInterface } from '@/features/book/interfaces/BookInterface';

// main export
export const useBookStore = defineStore('book', {
  state: () => ({
    books: [] as BookInterface[],
  }),
});
