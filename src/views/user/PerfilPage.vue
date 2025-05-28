<template>
  <b-row>
    <b-col lg="12">
      <b-card>
        <div class="d-flex flex-wrap align-items-center justify-content-between">
          <div class="d-flex flex-wrap align-items-center justify-content-around">
            <div v-if="user" >

                  <img v-if="user.photoURL" :src="user.photoURL" alt="profile-img"
                  class="rounded-pill avatar-80 img-fluid" loading="lazy" />
                  <img v-else src="@/assets/images/avatars/01.png" alt="profile-img"
                  class="rounded-pill avatar-80 img-fluid" loading="lazy" />
                </div>
            <div v-else class="profile-img position-relative me-3 mb-3 mb-lg-0 profile-logo profile-logo1">
              <img src="@/assets/images/avatars/01.png" alt="User-Profile"
                class="theme-color-default-img img-fluid rounded-pill avatar-100" loading="lazy" />
              <img src="@/assets/images/avatars/avtar_1.png" alt="User-Profile"
                class="theme-color-purple-img img-fluid rounded-pill avatar-100" loading="lazy" />
              <img src="@/assets/images/avatars/avtar_2.png" alt="User-Profile"
                class="theme-color-blue-img img-fluid rounded-pill avatar-100" loading="lazy" />
              <img src="@/assets/images/avatars/avtar_4.png" alt="User-Profile"
                class="theme-color-green-img img-fluid rounded-pill avatar-100" loading="lazy" />
              <img src="@/assets/images/avatars/avtar_5.png" alt="User-Profile"
                class="theme-color-yellow-img img-fluid rounded-pill avatar-100" loading="lazy" />
              <img src="@/assets/images/avatars/avtar_3.png" alt="User-Profile"
                class="theme-color-pink-img img-fluid rounded-pill avatar-100" loading="lazy" />
                
            </div>
            <div v-if="user" class="d-flex flex-wrap align-items-center ms-3 mb-3 mb-sm-0">
              <h4 class="me-2 h4">{{ user.displayName ?? "Administrador" }}</h4>
              <span> - {{ user.email }}</span>
            </div>
          </div>
          <ul class="d-flex nav nav-pills mb-0 text-center profile-tab" data-toggle="slider-tab" id="profile-pills-tab"
            role="tablist">
            <!-- <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#profile-feed" role="tab" aria-selected="false">Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#profile-activity" role="tab" aria-selected="false">Activity</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#profile-friends" role="tab" aria-selected="false">Friends</a>
            </li> -->
            <!-- <li class="nav-item">
              <a class="nav-link active show" data-bs-toggle="tab" href="#profile-profile" role="tab"
                aria-selected="false">Perfil</a>
            </li> -->
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalCrearEmpleado">Editar Perfil</button>
    
          </ul>
        </div>
      </b-card>
    </b-col>
    <!-- <b-col lg="3">
      <news-widget></news-widget>
      <gallery-widget :list="gallery"></gallery-widget>
      <twitter-widget :list="feeds" />
    </b-col> -->
    <b-col lg="6">
      <div class="profile-content tab-content iq-tab-fade-up">
        <!-- <div id="profile-feed" class="tab-pane fade">
          <feed-widget name="Anna Sthesia" person1="Monty Carlo" person2="Paul Molive" />
        </div>
        <div id="profile-activity" class="tab-pane fade">
          <activity-widget />
        </div>
        <div id="profile-friends" class="tab-pane fade">
          <friends-widget :list="friends" />
        </div> 
        -->

        <div v-if="user" id="profile-profile" class="tab-pane fade  active show">
          <b-card no-body class="mb-3">
            <b-card-header>
              <div class="header-title">
                <h4 class="card-title">{{ user.rol ?? "Empleado" }}</h4>
              </div>
            </b-card-header>
            <b-card-body>
              <div class="text-center d-flex justify-content-around align-items-center">
                <div>
                  <img v-if="user.photoURL" :src="user.photoURL" alt="profile-img"
                    class="rounded-pill avatar-80 img-fluid" loading="lazy" />
                  <img v-else src="@/assets/images/avatars/01.png" alt="profile-img"
                    class="rounded-pill avatar-80 img-fluid" loading="lazy" />
                </div>
                <div class="mt-2 d-flex flex-column">
                  <h4 class="d-inline-block">{{ user.displayName }}</h4>
                  <h5 class="d-inline-block pl-3">{{ user.email }}</h5>
                </div>
              </div>
            </b-card-body>
          </b-card>
          <b-card no-body>
            <b-card-header>
              <div class="header-title">
                <h4 class="card-title">Acerca de</h4>
              </div>
            </b-card-header>
            <b-card-body>
              <div class="user-bio">
              </div>
              <div class="mt-1">
                <h6>Imagen:</h6>
                <p>

                  <a :href="user.photoURL" class="text-body" target="_blank">Click para ver imagen</a>
                </p>
              </div>
              <div class="mt-1">
                <h6>Rol:</h6>
                <p>{{ user.rol }}</p>
              </div>
              <div class="mt-1">
                <h6>Identificador:</h6>
                <p>{{ user.uid }}</p>
              </div>
              
            </b-card-body>
          </b-card>
        </div>
      </div>
    </b-col>
    <!-- Modal añadir empleado-->
    <b-card no-body class="modal fade" id="modalCrearEmpleado" data-bs-backdrop="static" data-bs-keyboard="false"
      tabindex="-1" aria-labelledby="modalCrearEmpleadoLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <b-card-header header-class="d-flex justify-content-between">
            <h1 class="modal-title fs-5" id="modalCrearEmpleadoLabel">
              Editar Perfil de Administrador</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </b-card-header>
          <div class="modal-body bg-blue200">
            <b-card-body>
              <form @submit.prevent="handleSubmitCrear">
                <b-form-group>
                  <label for="input-101" class="form-label">Nombre</label>
                  <b-form-input id="input-101" type="text" placeholder="Nombre del Administrador" v-model="name"
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
                  <div v-if="previewImage" class="mt-3">
                    <label class="form-label">Vista previa:</label>
                    <img :src="previewImage" alt="Vista previa de la imagen"
                      style="max-width: 200px; max-height: 200px;">
                  </div>
                </b-form-group>

                <b-form-group>
                  <b-form-checkbox v-model="isChange">Cambiar contraseña</b-form-checkbox>
                </b-form-group>
                <b-form-group v-if="isChange">
                  <label for="input-105" class="form-label">Contraseña Actual</label>
                  <b-form-input id="input-105" type="number" placeholder="Contraseña" v-model="password"
                    required></b-form-input>
                </b-form-group>
                <b-form-group v-if="isChange">
                  <label for="input-105" class="form-label">Nueva Contraseña</label>
                  <b-form-input id="input-105" type="number" placeholder="Contraseña" v-model="passwordNew"
                    required></b-form-input>
                </b-form-group>
                <b-form-group v-if="isChange">
                  <label for="input-101" class="form-label">Repetir nueva contraseña</label>
                  <b-form-input id="input-101" type="text" placeholder="Repetir nueva Contraseña" v-model="passwordConfirm"
                    required></b-form-input>
                </b-form-group>
                <div class="d-flex gap-2 flex-wrap">
                  <b-button variant="danger" data-bs-dismiss="modal" aria-label="Close"
                    @Click="limpiarVariables()">Cancelar</b-button>
                  <b-button type="submit" variant="primary" 
                    aria-label="Close">Aceptar</b-button>
                </div>
              </form>
            </b-card-body>
          </div>
        </div>
      </div>
    </b-card>
    <!-- <b-col lg="3">
      <div class="card">
        <div class="card-header">
          <div class="header-title">
            <h4 class="card-title">About</h4>
          </div>
        </div>
        <div class="card-body">
          <p>Lorem ipsum dolor sit amet, contur adipiscing elit.</p>
          <div class="mb-1">Email: <a href="#" class="ms-3">nikjone@demoo.com</a></div>
          <div class="mb-1">Phone: <a href="#" class="ms-3">001 2351 256 12</a></div>
          <div>Location: <span class="ms-3">USA</span></div>
        </div>
      </div>
      <story-widget :list="story" />
      <suggestion-widget :list="suggestion" />
    </b-col> -->
  </b-row>
