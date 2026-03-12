<script setup lang="ts">
// external libraries imports
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="bg-light min-vh-100">
    <div class="d-flex min-vh-100 overflow-hidden">
      <!-- sidebar -->
      <aside class="bg-dark text-white shadow position-fixed h-100 d-flex flex-column sidebar">
        <div class="p-4 flex-grow-1">
          <div class="d-flex align-items-center mb-4">
            <i class="fas fa-flask fs-2 me-3 text-primary"></i>
            <span class="fw-bold fs-5">LabSoft EAFIT</span>
          </div>

          <nav class="d-flex flex-column gap-1">
            <RouterLink
              to="/"
              class="d-flex align-items-center px-3 py-2 rounded text-white text-decoration-none sidebar-link"
            >
              <i class="fas fa-home me-3"></i>
              <span>Home</span>
            </RouterLink>
            <RouterLink
              to="/about"
              class="d-flex align-items-center px-3 py-2 rounded text-white text-decoration-none sidebar-link"
            >
              <i class="fas fa-info-circle me-3"></i>
              <span>About</span>
            </RouterLink>
            <RouterLink
              to="/maps"
              class="d-flex align-items-center px-3 py-2 rounded text-white text-decoration-none sidebar-link"
            >
              <i class="fas fa-map me-3"></i>
              <span>Maps</span>
            </RouterLink>
          </nav>
        </div>

        <div class="p-4 border-top border-secondary mt-auto">
          <div class="d-flex align-items-center">
            <div
              class="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3 avatar-sm"
            >
              <i class="fas fa-user text-white"></i>
            </div>
            <div>
              <p class="mb-0 small fw-semibold">Admin User</p>
              <p class="mb-0 small text-secondary">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- main content area -->
      <div class="flex-grow-1 d-flex flex-column overflow-hidden main-content">
        <!-- top header -->
        <header class="bg-white shadow-sm border-bottom">
          <div class="px-4 py-3 d-flex align-items-center justify-content-between">
            <div>
              <h1 class="mb-0 fs-4 fw-bold text-dark">
                {{ $route.meta.title }}
              </h1>
            </div>
            <div class="d-flex align-items-center gap-3">
              <button type="button" class="btn btn-light btn-sm p-2 rounded" aria-label="Search">
                <i class="fas fa-search text-secondary"></i>
              </button>
              <div
                class="rounded-circle bg-primary d-flex align-items-center justify-content-center avatar-sm cursor-pointer"
              >
                <i class="fas fa-user text-white"></i>
              </div>
            </div>
          </div>
        </header>

        <!-- main content -->
        <main class="flex-grow-1 overflow-auto p-4">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 16rem;
}

.main-content {
  margin-left: 16rem;
}

.avatar-sm {
  width: 2.5rem;
  height: 2.5rem;
}

.sidebar-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.cursor-pointer {
  cursor: pointer;
}
</style>
