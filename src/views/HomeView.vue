<template>
  <div class="container py-5">
    <!-- Hero -->
    <div class="row align-items-center mb-5">
      <div class="col-lg-7">
        <span class="badge bg-primary mb-3">Benvingut</span>
        <h1 class="display-4 fw-bold mb-4">La millor plataforma de registre en línia</h1>
        <p class="lead text-muted mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <div class="d-flex gap-3 flex-wrap">
          <router-link to="/register1" class="btn btn-primary btn-lg px-4">
            <i class="bi bi-person-plus me-2"></i>Register 1
          </router-link>
          <router-link to="/register2" class="btn btn-outline-primary btn-lg px-4">
            <i class="bi bi-ui-checks me-2"></i>Register 2
          </router-link>
        </div>
      </div>
      <div class="col-lg-5 text-center mt-5 mt-lg-0">
        <div class="bg-primary bg-opacity-10 rounded-4 p-5">
          <i class="bi bi-person-circle text-primary" style="font-size: 8rem;"></i>
        </div>
      </div>
    </div>

    <hr class="my-5" />

    <!-- Features -->
    <h2 class="text-center fw-bold mb-5">Per què escollir-nos?</h2>
    <div class="row g-4 mb-5">
      <div class="col-md-4" v-for="feature in features" :key="feature.title">
        <div class="card h-100 border-0 shadow-sm">
          <div class="card-body text-center p-4">
            <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width:60px;height:60px;">
              <i :class="feature.icon" class="text-primary fs-4"></i>
            </div>
            <h5 class="card-title fw-bold">{{ feature.title }}</h5>
            <p class="card-text text-muted">{{ feature.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Lorem Ipsum sections -->
    <div class="row g-4">
      <div class="col-md-6">
        <h4 class="fw-bold mb-3">Seguretat garantida</h4>
        <p class="text-muted">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </p>
        <p class="text-muted">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
      </div>
      <div class="col-md-6">
        <h4 class="fw-bold mb-3">Fàcil d'usar</h4>
        <p class="text-muted">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
          voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
          cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.
        </p>
        <p class="text-muted">
          Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet
          ut et voluptates repudiandae sint et molestiae non recusandae.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const features = [
  {
    icon: 'bi bi-shield-check',
    title: 'Seguretat',
    text: 'Les teves dades estan protegides amb els estàndards de seguretat més avançats del mercat.',
  },
  {
    icon: 'bi bi-lightning-charge',
    title: 'Rapidesa',
    text: "Procés de registre optimitzat per completar-se en menys d'un minut.",
  },
  {
    icon: 'bi bi-headset',
    title: 'Suport 24/7',
    text: "El nostre equip d'atenció al client està disponible en tot moment per ajudar-te.",
  },
]
</script>