</template>
<script>
/* import NewsWidget from '@/components/widgets/users/NewsWidget.vue'
import GalleryWidget from '@/components/widgets/users/GalleryWidget.vue'
import TwitterWidget from '@/components/widgets/users/TwitterWidget.vue'
import StoryWidget from '@/components/widgets/users/StoryWidget.vue'
import SuggestionWidget from '@/components/widgets/users/SuggestionWidget.vue'
import ActivityWidget from '@/components/widgets/users/ActivityWidget.vue'
import FriendsWidget from '@/components/widgets/users/FriendsWidget.vue'
import FeedWidget from '@/components/widgets/users/FeedWidget.vue' */
//import ProfileWidget from '@/components/widgets/users/ProfileWidget.vue'
import authService from '@/services/authService.js'
import dbService from '@/services/dbService'
import { ref, onMounted } from 'vue';
import User from '@/models/user';
//import Employee from '@/models/employee';
import storageService from '@/services/storageService';

const Swal = require('sweetalert2')
export default {
  components: {
    /* NewsWidget,
    TwitterWidget,
    StoryWidget,
    SuggestionWidget,
    GalleryWidget,
    ActivityWidget,
    FriendsWidget,
    FeedWidget, */
    //ProfileWidget
  },
  setup() {
    const feeds = [
      {
        image: require('@/assets/images/icons/03.png'),
        heading: 'Figma Community',
        subHeading: '@figma20',
        language1: '#HTML',
        language2: '#Bootstrap',
        date: '07 Jan 2021'
      },
      {
        image: require('@/assets/images/icons/04.png'),
        heading: 'FLutter',
        subHeading: '@jane59',
        language1: '#JS',
        language2: '#Bootstrap',
        date: '18 Feb 2021'
      },
      {
        image: require('@/assets/images/icons/02.png'),
        heading: 'Blender',
        subHeading: '@blender59',
        language1: '#HTML',
        language2: '#CSS',
        date: '15 Mar 2021'
      }
    ]
    const friends = [
      {
        image: require('@/assets/images/avatars/01.png'),
        name: 'Paul Molive',
        designation: 'Web Designer'
      },
      {
        image: require('@/assets/images/avatars/05.png'),
        name: 'Paul Molive',
        designation: 'Trainee'
      },
      {
        image: require('@/assets/images/avatars/02.png'),
        name: 'Anna Mull',
        designation: 'Web Developer'
      },
      {
        image: require('@/assets/images/avatars/03.png'),
        name: 'Paige Turne',
        designation: 'Trainee'
      },
      {
        image: require('@/assets/images/avatars/04.png'),
        name: 'Barb Ackue',
        designation: 'Web Designer'
      },
      {
        image: require('@/assets/images/avatars/05.png'),
        name: 'Greta Life',
        designation: 'Tester'
      },
      {
        image: require('@/assets/images/avatars/03.png'),
        name: 'Ira Membrit',
        designation: 'Android Developer'
      },
      {
        image: require('@/assets/images/avatars/02.png'),
        name: 'Pete Sariya',
        designation: 'Web Designer'
      }
    ]
    const gallery = [
      {
        image: require('@/assets/images/icons/04.png')
      },
      {
        image: require('@/assets/images/shapes/02.png')
      },
      {
        image: require('@/assets/images/icons/06.png')
      },
      {
        image: require('@/assets/images/shapes/04.png')
      },
      {
        image: require('@/assets/images/icons/02.png')
      },
      {
        image: require('@/assets/images/shapes/06.png')
      },
      {
        image: require('@/assets/images/icons/05.png')
      },
      {
        image: require('@/assets/images/shapes/05.png')
      },
      {
        image: require('@/assets/images/icons/01.png')
      }
    ]
    const story = [
      {
        image: require('@/assets/images/icons/06.png'),
        design: 'Web Design',
        time: '1 hour ago'
      },
      {
        image: require('@/assets/images/icons/03.png'),
        design: 'App Design',
        time: '4 hour ago'
      },
      {
        image: require('@/assets/images/icons/07.png'),
        design: 'Abstract Design',
        time: '9 hour ago'
      }
    ]
    const suggestion = [
      {
        image: require('@/assets/images/icons/05.png'),
        name: 'Paul Molive',
        mutualFriends: '4 mutual friends'
      },
      {
        image: require('@/assets/images/icons/03.png'),
        name: 'Robert Fox',
        mutualFriends: '4 mutual friends'
      },
      {
        image: require('@/assets/images/icons/06.png'),
        name: 'Jenny Wilson',
        mutualFriends: '6 mutual friends'
      },
      {
        image: require('@/assets/images/icons/07.png'),
        name: 'Cody Fisher',
        mutualFriends: '8 mutual friends'
      },
      {
        image: require('@/assets/images/icons/04.png'),
        name: 'Bessie Cooper',
        mutualFriends: '1 mutual friends'
      },
      {
        image: require('@/assets/images/icons/02.png'),
        name: 'Wade Warren',
        mutualFriends: '3 mutual friends'
      },
      {
        image: require('@/assets/images/icons/01.png'),
        name: 'Guy Hawkins',
        mutualFriends: '12 mutual friends'
      },
      {
        image: require('@/assets/images/icons/08.png'),
        name: 'Floyd Miles',
        mutualFriends: '2 mutual friends'
      }

    ]
    const user = ref(null);


    const name = ref('');
    const password = ref('');
    const passwordNew = ref('');
    const passwordConfirm = ref('');
    const isChange = ref(false);

    const selectedFile = ref(null);
    const previewImage = ref(null);

    // Obtener usuario cuando el componente se monta
    onMounted(async () => {
      const uid = localStorage.getItem('user');
      user.value = await dbService.getUser(uid);
      console.log('user', user.value);
      name.value = user.value.displayName || '';
    });
    const handleFileChange= ( (event) => {
      selectedFile.value = event.target.files[0];
      console.log('selectedFile.value ', selectedFile.value);
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          previewImage.value = reader.result; // No necesitas .value aquí
        };
        reader.readAsDataURL(file);
      } else {
        previewImage.value = null;
      }
    });

    const handleSubmitCrear = (async () => {
      console.log('Name:', name);
      console.log('password:', password);
      console.log('passwordNew:', passwordNew);
      console.log('passwordConfirm:', passwordConfirm);
      console.log('isChange:', isChange);


      let userdata = new User({
        displayName: name.value,
        email: user.value.email,
        rol: 'Administrador',
        uid: user.value.uid,
        photoURL: '',
      });
      console.log('selectedFile.type', selectedFile.value);
      
      let temp = {
        href: `profile/${userdata.uid}/perfil.jpg`,
        url: ""
      }
if (isChange.value) {
        if (passwordNew.value !== passwordConfirm.value) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden',
          });
          return;
        }else {
          let userCredential = await authService.signIn(userdata.email, password.value);
          if (userCredential) {
        
            await authService.updatePassword(password.value);
          }else{
            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar la contraseña',
          });
          return;
          }
        }}
        
const cancelButton = document.querySelector('button[data-bs-dismiss="modal"]');
cancelButton.click();

      Swal.fire({
        title: 'Guardando Usuario...',
        html: 'Por favor, espere...',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      await dbService.addUser(userdata.toJson())
        await storageService.uploadImagAdmin(selectedFile.value, temp,userdata.toJson())
      
      
      
        Swal.fire({
          icon: "success",
          title: "Administrador actualizado!",
          showConfirmButton: false,
          timer: 1500
        });
        console.log('Administrador actualizado');
        /*  this.fetchData();
         this.limpiarVariables() */
     
    });
    return {
      feeds,
      story,
      suggestion,
      gallery,
      friends,
      user,
      name,
      password,
      passwordNew,
      passwordConfirm,
      isChange,
      selectedFile,
      previewImage,
      handleSubmitCrear,
      handleFileChange
    }
  },



}
</script>
