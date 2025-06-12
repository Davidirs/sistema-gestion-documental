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
                  <th>Grupo sanguíneo</th>
                  <th>Año de ingreso</th>
                  <!-- <th>Ubicación de los expedientes</th> -->
                  <th style="min-width: 100px">Acciones</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in paginatedData" :key="item?.uid">
  <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                  <td class="text-center"><img class="bg-soft-primary rounded img-fluid avatar-40 me-3"
                      :src="item.url? item.url :require('@/assets/images/avatars/01.png')" alt="profile" loading="lazy" /></td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.uid }}</td>
                  <td>{{ item.department }}</td>
                  <td>{{ item.position }}</td>
                  <td>{{ item.bloodgroup }}</td>
                  <td>{{ formatDate(item.entrydate)}}</td>
                  <!-- <td>{{ item.fileslocation }}</td> -->
                  <td>
                    <div class="flex align-items-center list-user-action">
                      <a class="btn btn-sm btn-icon btn-success mx-1" data-bs-toggle="tooltip" data-bs-placement="top"
                        title="Ver" :href="`/dsec?ci=${item.uid}`" target="_blank">
                        <span class="btn-inner">
                          <icon-component type="outlined" icon-name="eye" />
                        </span>
                      </a>
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
             <nav class="mt-3">
  <ul class="pagination justify-content-center">
    <li class="page-item" :class="{ disabled: currentPage === 1 }">
      <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">Anterior</button>
    </li>

    <li class="page-item disabled">
      <span class="page-link">Página {{ currentPage }} de {{ totalPages }}</span>
    </li>

    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
      <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">Siguiente</button>
    </li>
  </ul>
</nav>
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
                <b-form-input id="input-101" type="text" placeholder="Nombre del empleado" v-model="name"
                  required></b-form-input>
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
                <b-form-input id="input-101" type="text" placeholder="Cargo del empleado" v-model="position"
                  required></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-101" class="form-label">Grupo Sanguíneo</label>
                <b-form-input id="input-101" type="text" placeholder="Grupo sanguíneo del empleado" v-model="bloodgroup"
                  required></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-107" class="form-label">Fecha de Ingreso </label>
                <b-form-input id="input-107" type="date" placeholder="2019-12-18" v-model="entrydate"
                  required></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-101" class="form-label">Foto tipo carnet</label>
                <div class="form-group mb-0">
                  <input type="file" class="form-control" aria-label="file example" required=""
                    @change="handleFileChange" />
                </div>
              </b-form-group>
              <b-form-group>
              <div v-if="previewImage" class="mt-3">
                <label class="form-label">Vista previa:</label>
                <img :src="previewImage" alt="Vista previa de la imagen" style="max-width: 200px; max-height: 200px;">
              </div>
              </b-form-group>
              <!-- <b-form-group>
                <label for="input-101" class="form-label">Ubicación de los expedientes</label>
                <b-form-input id="input-101" type="text" placeholder="Ubicación" v-model="fileslocation" required></b-form-input>
              </b-form-group> -->
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
            <form @submit.prevent="handleSubmitEditar" v-if="itemToUpdate">
              <b-form-group>
                <label for="input-101" class="form-label">Nombre</label>
                <b-form-input id="input-101" type="text" placeholder="Nombre del empleado" v-model="itemToUpdate.name"
                  required></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-105" class="form-label">Cédula de Identidad</label>
                <b-form-input id="input-105" type="text" placeholder="12345678" v-model="itemToUpdate.uid"
                  disabled></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-1303" class="form-label">Seleccione Departamento</label>
                <b-form-select v-model="itemToUpdate.department" :options="listDepartment.value" id="input-1303"
                  required />
              </b-form-group>
              <b-form-group>
                <label for="input-101" class="form-label">Cargo</label>
                <b-form-input id="input-101" type="text" placeholder="Cargo del empleado"
                  v-model="itemToUpdate.position" required></b-form-input>
              </b-form-group>

              <b-form-group>
                <label for="input-101" class="form-label">Grupo Sanguíneo</label>
                <b-form-input id="input-101" type="text" placeholder="Grupo sanguíneo del empleado" v-model="itemToUpdate.bloodgroup"
                  required></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="input-107" class="form-label">Fecha de Ingreso </label>
                <b-form-input id="input-107" type="date" placeholder="18-12-2019" v-model="itemToUpdate.entrydate" locale="es"
                  required></b-form-input>
              </b-form-group>
              
              <b-form-group>
                <label for="input-101" class="form-label">Foto tipo carnet</label>
                <div class="form-group mb-0">
                  <input type="file" class="form-control" aria-label="file example"
                    @change="handleFileChange" />
                </div>
              </b-form-group>
              <b-form-group>
              <div class="mt-3 d-flex justify-content-around align-items-center">
                <label class="form-label">Vista previa:</label>
                <img :src="previewImage?previewImage:itemToUpdate.url?itemToUpdate.url:require('@/assets/images/avatars/01.png')" alt="Vista previa de la imagen" style="max-width: 200px; max-height: 200px;">
              </div>
              </b-form-group>
              <!-- <b-form-group>
                <label for="input-101" class="form-label">Ubicación de los expedientes</label>
                <b-form-input id="input-101" type="text" placeholder="Ubicación" v-model="itemToUpdate.fileslocation" required></b-form-input>
              </b-form-group> -->
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

