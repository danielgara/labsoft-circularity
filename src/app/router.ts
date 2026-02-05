// external libraries imports
import { createRouter, createWebHistory } from 'vue-router';

// internal application code imports
import bookRouter from '@/features/book/routes/router';
import homeRouter from '@/features/home/routes/router';

// main code execution
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...homeRouter,
    ...bookRouter,
  ],
});

export default router;
