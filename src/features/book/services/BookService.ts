// internal application code imports
import type { BookInterface } from '@/features/book/interfaces/BookInterface';
import { useBookStore } from '@/features/book/stores/bookstore';

// main class
export class BookService {
  static getBooks(): BookInterface[] {
    return useBookStore().books;
  }

  static getBookById(id: number): BookInterface | undefined {
    return useBookStore().books.find((book) => book.id === id);
  }

  static getUniqueCategories(): string[] {
    const uniqueCategories = [...new Set(useBookStore().books.map((book) => book.category))];
    return uniqueCategories.sort();
  }
}