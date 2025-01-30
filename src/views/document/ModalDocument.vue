<template>
  
        <b-card-body>
          <b-form>
            <b-form-group>
              <label for="input-101" class="form-label">Input Text</label>
              <b-form-input id="input-101" type="text" placeholder="Mark Jhon"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="input-102" class="form-label">Email Input</label>
              <b-form-input id="input-102" type="email" placeholder="markjhon@gmail.com"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="input-103" class="form-label">Url Input </label>
              <b-form-input id="input-103" type="url" placeholder="https://getbootstrap.com"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="input-104" class="form-label">Teliphone Input </label>
              <b-form-input id="input-104" type="tel" placeholder="1-(555)-555-5555"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="input-105" class="form-label">Number Input </label>
              <b-form-input id="input-105" type="number" placeholder="2356"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="input-106" class="form-label">Password Input </label>
              <b-form-input id="input-106" type="password" :value="'markjhon123'">markjhon123</b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="input-107" class="form-label">Date Input </label>
              <b-form-input id="input-107" type="date" placeholder="2019-12-18"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="input-108" class="form-label">Week Input </label>
              <b-form-input id="input-108" type="text" placeholder="2019-W46"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="input-109" class="form-label">Time Input </label>
              <b-form-input id="input-109" type="time" placeholder="13:45"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="input-110" class="form-label">Date and Time Input </label>
              <b-form-input id="input-110" type="date" placeholder="2019-12-19T13:45:00"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="input-111" class="form-label">Example textarea </label>
              <b-form-textarea id="input-111" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
            </b-form-group>
            <div class="d-flex gap-2 flex-wrap">
              <b-button variant="danger">Cancelar</b-button>
              <b-button variant="primary">Aceptar</b-button>
            </div>
          </b-form>
        </b-card-body>
      
</template>

<script setup>
/* const ageOptions = [
  { value: null, text: 'Please select your age' },
  { value: 'child', text: '0-18' },
  { value: 'Young', text: '19-30' },
  { value: 'adult', text: '31-49' },
  { value: 'senior-citizen', text: '50-99' }
]

const options01 = [
  { value: null, text: 'Please select options' },
  { value: '1', text: '1' },
  { value: '2', text: '2' },
  { value: '3', text: '3' },
  { value: '4', text: '4' }
]

const options02 = [
  { value: null, text: 'Please select options' },
  { value: '1', text: '1' },
  { value: '2', text: '2' },
  { value: '3', text: '3' },
  { value: '3', text: '4' },
  { value: '3', text: '5' },
  { value: '3', text: '6' },
  { value: '3', text: '7' },
  { value: '4', text: '8' }
] */
</script>
