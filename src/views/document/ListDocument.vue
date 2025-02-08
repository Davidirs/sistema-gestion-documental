<template>

  <b-row>
    <b-col sm="12">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title d-flex justify-content-between align-items-center">
            <h4 class="card-title">Lista de Documentos</h4>

          </div>
          <div class="d-flex align-items-center">
            <button class="btn btn-primary" @click="fetchData">Todos</button>
            
              <b-form-select :options="listEmployee.value" id="input-1303" required @change="handleEmployeeChange" />
            
          </div>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalCrearDocumento"
          :disabled="JSON.stringify(selectedEmployee.value) === '{}'" >Añadir</button>
        </div>
        <div class="card-body px-0">
          <div class="table-responsive">
            <table id="user-list-table" class="table table-striped" role="grid" data-toggle="data-table">
              <thead>
                <tr class="ligth">
                  <th classs="text-center">#</th>
                  <th classs="text-center">Imagen</th>
                  <th>Título</th>
                  <th>Empleado</th>
                  <th>Fecha de vencimiento</th>
                  <!-- <th>Ubicación de los expedientes</th> -->
                  <th style="min-width: 100px">Acciones</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in tableData.value" :key="index">
                  <td>{{ index + 1 }}
                  </td>
                  <td class="text-center"><img class="bg-soft-primary rounded img-fluid avatar-40 me-3" 
                    :src="imageMap[obtenerExtension(item.href)] || defaultImage"
                     alt="profile" loading="lazy" />
                    </td>
                  <td>{{ item.title }}</td>
                  <td>{{ item.employee }}</td>
                  <td>{{ item.enddate }}</td>
                  <!-- <td>{{ item.fileslocation }}</td> -->
                  <td>
                    <div class="flex align-items-center list-user-action">
                      <a class="btn btn-sm btn-icon btn-success mx-1" data-bs-toggle="tooltip" data-bs-placement="top"
                        title="Ver" :href="item.url" target="_blank">
                        <span class="btn-inner">
                          <icon-component type="outlined" icon-name="eye" />
                        </span>
                      </a>
                      <!-- <button class="btn btn-sm btn-icon btn-warning mx-1" data-bs-placement="top"
                        data-bs-original-title="Edit" data-bs-toggle="modal" data-bs-target="#modalEditarDocumento"
                        @click="setUpdate(item)">
                        <span class="btn-inner">
                          <icon-component type="outlined" icon-name="pencil-alt" />
                        </span>
                      </button> -->
                      <button class="btn btn-sm btn-icon btn-danger mx-1" data-bs-toggle="tooltip"
                        data-bs-placement="top" data-bs-original-title="Delete" @click="deleteDocument(item)">
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
              <p>Si no hay documentos, por favor cree alguno.</p>
            </div>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>


  <!-- Modal añadir documento-->
  <b-card no-body class="modal fade" id="modalCrearDocumento" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="modalCrearDocumentoLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <b-card-header header-class="d-flex justify-content-between">
          <h1 class="modal-title fs-5" id="modalCrearDocumentoLabel">
            Crear documento</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </b-card-header>
        <div class="modal-body bg-blue200">
          <b-card-body>
            <form @submit.prevent="handleSubmitCrear(selectedEmployee.value)">
              <b-form-group>
                <h6>{{ selectedEmployee.text }}</h6>
              </b-form-group>
              <b-form-group>
                <label for="input-101" class="form-label">Nombre</label>
                <b-form-input id="input-101" type="text" placeholder="Nombre del documento" v-model="title"
                  required></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-107" class="form-label">Fecha de Vencimiento </label>
                <b-form-input id="input-107" type="date" placeholder="2019-12-18" v-model="enddate"
                  required></b-form-input>
              </b-form-group>
              <!-- <b-form-group>
                <label for="input-101" class="form-label">Ubicación de los expedientes</label>
                <b-form-input id="input-101" type="text" placeholder="Ubicación" v-model="fileslocation"
                  required></b-form-input>
              </b-form-group> -->
              <b-form-group>
                <label for="input-101" class="form-label">Documento</label>

                <div class="form-group mb-0">
                  <input type="file" class="form-control" aria-label="file example" required=""
                    @change="handleFileChange" />
                </div>
              </b-form-group>
              <div class="d-flex gap-2 flex-wrap">
                <b-button id="closeCreate"  variant="danger" data-bs-dismiss="modal" aria-label="Close"
                  @Click="limpiarVariables()">Cancelar</b-button>
                <b-button type="submit" variant="primary" >Aceptar</b-button>
              </div>
            </form>
          </b-card-body>
        </div>
      </div>
    </div>
  </b-card>
  <b-card no-body class="modal fade" id="modalEditarDocumento" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="modalEditarDocumentoLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <b-card-header header-class="d-flex justify-content-between">
          <h1 class="modal-title fs-5" id="modalEditarDocumentoLabel">Editar Documento</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </b-card-header>
        <div class="modal-body bg-blue200">
          <b-card-body>
            <form @submit.prevent="handleSubmitEditar">
              <b-form-group>
                <label for="input-101" class="form-label">Nombre</label>
                <b-form-input id="input-101" type="text" placeholder="Nombre del documento" v-model="itemToUpdate.title"
                  required></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-107" class="form-label">Fecha de vencimiento </label>
                <b-form-input id="input-107" type="date" placeholder="2019-12-18"
                  v-model="itemToUpdate.enddate"></b-form-input>
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
//import Document from '@/models/document';
import dbService from '@/services/dbService';
import storageService from '@/services/storageService';

