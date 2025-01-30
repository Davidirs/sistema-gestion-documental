<template>

  <b-row>
    <b-col sm="12">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title d-flex justify-content-between">
            <h4 class="card-title">Lista de Empleados</h4>

          </div>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalCrearEmpleado">Añadir</button>
        </div>
        <div class="card-body px-0">
          <div class="table-responsive">
            <table id="user-list-table" class="table table-striped" role="grid" data-toggle="data-table">
              <thead>
                <tr class="ligth">
                  <th classs="text-center">#</th>
                  <th classs="text-center">Imagen</th>
                  <th>Nombre completo</th>
                  <th>Cedula</th>
                  <th>Departamento</th>
                  <th>Cargo</th>
                  <th>Año de ingreso</th>
                  <th>Ubicación de los expedientes</th>
                  <th style="min-width: 100px">Acciones</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in tableData.value" :key="index">
                  <td>{{ index + 1 }}
                  </td>
                  <td class="text-center"><img class="bg-soft-primary rounded img-fluid avatar-40 me-3"
                      :src="require('@/assets/images/shapes/03.png')" alt="profile" loading="lazy" /></td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.ci }}</td>
                  <td>{{ item.department }}</td>
                  <td>{{ item.position }}</td>
                  <td>{{ item.entrydate }}</td>
                  <td>{{ item.fileslocation }}</td>
                  <td>
                    <div class="flex align-items-center list-user-action">
                      <!-- <a class="btn btn-sm btn-icon btn-success mx-1" data-bs-toggle="tooltip" data-bs-placement="top"
                        title="Add" href="#">
                        <span class="btn-inner">
                          <icon-component type="outlined" icon-name="user-add" />
                        </span>
                      </a> -->
                      <button class="btn btn-sm btn-icon btn-warning mx-1" data-bs-placement="top"
                        data-bs-original-title="Edit" data-bs-toggle="modal" data-bs-target="#modalEditarEmpleado"
                        @click="setUpdate(item)">
                        <span class="btn-inner">
                          <icon-component type="outlined" icon-name="pencil-alt" />
                        </span>
                      </button>
                      <button class="btn btn-sm btn-icon btn-danger mx-1" data-bs-toggle="tooltip"
                        data-bs-placement="top" data-bs-original-title="Delete" @click="deleteEmployee(item.uid)">
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
              <p>Si no hay empleados, por favor cree alguno.</p>
            </div>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>


  <!-- Modal añadir empleado-->
  <b-card no-body class="modal fade" id="modalCrearEmpleado" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="modalCrearEmpleadoLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <b-card-header header-class="d-flex justify-content-between">
          <h1 class="modal-title fs-5" id="modalCrearEmpleadoLabel">
            Crear empleado</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </b-card-header>
        <div class="modal-body bg-blue200">
          <b-card-body>
            <form @submit.prevent="handleSubmitCrear">
              <b-form-group>
                <label for="input-101" class="form-label">Nombre</label>
                <b-form-input id="input-101" type="text" placeholder="Nombre del empleado"
                  v-model="name" required></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-105" class="form-label">Cédula de Identidad</label>
                <b-form-input id="input-105" type="number" placeholder="12345678" v-model="ci" required></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-1303" class="form-label">Seleccione Departamento</label>
                <b-form-select v-model="department" :options="listDepartment.value" id="input-1303" required />
              </b-form-group>
              <b-form-group>
                <label for="input-101" class="form-label">Cargo</label>
                <b-form-input id="input-101" type="text" placeholder="Cargo del empleado"
                  v-model="position" required></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-107" class="form-label">Fecha de Ingreso </label>
                <b-form-input id="input-107" type="date" placeholder="2019-12-18" v-model="entrydate" required></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-101" class="form-label">Ubicación de los expedientes</label>
                <b-form-input id="input-101" type="text" placeholder="Ubicación" v-model="fileslocation" required></b-form-input>
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
  <b-card no-body class="modal fade" id="modalEditarEmpleado" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="modalEditarEmpleadoLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <b-card-header header-class="d-flex justify-content-between">
          <h1 class="modal-title fs-5" id="modalEditarEmpleadoLabel">Editar Empleado</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </b-card-header>
        <div class="modal-body bg-blue200">
          <b-card-body>
            <form @submit.prevent="handleSubmitEditar">
              <b-form-group>
                <label for="input-101" class="form-label">Nombre</label>
                <b-form-input id="input-101" type="text" placeholder="Nombre del empleado" v-model="itemToUpdate.name"
                  required></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-105" class="form-label">Cédula de Identidad</label>
                <b-form-input id="input-105" type="number" placeholder="12345678" v-model="itemToUpdate.ci" required></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-1303" class="form-label">Seleccione Departamento</label>
                <b-form-select v-model="itemToUpdate.department" :options="listDepartment.value" id="input-1303" required />
              </b-form-group>
              <b-form-group>
                <label for="input-101" class="form-label">Cargo</label>
                <b-form-input id="input-101" type="text" placeholder="Cargo del empleado"
                  v-model="itemToUpdate.position" required></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-107" class="form-label">Fecha de Ingreso </label>
                <b-form-input id="input-107" type="date" placeholder="2019-12-18" v-model="itemToUpdate.entrydate" required></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-101" class="form-label">Ubicación de los expedientes</label>
                <b-form-input id="input-101" type="text" placeholder="Ubicación" v-model="itemToUpdate.fileslocation" required></b-form-input>
              </b-form-group>
              <div class="d-flex gap-2 flex-wrap">
                <b-button variant="danger" data-bs-dismiss="modal" aria-label="Close"
                  @Click="limpiarVariables()">Cancelar</b-button>
                <b-button type="submit" variant="primary" data-bs-dismiss="modal" aria-label="Close">Guardar</b-button>
              </div>
            </form>
          </b-card-body>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import Employee from '@/models/employee';
