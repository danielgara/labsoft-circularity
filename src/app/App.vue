<script setup lang="ts">
// external libraries imports
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="min-vh-100 d-flex flex-column overflow-hidden bg-light">
    <!-- Top navbar (estilo zip: white, border, logo emerald, search, links, avatar) -->
    <nav class="navbar navbar-expand navbar-light bg-white border-bottom border-secondary border-opacity-25 flex-shrink-0">
      <div class="container-fluid px-4">
        <div class="d-flex align-items-center gap-3">
          <div class="bg-success rounded-3 p-2">
            <i class="fas fa-map text-white"></i>
          </div>
          <h1 class="navbar-brand mb-0 fs-5 fw-semibold text-dark tracking-tight">
            Circularity Explorer
          </h1>
        </div>

        <div class="d-none d-md-flex flex-grow-1 justify-content-center mx-4" style="max-width: 28rem">
          <div class="position-relative w-100">
            <i class="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
            <input
              type="text"
              class="form-control form-control-sm ps-4 py-2 bg-light border border-secondary border-opacity-25 rounded-3"
              placeholder="Search companies, cities, or materials..."
              aria-label="Search"
            />
          </div>
        </div>

        <div class="d-flex align-items-center gap-3 small fw-medium text-secondary">
          <RouterLink to="/about" class="text-secondary text-decoration-none hover-dark">About</RouterLink>
          <span class="text-secondary">Data Sources</span>
          <div
            class="rounded-circle bg-success bg-opacity-25 text-success d-flex align-items-center justify-content-center fw-semibold"
            style="width: 2rem; height: 2rem"
          >
            JS
          </div>
        </div>
      </div>
    </nav>

    <div class="d-flex flex-grow-1 overflow-hidden">
      <!-- Left sidebar (estilo zip: white, border-r, nav) -->
      <aside
        class="bg-white border-end border-secondary border-opacity-25 flex-shrink-0 overflow-y-auto sidebar-zip"
      >
        <div class="p-4 border-bottom border-secondary border-opacity-10">
          <div class="d-flex align-items-center gap-2 text-dark fw-semibold mb-1">
            <i class="fas fa-filter text-success"></i>
            <h2 class="mb-0 small text-uppercase">Navigation</h2>
          </div>
          <p class="small text-secondary mb-0">Explore the platform</p>
        </div>

        <nav class="p-4 d-flex flex-column gap-1">
          <RouterLink
            to="/"
            class="d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-dark text-decoration-none sidebar-link"
          >
            <i class="fas fa-home text-secondary"></i>
            <span class="small fw-medium">Home</span>
          </RouterLink>
          <RouterLink
            to="/about"
            class="d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-dark text-decoration-none sidebar-link"
          >
            <i class="fas fa-info-circle text-secondary"></i>
            <span class="small fw-medium">About</span>
          </RouterLink>
          <RouterLink
            to="/maps"
            class="d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-dark text-decoration-none sidebar-link"
          >
            <i class="fas fa-map text-secondary"></i>
            <span class="small fw-medium">Maps</span>
          </RouterLink>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-grow-1 overflow-auto p-4 bg-light">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.sidebar-zip {
  width: 20rem;
}

.tracking-tight {
  letter-spacing: -0.025em;
}

.sidebar-link:hover {
  background-color: rgba(25, 135, 84, 0.08);
}

.sidebar-link.router-link-active {
  background-color: rgba(25, 135, 84, 0.12);
  color: var(--bs-success);
}

.sidebar-link.router-link-active i {
  color: var(--bs-success);
}

.hover-dark:hover {
  color: var(--bs-dark) !important;
}
</style>
