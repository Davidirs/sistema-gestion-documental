<template>
  <section class="login-content">
    <b-row class="m-0 align-items-center bg-white h-100">
      <b-col md="6">
        <b-row class="justify-content-center">
          <b-col md="10">
            <b-card class="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card iq-auth-form">
              <router-link :to="{ name: 'default.dashboard' }"
                class="navbar-brand d-flex align-items-center mb-3 text-primary flex-column flex-lg-row justify-content-center justify-content-lg-start ">
                <brand-logo></brand-logo>
                <h5 class="logo-title ms-3 mb-0" data-setting="app_name"><brand-name></brand-name></h5>
              </router-link>
              <h2 class="mb-2 text-center">Inicio de sesión</h2>
              <p class="text-center">Inicia sesión y mantente conectado.</p>
              <form @submit.prevent="handleSubmit">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="email" class="form-label">Correo</label>
                      <input type="email" class="form-control" id="email" v-model="email" required />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="password" class="form-label">Contraseña</label>
                      <input type="password" class="form-control" id="password" v-model="password" required />
                    </div>
                  </div>
                  <div class="col-lg-12 d-flex justify-content-between">
                    <div class="form-check mb-3">
                      <input type="checkbox" class="form-check-input" id="customCheck1" v-model="rememberMe" />
                      <label class="form-check-label" for="customCheck1">Recuerdame</label>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-primary">Iniciar sesión</button>
                </div>
              </form>
            </b-card>
          </b-col>
        </b-row>
        <div class="sign-bg">
          <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.05">
              <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857"
                transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF" />
              <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857"
                transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF" />
              <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857"
                transform="rotate(45 61.9355 138.545)" fill="#3B8AFF" />
              <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857"
                transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF" />
            </g>
          </svg>
        </div>
      </b-col>
      <div class="col-md-6 d-md-block d-none bg-primary p-0 vh-100 overflow-hidden">
        <img src="@/assets/images/auth/01.png" class="img-fluid gradient-main animated-scaleX" alt="images"
          loading="lazy" />
      </div>
    </b-row>
  </section>
</template>

<script>

import router from '@/router';
import authService from '@/services/authService'
import dbService from '@/services/dbService'
export default {

  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
    };
  },
  methods: {
    async handleSubmit() {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      console.log('Remember Me:', this.rememberMe);

      let userCredential = await authService.signIn(this.email, this.password)

      if (userCredential) {
         await dbService.addUser(userCredential.user);
         console.log('Login exitoso');
         router.replace('/dashboard');
        }else{
         console.log('Verificar credenciales');

       }
    },
  },
};
</script>

<style lang="scss" scoped></style>
