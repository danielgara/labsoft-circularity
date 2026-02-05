// external libraries imports
import { createRouter, createWebHistory } from 'vue-router';

// internal application code imports
import homeRouter from '@/features/home/routes/router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...homeRouter,
  ],
});

export default router;
