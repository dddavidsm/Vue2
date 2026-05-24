<template>
  <div class="container py-5">
    <div class="row mb-5">
      <div class="col-lg-8 mx-auto text-center">
        <span class="badge bg-primary mb-3">Sobre nosaltres</span>
        <h1 class="display-5 fw-bold mb-4">About Us</h1>
        <p class="lead text-muted">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>

    <!-- Mission & Vision -->
    <div class="row g-4 mb-5">
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body p-4">
            <div class="d-flex align-items-center mb-3">
              <div class="bg-primary rounded-circle p-2 me-3">
                <i class="bi bi-bullseye text-white fs-5"></i>
              </div>
              <h4 class="card-title fw-bold mb-0">La nostra missió</h4>
            </div>
            <p class="text-muted">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p class="text-muted">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum et dolorum fuga.
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body p-4">
            <div class="d-flex align-items-center mb-3">
              <div class="bg-success rounded-circle p-2 me-3">
                <i class="bi bi-eye text-white fs-5"></i>
              </div>
              <h4 class="card-title fw-bold mb-0">La nostra visió</h4>
            </div>
            <p class="text-muted">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo.
            </p>
            <p class="text-muted">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Team -->
    <h2 class="text-center fw-bold mb-5">El nostre equip</h2>
    <div class="row g-4 mb-5">
      <div class="col-sm-6 col-lg-3" v-for="member in team" :key="member.name">
        <div class="card border-0 shadow-sm text-center h-100">
          <div class="card-body p-4">
            <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width:80px;height:80px;">
              <i class="bi bi-person text-primary" style="font-size:2.5rem;"></i>
            </div>
            <h6 class="fw-bold mb-1">{{ member.name }}</h6>
            <small class="text-primary">{{ member.role }}</small>
            <p class="text-muted mt-2 small">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="row g-4 bg-primary text-white rounded-4 p-4 mx-0">
      <div class="col-6 col-md-3 text-center" v-for="stat in stats" :key="stat.label">
        <div class="display-6 fw-bold">{{ stat.value }}</div>
        <div class="small opacity-75">{{ stat.label }}</div>
      </div>
    </div>

    <!-- Lorem extra -->
    <div class="row mt-5">
      <div class="col-lg-8 mx-auto">
        <h4 class="fw-bold mb-3">La nostra història</h4>
        <p class="text-muted">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
          voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
          cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
          est laborum et dolorum fuga.
        </p>
        <p class="text-muted">
          Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta
          nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere
          possimus, omnis voluptas assumenda est, omnis dolor repellendus.
        </p>
        <p class="text-muted">
          Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet
          ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
          tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const team = [
  { name: 'Anna García', role: 'CEO & Fundadora', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.' },
  { name: 'Marc Rodríguez', role: 'CTO', bio: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.' },
  { name: 'Laura Martínez', role: 'Dissenyadora UX', bio: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.' },
  { name: 'Pau López', role: 'Desenvolupador', bio: 'Excepteur sint occaecat cupidatat non proident sunt in culpa qui.' },
]

const stats = [
  { value: '10K+', label: 'Usuaris registrats' },
  { value: '5', label: "Anys d'experiència" },
  { value: '99%', label: 'Satisfacció' },
  { value: '24/7', label: 'Suport' },
]
</script>
