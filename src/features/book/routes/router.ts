// internal application code imports
import IndexView from '@/features/book/views/IndexView.vue';

// main code execution
export default [
  {
    path: '/books',
    name: 'book.index',
    component: IndexView,
    meta: { title: 'Books' },
  },
];