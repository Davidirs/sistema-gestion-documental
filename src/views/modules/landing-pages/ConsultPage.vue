<template>
  <section class="login-content">
    <b-row class="m-0 align-items-center bg-white border-bottom">
      <b-col md="6 p-0 vh-100 d-flex justify-content-center align-items-center bg-secondary">
        <b-card class="card-transparent auth-card shadow-none mb-0">
          <router-link :to="{ name: 'default.dashboard' }"
            class="navbar-brand d-flex align-items-center mb-3 text-primary">
            <brand-logo></brand-logo>
            <h4 class="logo-title ms-3 mb-0"><brand-name></brand-name></h4>
          </router-link>
          <!-- <img src="@/assets/images/avatars/01.png" class="rounded avatar-80 mb-3" alt="" /> -->
          <div class="text-center mb-3">

            <h2 class="mb-2">Consultar</h2>
            <h4> datos de empleado.</h4>
          </div>

          <form @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-lg-12">
                <div class="floating-label form-group">
                  <label for="CI" class="form-label">Ingrese cédula de identidad</label>
                  <input type="number" class="form-control" id="CI" aria-describedby="CI" v-model="ci"
                    placeholder="12345678" />
                </div>
              </div>
            </div>
            <b-button type="submit" variant="primary">Consultar</b-button>

          </form>
        </b-card>
        <div class="sign-bg">
          <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.05">
              <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857"
                transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF"></rect>
              <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857"
                transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF"></rect>
              <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857"
                transform="rotate(45 61.9355 138.545)" fill="#3B8AFF"></rect>
              <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857"
                transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF"></rect>
            </g>
          </svg>
        </div>
      </b-col>
      <div :class="{'d-none d-md-block': !employee}"  class="col-md-6 bg-ondas p-0 vh-100 overflow-auto" :style="{ backgroundImage: `url(${require('@/assets/images/auth/04.png')})` }" >
        <div v-if="employee" class="rounded p-3">
          <profile-widget
    :name="employee.name"
    :uid="employee.uid"
    :position="employee.position"
    :entrydate="employee.entrydate"
    :fileslocation="employee.fileslocation"
    :department="employee.department"
    :url="employee.url"
  />
        </div>

        <!-- <img src="@/assets/images/auth/04.png" class="img-fluid gradient-main animated-scaleX" alt="images"
          loading="lazy" /> -->
        <div id="profile-profile" class="tab-pane fade">
        </div>
      </div>
    </b-row>
  </section>
</template>


<script>

//import router from '@/router';
//import authService from '@/services/authService'
import dbService from '@/services/dbService'
import ProfileWidget from '@/components/widgets/users/ProfileWidget.vue'

import Swal from 'sweetalert2'
export default {
  components: {
    ProfileWidget
  },

  data() {
    return {
      ci: '',
      employee:null
    };
  },
  methods: {
    async handleSubmit() { //swal cargando
      Swal.fire({
        title: 'Consultando...',
        html: 'Por favor, espere...',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      console.log('ci:', this.ci);
      this.employee =null
      this.employee = await dbService.getEmployeeByCI(String(this.ci))
     
      if (this.employee) {
        console.log('Empleado encontrado'+this.employee.url);
        Swal.fire({
          icon: "success",
          title: "Excelente",
          text: "El número de cédula si corresponde con un empleado.",
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "No encontrado",
          text: "El número de cédula no corresponde con algún empleado.",
        });
      }
    },
  },
};
</script>
