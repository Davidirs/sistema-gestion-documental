<template>
  <header class="d-flex align-items-center w-100">

    <img src="https://i.ibb.co/bXJLPMR/Alcald-a-Cruz-Paredes.jpg" alt="" class="col-2">
    <div class="col-8 text-center">

      <h5>ALCALDIA DEL MUNICIPIO CRUZ PAREDES</h5>
      <h5>DIRECCIÓN DE SEGURIDAD CIUDADANA</h5>
    </div>
    <img src="https://i.ibb.co/Q9CswY8/dsec.jpg" alt="" class="col-2">

  </header>

  <section class="p-5 w-100 bg-img minheight" >
    <div v-if="employee != null">
      <h5><!-- <b>Nombres:</b> --> {{ name }}</h5>
      <!-- <br>
<h5><b>Apellidos:</b> {{lastname}}</h5> -->
      <br>
      <h5><b>C.I.:</b> {{ ci }}</h5>
      <br>
      <h5><b>Profesión:</b> {{ profession }}</h5>
      <br>
      <h5><b>Cargo:</b> {{ cargo }}</h5>
      <br>
      <h5><b>Fecha de Ingreso:</b> {{ entrydate }}</h5>
      <br>

      <footer class="p-5">
        <h5>
          Rif.: 200002387
        </h5>
      </footer>

  </div>
  </section>
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
      profession: '',
      cargo: '',
      entrydate: '',
      employee: null
    };
  },
  mounted() {
    this.handleSubmit()
  },
  methods: {
    async handleSubmit() {
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
        this.profession = this.employee.profession;
        this.cargo = this.employee.position;
        this.entrydate = this.employee.entrydate;
      } else {
        this.employee = null
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
<style>
.bg-img {
  background-image: url('https://i.ibb.co/RSDLmVK/dsec-transparente.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

}
.minheight{
  min-height: 60vh;
}

body {
  background-color: white;
}
</style>