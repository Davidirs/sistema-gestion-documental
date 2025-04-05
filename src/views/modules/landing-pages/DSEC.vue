<template>
  <header class="d-flex align-items-center w-100 pt-3">

    <img src="https://i.ibb.co/bXJLPMR/Alcald-a-Cruz-Paredes.jpg" alt="" class="col-2">
    <div class="col-8 text-center">

      <h5>ALCALDIA DEL MUNICIPIO CRUZ PAREDES</h5>
      <h5>DIRECCIÓN DE SEGURIDAD CIUDADANA</h5>
    </div>
    <img src="https://i.ibb.co/Q9CswY8/dsec.jpg" alt="" class="col-2">

  </header>

  <section class="p-5 w-100 bg-img minheight d-flex justify-content-between">
    <div v-if="employee != null">
      <h5><b>Nombre y Apellido:</b><br> {{ name }}</h5>
      <!-- <br>
<h5><b>Apellidos:</b> {{lastname}}</h5> -->
      <br>
      <h5><b>Cédula de Identidad:</b><br> V-{{ ci }}</h5>
      <br>
      <h5><b>Grupo sanguíneo:</b><br> {{ bloodgroup }}</h5>
      <br>
      <h5><b>Cargo:</b><br> {{ cargo }}</h5>
      <br>
      <h5><b>Fecha de Ingreso:</b><br> {{ formatDate(entrydate) }}</h5>
      <br>




    </div>
    <div v-if="employee != null" class="col-4 img-perfil" :style="{ backgroundImage: `url('${image}')` }">
      <!-- <img :src="image" class="img-fluid w-100" alt=""> -->
    </div>

  </section>
  <center class="text-white">
    <h3>"Todos los derechos para todas las personas."</h3>
    <footer style="background-color: #2958a6;">
      <h5 class="p-3 text-white text-bold">
        G-20000238-7
      </h5>
    </footer>
  </center>
</template>


<script>

//import router from '@/router';
//import authService from '@/services/authService'
import dbService from '@/services/dbService'
//import ProfileWidget from '@/components/widgets/users/ProfileWidget.vue'

import Swal from 'sweetalert2'
export default {
  components: {
    // ProfileWidget
  },

  data() {
    return {
      name: '',
      lastname: '',
      ci: '',
      bloodgroup: '',
      cargo: '',
      entrydate: '',
      employee: null,
      image: ''
    };
  },
  mounted() {
    this.handleSubmit()
  },
  methods: {

    async handleSubmit() {
      Swal.fire({
        title: 'Buscando empleado...',
        html: 'Por favor, espere...',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      try {




        const urlParams = new URLSearchParams(window.location.search);
        this.ci = urlParams.get('ci');

        console.log('ci:', this.ci);
        this.employee = null
        this.employee = await dbService.getEmployeeByCI(String(this.ci)
        )

        if (this.employee && this.employee.department == 'Dirección de seguridad ciudadana') {
          console.log('Empleado encontrado');
          console.log(this.employee);
          this.name = this.employee.name;
          this.lastname = this.employee.lastname;
          this.ci = this.employee.uid;
          this.bloodgroup = this.employee.bloodgroup;
          this.cargo = this.employee.position;
          this.entrydate = this.employee.entrydate;
          this.image = (this.employee.url === undefined || this.employee.url === '')
            ? require('@/assets/img/placeholder-profile.jpg')
            : this.employee.url;
          console.log(this.image);
          // Operación exitosa
          Swal.fire({
            icon: 'success',
            title: '¡Empleado encontrado!',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          this.employee = null
          Swal.fire({
            icon: "info",
            title: "No encontrado",
            text: "El número de cédula no corresponde con algún empleado.",
          });
        }
        /* 
                // Operación exitosa
                Swal.fire({
                  icon: 'success',
                  title: '¡Sesión iniciada!',
                  showConfirmButton: false,
                  timer: 1500,
                }); */
      } catch (error) {
        // Operación fallida
        Swal.fire({
          icon: 'error',
          title: 'Algo salió mal',
          text: 'Intentalo de nuevo más tarde.',
        });
      }
    },
    formatDate(yyyy_mm_dd) {
  const parts = yyyy_mm_dd.split('-');
  if (parts.length === 3) {
    const yyyy = parts[0];
    const mm = parts[1];
    const dd = parts[2];
    return `${dd}-${mm}-${yyyy}`;
  } else {
    return "Formato de fecha incorrecto";
  }
},
  },
  
};
</script>
<style>
.bg-img {
  background-image: url('https://i.ibb.co/RSDLmVK/dsec-transparente.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

}

.minheight {
  min-height: 60vh;
}

body {
  background-color: white;
}

.img-perfil {
  border-radius: 50%;
  border: 5px solid #2958a6;
  max-width: 200px;
  max-height: 200px;
  height: 25vw;
  height: 25vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

}
</style>