import dbService from '@/services/dbService';

const Swal = require('sweetalert2')
import { ref } from 'vue';

export default {
  setup() {
    const tableData = ref([]);
    const listDepartment = ref([]);
    const itemToUpdate = ref([]);
    const name = ref('');
    const ci = ref('');
    const department = ref('');
    const position = ref('');
    const entrydate = ref('');
    const fileslocation = ref('');





    //const isLoading = ref(false); // Optional loading state

    return {
      tableData,
      listDepartment,
      itemToUpdate,
      name,
      ci,
      department,
      position,
      entrydate,
      fileslocation,
      //isLoading,
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      let departments = await dbService.getDepartments();
      this.listDepartment.value = departments.map(dep => ({
          value: dep.id,
          text: dep.name
        }));
      this.tableData.value = await dbService.getEmployees();
      this.limpiarVariables();
    },

    async handleSubmitCrear() {
      console.log('Name:', this.name);
      console.log('ci:', this.ci);
      console.log('department:', this.department);
      console.log('position:', this.position);
      console.log('entrydate:', this.entrydate);
      console.log('fileslocation:', this.fileslocation);
      let employee = new Employee({
        uid: 'uid',
        name: this.name,
        ci: this.ci,
        department: this.department,
        position: this.position,
        entrydate: this.entrydate,
        fileslocation: this.fileslocation,
      });
      let employeeCreated = await dbService.addEmployee(employee.toJson())
      console.log('employeeCreated:', employeeCreated);
      if (employeeCreated) {
        Swal.fire({
          icon: "success",
          title: "Empleado creado!",
          showConfirmButton: false,
          timer: 1500
        });
        console.log('Empleado Creado');
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
      let employeeCreated = await dbService.updateEmployee(this.itemToUpdate)
      console.log('employeeCreated:', employeeCreated);
      if (employeeCreated) {
        Swal.fire({
          icon: "success",
          title: "Empleado actualizado!",
          showConfirmButton: false,
          timer: 1500
        });
        console.log('Empleado actualizado');
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

    async deleteEmployee(uid) {
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

          let employeeDeleted = await dbService.deleteEmployee(uid);
          if (employeeDeleted) {
            Swal.fire({
              icon: "success",
              title: "Empleado eliminado!",
              showConfirmButton: false,
              timer: 1500
            });
            console.log('Empleado eliminado');
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