const Swal = require('sweetalert2')
import { ref } from 'vue';

import pngIcon from '@/assets/images/icons/png.png';
import jpgIcon from '@/assets/images/icons/jpg.png';
import pdfIcon from '@/assets/images/icons/pdf.png';
import docIcon from '@/assets/images/icons/doc.png';
import zipIcon from '@/assets/images/icons/zip.png';
import archivoIcon from '@/assets/images/icons/archivo.png'; // Imagen por defecto


export default {
  setup() {
    const listEmployee = ref([]);

    const tableData = ref([]);
    //const listDepartment = ref([]);
    const itemToUpdate = ref({});
    const selectedEmployee = ref({});
    const title = ref('');
    const enddate = ref('');
    //const fileslocation = ref('');

    const selectedFile = ref(null);
    const uploadProgress = ref(0);
    const downloadURL = ref(null);





    //const isLoading = ref(false); // Optional loading state

    return {
      tableData,
      listEmployee,
      selectedEmployee,
      itemToUpdate,
      title,
      enddate,
      //fileslocation,
      selectedFile,
      uploadProgress,
      downloadURL,
      imageMap: {
        png: pngIcon,
        jpg: jpgIcon,
        jpeg: jpgIcon,
        pdf: pdfIcon,
        docx: docIcon,
        doc: docIcon,
        zip: zipIcon,
      },
      defaultImage: archivoIcon, 
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
console.log(this.selectedEmployee.value)
      let employee = await dbService.getEmployees();
      this.listEmployee.value = employee.map(dep => ({
        value: dep.uid,
        text: dep.name
      }));
      this.tableData.value = await dbService.getAllDocuments();
      /* let departments = await dbService.getEmployees();
      this.listEmployee.value = departments.map(dep => ({
          value: dep.id,
          text: dep.name
        })); */
      //this.tableData.value = await dbService.getDocuments();
      this.limpiarVariables();
    },

    async handleSubmitCrear(emp) {
      console.log('title:', this.title);
      console.log('enddate:', this.enddate);
      //console.log('fileslocation:', this.fileslocation);
      console.log('selectedFile:', this.selectedFile);
      console.log('selectedEmployee:', emp);
if(this.selectedFile){
  
      let documento = {
        uid: emp.value,
        employee: emp.text,
        title: this.title,
        enddate: this.enddate,
        //fileslocation: this.fileslocation,
        fileName: this.selectedFile.name,
        url: '',
        href: `documents/${emp.value}/${this.title}-${this.selectedFile.name}`,
      };
      
      documento.url = await storageService.uploadFile(this.selectedFile, documento)
      console.log('url:', documento);
      this.tableData.value.push(documento)
      //para  cerrar el modal
      const boton = document.getElementById('closeCreate');
      boton.click();
    }else{
      Swal.fire({
          icon: "info",
          title: "Seleccione otro archivo!",
          showConfirmButton: false,
          timer: 1500
        });
    }
    },
    async handleSubmitEditar() {
      //para  cerrar el modal
      const boton = document.getElementById('closeEdit');
      boton.click();
      let documentCreated = await dbService.updateDocument(this.itemToUpdate)
      console.log('documentCreated:', documentCreated);
      if (documentCreated) {
        Swal.fire({
          icon: "success",
          title: "Documento actualizado!",
          showConfirmButton: false,
          timer: 1500
        });
        console.log('Documento actualizado');
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

    async deleteDocument(document) {
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

          let documentDeleted = await dbService.deleteDocument(document);
          await storageService.deleteDocument(document.href)
          if (documentDeleted) {
            Swal.fire({
              icon: "success",
              title: "Documento eliminado!",
              showConfirmButton: false,
              timer: 1500
            });
            console.log('Documento eliminado');
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
      console.log('limpiarVariables');
      
      this.title = '';
      this.enddate = '';
      this.selectedEmployee.value = {};
      this.itemToUpdate.value = {};
      this.selectedFile= null;
      console.log(this.selectedFile );
    },
    setUpdate(item) {
      console.log(item);
      this.itemToUpdate = item;

    },
    handleFileChange(event) {
      
      this.selectedFile = event.target.files[0];
      console.log('this.selectedFile ',this.selectedFile);
    },
    async handleEmployeeChange(nameEmployee) {
      
      // Optionally, access the full selected employee object using listEmployee
      const object = this.listEmployee.value.find(
        (employee) => employee.value === nameEmployee
      );
      this.selectedEmployee.value = object
      this.tableData.value = await dbService.listDocuments(object.value);
      if (object) {
        console.log("Selected employee object:", this.selectedEmployee.value);
      } else {
        console.warn("Selected employee object not found in listEmployee");
      }
    },
    obtenerExtension(nombreArchivo) {
      if (!nombreArchivo) return null; // Manejar archivos sin extensión
      const indicePunto = nombreArchivo.lastIndexOf('.');
      if (indicePunto > 0) {
        return nombreArchivo.substring(indicePunto + 1).toLowerCase();
      }
      return null; // Si no tiene extensión, se devuelve null
    },

  },
}
</script>