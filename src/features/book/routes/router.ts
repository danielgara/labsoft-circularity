// internal application code imports
import IndexView from '@/features/book/views/IndexView.vue';
import ShowView from '@/features/book/views/ShowView.vue';

// main export
export default [
  {
    path: '/books',
    name: 'book.index',
    component: IndexView,
    meta: { title: 'Books' },
  },
  {
    path: '/books/:id',
    name: 'book.show',
    component: ShowView,
    meta: { title: 'Book' },
  },
];
