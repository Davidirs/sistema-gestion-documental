<template>
  <span class="uisheet screen-darken"></span>
  <div id="main" class="header"
    :style="`background: url(${require('@/assets/images/dashboard/top-image.jpg')}); background-size: cover; background-repeat: no-repeat; height: 100vh;position: relative;`">
    <div class="main-img">
      <b-container>
      <div class="d-flex  justify-content-center align-items-center">

        
        <img src="@/assets/img/logo250.png" alt="" width="200"
          class="d-flex  justify-content-lg-end justify-content-sm-center logo-central">
      </div>
        <h1 class="my-4 d-none d-md-block">
          <span>{{ appName }}</span>
        </h1>
        <h4 class="text-white mb-5">"Todos los Derechos, <br>
          <b> Para todas las personas</b>"
        </h4>
        
      </b-container>
    </div>
        <img src="@/assets/img/alcalde.png" alt="" width="400" class="alcalde">
    <b-container>
      <nav class="nav navbar navbar-expand-lg navbar-light top-1 rounded">
        <b-container fluid>
          <a class="navbar-brand mx-2" href="#">
            
        <img src="@/assets/img/logo250.png" alt="" width="75">
            <h5 class="logo-title d-none d-md-block">{{ appName }}</h5>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-2"
            aria-controls="navbar-2" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbar-2">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center align-items-md-start">
              <li class="nav-item me-3 d-none d-md-block">
                <a class="nav-link" aria-current="page" href="#historia">Historia</a>
              </li>
              <li class="nav-item me-3  d-none d-md-block">
                <a class="nav-link" aria-current="page" href="#noticias">Noticias</a>
              </li>
              <li class="nav-item me-3">
              
                <router-link to="consulta" class="btn btn-secondary d-flex align-items-center gap-2" aria-current="page">Consultar</router-link>
                
              </li>
            </ul>
          </div>
        </b-container>
      </nav>
      
    </b-container>
  </div>

  <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28"
    preserveAspectRatio="none" shape-rendering="auto">
    <defs>
      <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
    </defs>
    <g class="parallax">
      <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
      <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
      <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
      <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
    </g>
  </svg>
  <div class="section-card-padding bg-white" id="historia">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <p class="mb-3 text-uppercase">...</p>
          <h2 class="mb-4">Historia de <span class="text-primary">la Alcaldía</span></h2>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
        <b-col lg="4">
          <b-card>

            <div class="d-flex justify-content-start align-items-center mb-3">
              <div class="pe-3">
                <img src="@/assets/images/avatars/02.png" class="rounded-circle p-1 bg-soft-danger" width="60"
                  height="60" alt="1" loading="lazy" />
              </div>
              <div>
                <h5>Las Alcaldías se crean</h5>
              </div>
            </div>
            <div>
              <small> por la descentralización Nacional aprobada por
                modificación de la Ley Orgánica del Poder Público Municipal, donde se aprueba
                la figura de Alcalde como autoridad Administrativa.</small>
            </div>
          </b-card>
        </b-col>
        <b-col lg="4">
          <b-card>
            <div class="d-flex justify-content-start align-items-center mb-3">
              <div class="pe-3">
                <img src="@/assets/images/avatars/02.png" class="rounded-circle p-1 bg-soft-danger" width="60"
                  height="60" alt="1" loading="lazy" />
              </div>
              <div>
                <h5>En 1988</h5>
              </div>
            </div>
            
            <div>
              <small>se realizaron las primeras elecciones de Alcalde y demás autoridades Municipales en gran
                parte del País para un periodo de 4 años..</small>
            </div>
          </b-card>
        </b-col>
        <b-col lg="4">
          <b-card>
            <div class="d-flex justify-content-start align-items-center mb-3">
              <div class="pe-3">
                <img src="@/assets/images/avatars/02.png" class="rounded-circle p-1 bg-soft-danger" width="60"
                  height="60" alt="1" loading="lazy" />
              </div>
              <div>
                <h5>EN este sentido,</h5>
              </div>
            </div>
            <div>
              <small>Para la presente fecha, la Alcaldía está bajo el cargo del Doctor Henry Maldonado Paredes como
                máxima
                autoridad del Municipio Cruz Paredes.</small>
            </div>
          </b-card>
        </b-col>
      </div>
    </div>
  </div>

  <div class="section-padding bg-white">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-12 text-center">
          <p class="mb-2 text-uppercase text-primary">¿Las Conoces?</p>
          <h2 class="text-secondary mb-4">Zonas del Municipio <span class="text-primary">Cruz Paredes</span></h2>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card team-image mb-4 mb-lg-0">
            <TeamWidgetVue :teamImage="require('@/assets/img/represa.jpg')" teamTitle="Represa" teamText="Masparro" />
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card team-image mb-4 mb-lg-0">
            <TeamWidgetVue :teamImage="require('@/assets/img/cienaga.jpeg')" teamTitle="Cienaga"
              teamText="Cruz Blanca" />
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card team-image mb-4 mb-lg-0">
            <TeamWidgetVue :teamImage="require('@/assets/img/alcaldia.png')" teamTitle="Alcaldía"
              teamText="Barrrancas" />
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card team-image mb-4 mb-lg-0">
            <TeamWidgetVue :teamImage="require('@/assets/img/iglesia.png')" teamTitle="Iglesia" teamText="Barrancas" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="inner-box bg-secondary">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 align-items-center">
        <div class="col mb-lg-0 mb-5 d-flex justify-content-center align-items-center">
          <p>Departamento</p>
          <ClientWidget :clientImage="require('@/assets/modules/landing-pages/images/home-1/07.png')" />
        </div>
        <div class="col mb-lg-0 mb-5 d-flex justify-content-center">
          <p>Departamento</p>
          <ClientWidget :clientImage="require('@/assets/modules/landing-pages/images/home-1/08.png')" />
        </div>
        <div class="col mb-lg-0 mb-5 d-flex justify-content-center">
          <p>Departamento</p>
          <ClientWidget :clientImage="require('@/assets/modules/landing-pages/images/home-1/09.png')" />
        </div>
        <div class="col mb-lg-0 mb-5 d-flex justify-content-center">
          <p>Departamento</p>
          <ClientWidget :clientImage="require('@/assets/modules/landing-pages/images/home-1/10.png')" />
        </div>
        <div class="col mb-lg-0 mb-5 d-flex justify-content-center">
          <p>Departamento</p>
          <ClientWidget :clientImage="require('@/assets/modules/landing-pages/images/home-1/11.png')" />
        </div>
      </div>
    </div>
  </div>
  <div class="section-card-padding bg-white" id="noticias">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-12 text-center">
          <p class="mb-2 text-uppercase text-primary">¿Lo sábes?</p>
          <h2 class="text-secondary mb-4">Noticias del Municipio <span class="text-primary">Cruz Paredes</span></h2>
        </div>
        <div class="overflow-hidden slider-circle-btn mt-5" id="app-slider">
          <swiper class="p-0 m-0 mb-2 list-inline" :navigation="{
            nextEl: '#blog-tranding-next',
            prevEl: '#blog-tranding-prev'
          }" :modules="modules" :space-between="32"
            :breakpoints="{ 270: { slidesPerView: 1 }, 550: { slidesPerView: 2 }, 991: { slidesPerView: 3 }, 1400: { slidesPerView: 3 }, 1500: { slidesPerView: 3 }, 1920: { slidesPerView: 3 }, 2040: { slidesPerView: 3 }, 2440: { slidesPerView: 3 } }">
            <swiper-slide class="swiper-slide card-slide card mb-0 overflow-hidden">
              <BlogWidget :blogImage="require('@/assets/modules/landing-pages/images/home-3/02.png')"
                blogTitle="Día de la Resistencia Indígena." blogText="Video" />

            </swiper-slide>
            <swiper-slide class="swiper-slide card-slide card mb-0 overflow-hidden">
              <BlogWidget :blogImage="require('@/assets/modules/landing-pages/images/home-3/03.png')"
                blogTitle="El alcalde Henry menciona evento de coleo." blogText="Video" />

            </swiper-slide>
            <swiper-slide class="swiper-slide card-slide card mb-0 overflow-hidden">
              <BlogWidget :blogImage="require('@/assets/modules/landing-pages/images/home-3/04.png')"
                blogTitle="Conoce acerca del horario que pasa el Aseo Público" blogText="Video" />

            </swiper-slide>
            <swiper-slide class="swiper-slide card-slide card mb-0 overflow-hidden">
              <BlogWidget :blogImage="require('@/assets/modules/landing-pages/images/home-3/02.png')"
                blogTitle="Se han hecho entrega de los uniformes para los obreros." blogText="Video" />


            </swiper-slide>
            <swiper-slide class="swiper-slide card-slide card mb-0 overflow-hidden">
              <BlogWidget :blogImage="require('@/assets/modules/landing-pages/images/home-3/03.png')"
                blogTitle="En el Municipio Cruz Paredes ha ocurrido un apagón." blogText="Video" />

            </swiper-slide>
            <swiper-slide class="swiper-slide card-slide card mb-0 overflow-hidden">
              <BlogWidget :blogImage="require('@/assets/modules/landing-pages/images/home-3/04.png')"
                blogTitle="El alcalde Henry menciona apertura de los juegos." blogText="Video" />

            </swiper-slide>
          </swiper>
          <div class="swiper-button swiper-button-next" id="blog-tranding-next"></div>
          <div class="swiper-button swiper-button-prev" id="blog-tranding-prev"></div>
        </div>
      </div>
    </div>
  </div>

  <FooterComponent />


  <div id="back-to-top" style="display: none">
    <a class="btn btn-primary btn-xs p-0 position-fixed top" id="top" href="#main">
      <svg width="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 15.5L12 8.5L19 15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
          stroke-linejoin="round"></path>
      </svg>
    </a>
  </div>
  <div class="middle" style="display: none">
    <button data-trigger="left-side-bar" @click="show = true" class="d-xl-none btn btn-xs mid-menu" type="button">
      <i class="icon">
        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.75 11.7256L4.75 11.7256" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round"></path>
          <path d="M13.7002 5.70124L19.7502 11.7252L13.7002 17.7502" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </i>
    </button>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

//swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'

//components
import FooterComponent from '@/components/modules/landing-pages/FooterComponent.vue'
import TeamWidgetVue from '@/components/widgets/TeamWidget.vue'
import ClientWidget from '@/components/widgets/ClientWidget.vue'
import BlogWidget from '@/components/widgets/BlogWidget.vue'

export default {
  components: {
    FooterComponent,
    TeamWidgetVue,
    ClientWidget,
    BlogWidget,
    Swiper,
    SwiperSlide
  },
  setup() {
    const store = useStore()
    const appName = computed(() => store.getters['setting/app_name'])
    const show = ref(false)
    return {
      appName,
      show,
      modules: [Navigation]
    }

  }
}
</script>

<style lang="scss">
@import '@/assets/modules/landing-pages/scss/landing-pages.scss';
/* Waves Animation start*/

.hero_area {
  position: relative;
}

.waves {
  position: absolute;
  width: 100%;
  height: 15vh;
  min-height: 100px;
  max-height: 150px;
  bottom: 0;
  left: 0;
}

.parallax>use {
  animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
}

.parallax>use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax>use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax>use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax>use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}


/*Shrinking for mobile*/

@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }
}

/* Waves Animation end*/

h1 {
  font-size: 5.625rem;
}

h2 {
  font-size: 4.188rem;
}

