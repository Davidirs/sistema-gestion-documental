<template>
  <b-card no-body>
    <b-card-header>
      <div class="header-title">
        <h4 class="card-title">{{rol ??"Empleado"}}</h4>
      </div>
    </b-card-header>
    <b-card-body>
      <div class="text-center d-flex justify-content-center align-items-center">
        <div>
          <img v-if="url" :src="url" alt="profile-img" class="rounded-pill avatar-80 img-fluid" loading="lazy" />
          <img v-else src="@/assets/images/avatars/01.png" alt="profile-img" class="rounded-pill avatar-80 img-fluid" loading="lazy" />
        </div>
        <div class="mt-2 d-flex flex-column">
          <h4 class="d-inline-block">{{ name }}</h4>
          <h5 class="d-inline-block pl-3">{{uid}}</h5>
          </div>
      </div>
    </b-card-body>
  </b-card>
  <b-card  no-body>
    <b-card-header>
      <div class="header-title">
        <h4 class="card-title">Acerca de</h4>
      </div>
    </b-card-header>
    <b-card-body>
      <div class="user-bio">
      </div>
      <div class="mt-1">
        <h6>Dirección:</h6>
        <p>{{ department }}</p>
      </div>
      <div class="mt-1">
        <h6>Fecha de entrada:</h6>
        <p>{{ entrydate }}</p>
      </div>
      <div class="mt-1">
        <h6>Cargo:</h6>
        <p>{{ position }}</p>
      </div>
      <div class="mt-1">
        <h6>Ubicación de expedientes:</h6>
        <p>
          <a href="#" class="text-body"> {{ fileslocation }}</a>
        </p>
      </div>
      <!-- <div class="mt-2">
        <h6 class="mb-1">Url:</h6>
        <p>
          <a href="#" class="text-body" target="_blank"> {{ url }} </a>
        </p>
      </div>
      <div class="mt-2">
        <h6 class="mb-1">Contact:</h6>
        <p>
          <a href="#" class="text-body">{{ number }}</a>
        </p>
      </div> -->
    </b-card-body>
  </b-card>
</template>
<script>
export default {
  props: {
    uid: { type: String, required: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    entrydate: { type: String, required: true },
    fileslocation: { type: String, required: true },
    rol: { type: String },
    url: { type: String}
  }
}
</script>
