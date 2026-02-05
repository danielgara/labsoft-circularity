// internal application code imports
import IndexView from '@/features/book/views/IndexView.vue';
import ShowView from '@/features/book/views/ShowView.vue';

// main variables
const ROUTE_PREFIX = '/books';

// main export
export default [
  {
    path: `${ROUTE_PREFIX}`,
    name: 'book.index',
    component: IndexView,
    meta: { title: 'Books' },
  },
  {
    path: `${ROUTE_PREFIX}/:id`,
    name: 'book.show',
    component: ShowView,
    meta: { title: 'Book' },
  },
];
