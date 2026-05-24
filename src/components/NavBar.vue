<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">
        <i class="bi bi-person-badge me-2"></i>Act2Vue
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto gap-1">
          <li class="nav-item">
            <router-link class="nav-link px-3 rounded" active-class="active bg-white text-primary fw-semibold" exact to="/">
              <i class="bi bi-house me-1"></i>Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-3 rounded" active-class="active bg-white text-primary fw-semibold" to="/about">
              <i class="bi bi-info-circle me-1"></i>About Us
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-3 rounded" active-class="active bg-white text-primary fw-semibold" to="/register1">
              <i class="bi bi-clipboard-check me-1"></i>Register 1
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-3 rounded" active-class="active bg-white text-primary fw-semibold" to="/register2">
              <i class="bi bi-ui-checks me-2"></i>Register 2
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
