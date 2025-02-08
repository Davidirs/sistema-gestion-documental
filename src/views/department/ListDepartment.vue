<template>
  <b-row>
    <b-col sm="12">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title d-flex justify-content-between">
            <h4 class="card-title">Lista de Direcciones</h4>

          </div>
          <button class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#modalCrearDepartamento">Añadir</button>
        </div>
        <div class="card-body px-0">
          <div class="table-responsive">
            <table id="user-list-table" class="table table-striped" role="grid" data-toggle="data-table">
              <thead>
                <tr class="ligth">
                  <th classs="text-center">#</th>
                  <th classs="text-center">Item</th>
                  <th>Name</th>
                  <th style="min-width: 100px">Acciones</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in tableData.value" :key="index">
                  <td>{{ index + 1 }}
                  </td>
                  <td>
                    <img class="bg-soft-primary rounded img-fluid avatar-40 me-3"
                      :src="require('@/assets/images/shapes/06.png')" alt="profile" loading="lazy" />
                  </td>
                  <td>{{ item.name }}</td>
                  <td>
                    <div class="flex align-items-center list-user-action">
                      <!-- <a class="btn btn-sm btn-icon btn-success mx-1" data-bs-toggle="tooltip" data-bs-placement="top"
                        title="Add" href="#">
                        <span class="btn-inner">
                          <icon-component type="outlined" icon-name="user-add" />
                        </span>
                      </a> -->
                      <button class="btn btn-sm btn-icon btn-warning mx-1" data-bs-placement="top"
                        data-bs-original-title="Edit" data-bs-toggle="modal" data-bs-target="#modalEditarDepartamento"
                        @click="setUpdate(item)">
                        <span class="btn-inner">
                          <icon-component type="outlined" icon-name="pencil-alt" />
                        </span>
                      </button>
                      <button class="btn btn-sm btn-icon btn-danger mx-1" data-bs-toggle="tooltip"
                        data-bs-placement="top" data-bs-original-title="Delete" @click="deleteDepartment(item.uid)">
                        <span class="btn-inner">
                          <icon-component type="outlined" icon-name="trash" />
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-center">
              <p>Si no hay direcciones, por favor cree alguno.</p>
            </div>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>


  <!-- Modal añadir dirección-->
  <b-card no-body class="modal fade" id="modalCrearDepartamento" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="modalCrearDepartamentoLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <b-card-header header-class="d-flex justify-content-between">
          <h1 class="modal-title fs-5" id="modalCrearDepartamentoLabel">
            Crear dirección</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </b-card-header>
        <div class="modal-body bg-blue200">
          <b-card-body>
            <form @submit.prevent="handleSubmitCrear">
              <b-form-group>
                <label for="input-101" class="form-label">Nombre</label>
                <b-form-input id="input-101" type="text" placeholder="Nombre de la dirección" v-model="name"
                  required></b-form-input>
              </b-form-group>
              <div class="d-flex gap-2 flex-wrap">
                <b-button variant="danger" data-bs-dismiss="modal" aria-label="Close"
                  @Click="limpiarVariables()">Cancelar</b-button>
                <b-button type="submit" variant="primary" data-bs-dismiss="modal" aria-label="Close">Aceptar</b-button>
              </div>
            </form>
          </b-card-body>
        </div>
      </div>
    </div>
  </b-card>
  <b-card no-body class="modal fade" id="modalEditarDepartamento" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="modalEditarDepartamentoLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <b-card-header header-class="d-flex justify-content-between">
          <h1 class="modal-title fs-5" id="modalEditarDepartamentoLabel">Editar Departamento</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </b-card-header>
        <div class="modal-body bg-blue200">
          <b-card-body>
            <form @submit.prevent="handleSubmitEditar">
              <b-form-group>
                <label for="input-101" class="form-label">Nombre</label>
                <b-form-input id="input-101" type="text" placeholder="Nombre de la dirección"
                  v-model="itemToUpdate.name" required></b-form-input>
              </b-form-group>
              <div class="d-flex gap-2 flex-wrap">
                <b-button id="closeEdit" variant="danger" data-bs-dismiss="modal" aria-label="Close"
                  @Click="limpiarVariables()">Cancelar</b-button>
                <b-button type="submit" variant="primary">Guardar</b-button>
              </div>
            </form>
          </b-card-body>
        </div>
      </div>
    </div>
  </b-card>
</template>
<script>
import Department from '@/models/departament';
import dbService from '@/services/dbService';

const Swal = require('sweetalert2')
import { ref } from 'vue';

export default {
  setup() {
    const tableData = ref([]);
    const itemToUpdate = ref([]);
    const name = ref('');
    //const isLoading = ref(false); // Optional loading state

    return {
      tableData,
      itemToUpdate,
      name,
      //isLoading,
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.tableData.value = await dbService.getDepartments();
      this.limpiarVariables();
      console.log(this.tableData.length);

    },

    async handleSubmitCrear() {
      console.log('Name:', this.name);
      let department = new Department({
        uid: 'uid',
        name: this.name
      });
      let departmentCreated = await dbService.addDepartment(department.toJson())
      console.log('departmentCreated:', departmentCreated);
      if (departmentCreated) {
        Swal.fire({
          icon: "success",
          title: "Departamento creado!",
          showConfirmButton: false,
          timer: 1500
        });
        console.log('Departamento Creado');
        this.fetchData();
        this.limpiarVariables()
      } else {
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "Algo ha salido mal!",
        });
        console.log('Algo salió mal');
      }
    },
    async handleSubmitEditar() {
      //para  cerrar el modal
      const boton = document.getElementById('closeEdit');
      boton.click();
      let departmentCreated = await dbService.updateDepartment(this.itemToUpdate)
      console.log('departmentCreated:', departmentCreated);
      if (departmentCreated) {
        Swal.fire({
          icon: "success",
          title: "Departamento actualizado!",
          showConfirmButton: false,
          timer: 1500
        });
        console.log('Departamento actualizado');
        this.fetchData();
        this.limpiarVariables()
      } else {
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "Algo ha salido mal!",
        });
        console.log('Algo salió mal');
      }
    },

    async deleteDepartment(uid) {
      Swal.fire({
        title: "¿Estás Seguro?",
        text: "No puedes revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminarlo!"
      }).then(async (result) => {
        if (result.isConfirmed) {

          let departmentDeleted = await dbService.deleteDepartment(uid);
          if (departmentDeleted) {
            Swal.fire({
              icon: "success",
              title: "Departamento eliminado!",
              showConfirmButton: false,
              timer: 1500
            });
            console.log('Departamento eliminado');
            this.fetchData();
          } else {
            Swal.fire({
              icon: "error",
              title: "Ups...",
              text: "Algo ha salido mal!",
            });
            console.log('Algo salió mal');
          }
        }
      });
    },
    limpiarVariables() {
      this.name = '';
    },
    setUpdate(item) {
      console.log(item);
      this.itemToUpdate = item;

    }
  },
}
</script>