<script setup>
import Employee from '@/models/employee'
import dbService from '@/services/dbService'
import storageService from '@/services/storageService'
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'

const tableData = ref([])
const listDepartment = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)

const name = ref('')
const ci = ref('')
const department = ref('')
const position = ref('')
const entrydate = ref('')
const bloodgroup = ref('')
const fileslocation = ref('')
const previewImage = ref(null)
const selectedFile = ref(null)
const itemToUpdate = ref(null)

// Computed para paginación
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return tableData.value.slice(start, end)
})

const totalPages = computed(() =>
  Math.ceil(tableData.value.length / itemsPerPage.value)
)

// Cargar datos iniciales
const fetchData = async () => {
  const departments = await dbService.getDepartments()
  listDepartment.value = departments.map(dep => ({
    value: dep.id,
    text: dep.name,
  }))
  tableData.value = await dbService.getEmployees()
  limpiarVariables()
}

// Crear empleado
const handleSubmitCrear = async () => {
  let employee = new Employee({
    uid: String(ci.value),
    name: name.value,
    department: department.value,
    position: position.value,
    entrydate: entrydate.value,
    bloodgroup: bloodgroup.value,
    fileslocation: "n/a",
    url: '',
    href: `profile/${String(ci.value)}/perfil.jpg`,
  })

  Swal.fire({ title: 'Creando...', allowOutsideClick: false, showConfirmButton: false, willOpen: () => Swal.showLoading() })

  employee.url = await storageService.uploadImagProfile(selectedFile.value, employee.toJson())

  const result = await dbService.addEmployee(employee.toJson())

  if (result) {
    Swal.fire({ icon: 'success', title: 'Creado!', timer: 1500, showConfirmButton: false })
    await fetchData()
  } else {
    Swal.fire({ icon: 'error', title: 'Error al crear' })
  }
}

// Editar empleado
const handleSubmitEditar = async () => {
  const modal = document.getElementById('closeEdit')
  modal?.click()

  if (previewImage.value) itemToUpdate.value.url = previewImage.value
  if (!itemToUpdate.value.url) itemToUpdate.value.url = ''
  itemToUpdate.value.href = `profile/${String(itemToUpdate.value.uid)}/perfil.jpg`

  itemToUpdate.value.url = await storageService.uploadImagProfile(selectedFile.value, itemToUpdate.value.toJson())
  const result = await dbService.updateEmployee(itemToUpdate.value.toJson())

  if (result) {
    Swal.fire({ icon: 'success', title: 'Empleado actualizado', timer: 1500, showConfirmButton: false })
    await fetchData()
  } else {
    Swal.fire({ icon: 'error', title: 'Error al actualizar' })
  }
}

// Eliminar empleado
const deleteEmployee = async (uid) => {
  const confirm = await Swal.fire({
    title: '¿Seguro?',
    text: 'No podrás deshacer esto',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
  })

  if (confirm.isConfirmed) {
    const result = await dbService.deleteEmployee(uid)
    if (result) {
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500 })
      await fetchData()
    } else {
      Swal.fire({ icon: 'error', title: 'Error al eliminar' })
    }
  }
}

// Utilidades
const limpiarVariables = () => {
  name.value = ''
  ci.value = ''
  department.value = ''
  position.value = ''
  entrydate.value = ''
  bloodgroup.value = ''
  fileslocation.value = ''
  previewImage.value = null
  selectedFile.value = null
}

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0]
  const reader = new FileReader()
  reader.onloadend = () => {
    previewImage.value = reader.result
  }
  reader.readAsDataURL(event.target.files[0])
}

const setUpdate = (item) => {
  itemToUpdate.value = new Employee(item)
  previewImage.value = item.url
}

const formatDate = (yyyy_mm_dd) => {
  const [yyyy, mm, dd] = yyyy_mm_dd.split('-')
  return `${dd}-${mm}-${yyyy}`
}

onMounted(fetchData)
</script>