h3 {
  font-size: 3.188rem;
}

h4 {
  font-size: 2.375rem;
}

h5 {
  font-size: 1.750rem;
}

h6 {
  font-size: 1.321rem;
}

p {
  font-size: 1rem;
}

h1 a,
h2 a,
h3 a,
h4 a,
h5 a,
h6 a {
  color: #232D42;
}

small {
  font-size: 0.75rem;
}

.section-padding {
  padding: 9.5rem 1rem 9.5rem 1rem;
}

.section-card-padding {
  padding: 9.5rem 1rem 7.5rem 1rem;
}

.inner-card-box {
  padding: 3rem 0rem 3rem 0rem;
}

.body-bg {
  background: #F5F5F5;
}

.page-bg {
  background: #F9F9F9;
}

h1,
h2,
h3 {
  font-weight: 600;
}

h4,
h5,
h6 {
  font-weight: 500;
}

.inner-box {
  padding: 5rem 0rem 5rem 0rem;
}

.title-top {
  margin-top: 64px;
}

.client-img {
  width: 60%;
}


@media screen and (max-width: 1025px) {
  .landing-pages {
    h1 {
      line-height: 70px;
      font-size: 60px;
    }

    h2 {
      line-height: 55px;
      font-size: 45px;
    }

    h3 {
      line-height: 45px;
      font-size: 35px;
    }

    h4 {
      line-height: 35px;
      font-size: 25px;
    }

    h5 {
      line-height: 30px;
      font-size: 20px;
    }

    h6 {
      line-height: 26px;
      font-size: 16px;
    }

    .section-padding {
      padding-top: 52px;
      padding-right: 16px;
      padding-bottom: 52px;
      padding-left: 16px;
    }

    .section-card-padding {
      padding-top: 52px;
      padding-right: 16px;
      padding-bottom: 20px;
      padding-left: 16px;
    }

    .inner-box {
      padding-top: 50px;
      padding-right: 16px;
      padding-bottom: 50px;
      padding-left: 16px;
    }
  }
}

@media screen and (max-width: 768px) {
  .landing-pages {
    h1 {
      line-height: 55px;
      font-size: 50px;
    }

    h2 {
      line-height: 42px;
      font-size: 32px;
    }

    h3 {
      line-height: 38px;
      font-size: 28px;
    }

    h4 {
      line-height: 32px;
      font-size: 22px;
    }

    h5 {
      line-height: 28px;
      font-size: 18px;
    }

    h6 {
      line-height: 26px;
      font-size: 16px;
    }

    .title-top {
      margin-top: 24px;
    }

    .client-img {
      display: block;
      margin: 0 auto;
      width: auto;
    }

    .sub-header {
      overflow: hidden;
    }
  }
}
.alcalde{
  
  position: absolute;
    right: 1px;
    bottom: 1px;
    z-index: 0;
}
</style>
