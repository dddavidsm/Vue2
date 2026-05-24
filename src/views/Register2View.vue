<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">

        <h2 class="fw-bold text-center mb-1">Registre 2 — VeeValidate + Yup</h2>
        <p class="text-center text-muted mb-4">
          Validació declarativa amb <code>useForm</code> / <code>useField</code> + esquema Yup → JSON Server
        </p>

        <!-- Error de connexió -->
        <div v-if="apiError" class="alert alert-danger alert-dismissible">
          {{ apiError }}
          <button type="button" class="btn-close" @click="apiError = null"></button>
        </div>

        <!-- Confirmació d'èxit -->
        <div v-if="registered" class="card border-success text-center p-5 shadow-sm">
          <i class="bi bi-check-circle-fill text-success fs-1"></i>
          <h4 class="mt-3">Registre completat!</h4>
          <p class="text-muted">
            Benvingut/da, <strong>{{ registeredUser.nom }} {{ registeredUser.cognoms }}</strong>
            (ID: <code>{{ registeredUser.id }}</code>)
          </p>
          <button class="btn btn-primary mt-2" @click="startOver">Nou registre</button>
        </div>

        <!-- Formulari -->
        <form v-if="!registered" @submit.prevent="onSubmit" class="card p-4 shadow-sm" novalidate>

          <!-- DADES PERSONALS -->
          <h6 class="text-primary fw-bold border-bottom pb-2 mb-3">Dades personals</h6>

          <div class="row g-3 mb-3">
            <!-- Nom -->
            <div class="col-md-6">
              <label class="form-label">Nom *</label>
              <input
                v-bind="nomField"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': nomError, 'is-valid': nomMeta.dirty && !nomError }"
                placeholder="Joan"
              />
              <div class="invalid-feedback">{{ nomError }}</div>
            </div>

            <!-- Cognoms -->
            <div class="col-md-6">
              <label class="form-label">Cognoms *</label>
              <input
                v-bind="cognomsField"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': cognomsError, 'is-valid': cognomsMeta.dirty && !cognomsError }"
                placeholder="García López"
              />
              <div class="invalid-feedback">{{ cognomsError }}</div>
            </div>
          </div>

          <div class="row g-3 mb-3">
            <!-- Email -->
            <div class="col-md-6">
              <label class="form-label">Email *</label>
              <input
                v-bind="emailField"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': emailError, 'is-valid': emailMeta.dirty && !emailError }"
                placeholder="joan@exemple.cat"
              />
              <div class="invalid-feedback">{{ emailError }}</div>
            </div>

            <!-- Telèfon -->
            <div class="col-md-6">
              <label class="form-label">Telèfon *</label>
              <input
                v-bind="telefonField"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': telefonError, 'is-valid': telefonMeta.dirty && !telefonError }"
                placeholder="612345678"
                maxlength="9"
              />
              <div class="invalid-feedback">{{ telefonError }}</div>
              <div class="form-text">9 dígits, comença per 6, 7, 8 o 9</div>
            </div>
          </div>

          <!-- Data Naixement -->
          <div class="row g-3 mb-4">
            <div class="col-md-6">
              <label class="form-label">Data de Naixement *</label>
              <input
                v-bind="dataNaixementField"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': dataNaixementError, 'is-valid': dataNaixementMeta.dirty && !dataNaixementError }"
                placeholder="DD/MM/YYYY"
                maxlength="10"
              />
              <div class="invalid-feedback">{{ dataNaixementError }}</div>
              <div class="form-text">Format: DD/MM/YYYY</div>
            </div>
          </div>

          <!-- CONTRASENYA -->
          <h6 class="text-primary fw-bold border-bottom pb-2 mb-3">Contrasenya</h6>

          <div class="row g-3 mb-4">
            <div class="col-md-6">
              <label class="form-label">Contrasenya *</label>
              <div class="input-group">
                <input
                  v-bind="contrasenyaField"
                  :type="showPass ? 'text' : 'password'"
                  class="form-control"
                  :class="{ 'is-invalid': contrasenyaError, 'is-valid': contrasenyaMeta.dirty && !contrasenyaError }"
                  placeholder="Mínim 12 caràcters"
                />
                <button class="btn btn-outline-secondary" type="button"
                  @click="showPass = !showPass" tabindex="-1">
                  <i :class="showPass ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
              <div class="invalid-feedback d-block" v-if="contrasenyaError">{{ contrasenyaError }}</div>

              <!-- Barra de fortalesa -->
              <div class="mt-2" v-if="contrasenyaValue">
                <div class="progress mb-1" style="height:4px;">
                  <div class="progress-bar" :class="strengthBar.color"
                    :style="{ width: strengthBar.width }"></div>
                </div>
                <small :class="strengthBar.textColor">{{ strengthBar.label }}</small>
                <ul class="list-unstyled mt-1 small mb-0">
                  <li v-for="(ok, key) in passChecks" :key="key"
                    :class="ok ? 'text-success' : 'text-muted'">
                    <i :class="ok ? 'bi bi-check-lg' : 'bi bi-dash'"></i>
                    {{ checkLabels[key] }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-md-6">
              <label class="form-label">Verificació contrasenya *</label>
              <div class="input-group">
                <input
                  v-bind="verificacioField"
                  :type="showPass2 ? 'text' : 'password'"
                  class="form-control"
                  :class="{ 'is-invalid': verificacioError, 'is-valid': verificacioMeta.dirty && !verificacioError }"
                  placeholder="Repeteix la contrasenya"
                />
                <button class="btn btn-outline-secondary" type="button"
                  @click="showPass2 = !showPass2" tabindex="-1">
                  <i :class="showPass2 ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
              <div class="invalid-feedback">{{ verificacioError }}</div>
            </div>
          </div>

          <!-- ADREÇA -->
          <h6 class="text-primary fw-bold border-bottom pb-2 mb-3">Adreça</h6>

          <div class="mb-3">
            <label class="form-label">Adreça *</label>
            <input
              v-bind="adrecaField"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': adrecaError, 'is-valid': adrecaMeta.dirty && !adrecaError }"
              placeholder="Carrer de la Pau, 42, 3r 1a"
            />
            <div class="invalid-feedback">{{ adrecaError }}</div>
          </div>

          <div class="row g-3 mb-4">
            <!-- Província -->
            <div class="col-md-4">
              <label class="form-label">Província *</label>
              <select
                v-bind="provinciaField"
                class="form-select"
                :class="{ 'is-invalid': provinciaError, 'is-valid': provinciaMeta.dirty && !provinciaError }"
                @change="onProvinciaChange"
              >
                <option value="">-- Selecciona --</option>
                <option v-for="p in provinces" :key="p.id" :value="p.id">{{ p.name }}</option>
              </select>
              <div class="invalid-feedback">{{ provinciaError }}</div>
            </div>

            <!-- Població -->
            <div class="col-md-4">
              <label class="form-label">Població *</label>
              <select
                v-bind="poblacioField"
                class="form-select"
                :class="{ 'is-invalid': poblacioError, 'is-valid': poblacioMeta.dirty && !poblacioError }"
                :disabled="!provinciaValue"
              >
                <option value="">-- Selecciona --</option>
                <option v-for="pop in availablePopulations" :key="pop" :value="pop">{{ pop }}</option>
              </select>
              <div class="invalid-feedback">{{ poblacioError }}</div>
            </div>

            <!-- Codi Postal -->
            <div class="col-md-4">
              <label class="form-label">Codi Postal *</label>
              <input
                v-bind="codiPostalField"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': codiPostalError, 'is-valid': codiPostalMeta.dirty && !codiPostalError }"
                placeholder="08001"
                maxlength="5"
              />
              <div class="invalid-feedback">{{ codiPostalError }}</div>
              <div class="form-text" v-if="selectedProv">
                Ha de començar per {{ selectedProv.prefix }}
              </div>
            </div>
          </div>

          <!-- BOTONS -->
          <div class="d-flex justify-content-between pt-3 border-top">
            <button type="button" class="btn btn-outline-secondary" @click="handleReset">
              Esborrar
            </button>
            <button type="submit" class="btn btn-primary px-5" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
              {{ isSubmitting ? 'Enviant...' : 'Registrar-se' }}
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import axios from 'axios'
import { provinces } from '../data/provinces.js'

// ── Estat local ────────────────────────────────────────────────────────────────
const showPass      = ref(false)
const showPass2     = ref(false)
const apiError      = ref(null)
const registered    = ref(false)
const registeredUser = ref(null)

// ── Helpers data ───────────────────────────────────────────────────────────────
const isValidDate = (v) => {
  if (!v) return false
  const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!m) return false
  const [, dd, mm, yyyy] = m.map(Number)
  const d = new Date(yyyy, mm - 1, dd)
  return d.getDate() === dd && d.getMonth() === mm - 1 && d.getFullYear() === yyyy
}

const getAge = (v) => {
  const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!m) return 0
  const [, dd, mm, yyyy] = m.map(Number)
  const today = new Date()
  let age = today.getFullYear() - yyyy
  if (today.getMonth() + 1 < mm || (today.getMonth() + 1 === mm && today.getDate() < dd)) age--
  return age
}

// ── Esquema Yup ───────────────────────────────────────────────────────────────
// yup.object() defineix les regles de validació per a cada camp del formulari.
// La validació s'executa automàticament en cada canvi de camp (mode 'aggressive')
// i en el submit. Els missatges d'error es mostren amb useField().
const schema = yup.object({
  nom: yup.string().required('El nom és obligatori').min(2, 'Mínim 2 caràcters'),
  cognoms: yup.string().required('Els cognoms són obligatoris').min(2, 'Mínim 2 caràcters'),
  email: yup.string().required("L'email és obligatori").email("Format d'email invàlid"),
  telefon: yup
    .string()
    .required('El telèfon és obligatori')
    .matches(/^[6789]\d{8}$/, '9 dígits, comença per 6-9'),
  dataNaixement: yup
    .string()
    .required('La data és obligatòria')
    .test('format', 'Format incorrecte (DD/MM/YYYY)', isValidDate)
    .test('age', 'Has de tenir almenys 16 anys', (v) => !v || !isValidDate(v) || getAge(v) >= 16),
  contrasenya: yup
    .string()
    .required('La contrasenya és obligatòria')
    .min(12, 'Mínim 12 caràcters')
    .matches(/[A-Z]/, 'Necessita almenys una majúscula')
    .matches(/[a-z]/, 'Necessita almenys una minúscula')
    .matches(/[0-9]/, 'Necessita almenys un número')
    .matches(/[^A-Za-z0-9]/, 'Necessita almenys un caràcter especial'),
  verificacioContrasenya: yup
    .string()
    .required('La verificació és obligatòria')
    .oneOf([yup.ref('contrasenya')], 'Les contrasenyes no coincideixen'),
  adreca: yup.string().required("L'adreça és obligatòria").min(5, 'Mínim 5 caràcters'),
  provincia: yup.string().required('La província és obligatòria'),
  poblacio: yup.string().required('La població és obligatòria'),
  codiPostal: yup
    .string()
    .required('El codi postal és obligatori')
    .matches(/^\d{5}$/, 'Han de ser exactament 5 dígits')
    .test('prefix', 'El codi postal no correspon a la província', function (value) {
      const prov = provinces.find(p => p.id === this.parent.provincia)
      if (!prov || !value || !/^\d{5}$/.test(value)) return true
      return value.startsWith(prov.prefix)
    }),
})

// ── useForm (VeeValidate) ──────────────────────────────────────────────────────
// useForm() inicialitza el formulari amb l'esquema i els valors inicials.
// handleSubmit() executa la validació completa i crida el callback si tot és vàlid.
// isSubmitting és un ref booleà que VeeValidate gestiona automàticament.
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    nom: '', cognoms: '', email: '', telefon: '', dataNaixement: '',
    contrasenya: '', verificacioContrasenya: '',
    adreca: '', provincia: '', poblacio: '', codiPostal: '',
  },
})

// ── useField (VeeValidate) ────────────────────────────────────────────────────
// useField('nomCamp') retorna:
//   - value     → ref reactiu del valor del camp (es pot usar com a v-model)
//   - errorMessage → ref amb l'error actual (undefined si és vàlid)
//   - meta      → objecte amb flags: dirty, touched, valid, ...
//   - field     → objecte amb attrs per fer v-bind (name, onBlur, onChange, onInput...)
//
// Usem el patró: v-bind="nomField" en lloc de v-model per compatibilitat amb VeeValidate.
const { value: nomValue,      errorMessage: nomError,      meta: nomMeta,      field: nomField }             = useField('nom')
const { value: cognomsValue,  errorMessage: cognomsError,  meta: cognomsMeta,  field: cognomsField }         = useField('cognoms')
const { value: emailValue,    errorMessage: emailError,    meta: emailMeta,    field: emailField }           = useField('email')
const { value: telefonValue,  errorMessage: telefonError,  meta: telefonMeta,  field: telefonField }         = useField('telefon')
const { value: dataNaixementValue, errorMessage: dataNaixementError, meta: dataNaixementMeta, field: dataNaixementField } = useField('dataNaixement')
const { value: contrasenyaValue,   errorMessage: contrasenyaError,   meta: contrasenyaMeta,   field: contrasenyaField }  = useField('contrasenya')
const { value: verificacioValue,   errorMessage: verificacioError,   meta: verificacioMeta,   field: verificacioField }  = useField('verificacioContrasenya')
const { value: adrecaValue,   errorMessage: adrecaError,   meta: adrecaMeta,   field: adrecaField }         = useField('adreca')
const { value: provinciaValue, errorMessage: provinciaError, meta: provinciaMeta, field: provinciaField }   = useField('provincia')
const { value: poblacioValue,  errorMessage: poblacioError,  meta: poblacioMeta,  field: poblacioField }    = useField('poblacio')
const { value: codiPostalValue, errorMessage: codiPostalError, meta: codiPostalMeta, field: codiPostalField } = useField('codiPostal')

// ── Poblacions dinàmiques ──────────────────────────────────────────────────────
const selectedProv         = computed(() => provinces.find(p => p.id === provinciaValue.value))
const availablePopulations = computed(() => selectedProv.value?.populations ?? [])

// Quan canvia la província, buidem el camp de població i codi postal
const onProvinciaChange = () => {
  poblacioValue.value  = ''
  codiPostalValue.value = ''
}

// ── Barra de fortalesa ────────────────────────────────────────────────────────
const passChecks = computed(() => {
  const p = contrasenyaValue.value || ''
  return {
    length:  p.length >= 12,
    upper:   /[A-Z]/.test(p),
    lower:   /[a-z]/.test(p),
    digit:   /[0-9]/.test(p),
    special: /[^A-Za-z0-9]/.test(p),
  }
})

const checkLabels = {
  length: 'Mínim 12 caràcters', upper: 'Una majúscula',
  lower: 'Una minúscula', digit: 'Un número', special: 'Un caràcter especial',
}

const strengthBar = computed(() => {
  const score = Object.values(passChecks.value).filter(Boolean).length
  const bars = [
    { width: '20%',  color: 'bg-danger',  textColor: 'text-danger',  label: 'Molt feble' },
    { width: '40%',  color: 'bg-warning', textColor: 'text-warning', label: 'Feble' },
    { width: '60%',  color: 'bg-info',    textColor: 'text-info',    label: 'Acceptable' },
    { width: '80%',  color: 'bg-primary', textColor: 'text-primary', label: 'Bona' },
    { width: '100%', color: 'bg-success', textColor: 'text-success', label: "Excel·lent" },
  ]
  return bars[Math.max(0, score - 1)]
})

// ── Submit ─────────────────────────────────────────────────────────────────────
// handleSubmit(callback) → VeeValidate valida tot el formulari; si passa, crida callback
const onSubmit = handleSubmit(async (values) => {
  apiError.value = null
  try {
    const { contrasenya, verificacioContrasenya, ...rest } = values
    const response = await axios.post('http://localhost:3001/users', {
      ...rest,
      passwordHash: '[protected]',
      createdAt: new Date().toISOString(),
    })
    registeredUser.value = response.data
    registered.value = true
  } catch (err) {
    apiError.value = err.code === 'ERR_NETWORK'
      ? "No es pot connectar. Executa 'npm run api' en un altre terminal."
      : err.response?.data?.message || err.message || 'Error desconegut'
  }
})

// ── Reset ──────────────────────────────────────────────────────────────────────
const handleReset = () => {
  resetForm()
  showPass.value  = false
  showPass2.value = false
  apiError.value  = null
}

const startOver = () => {
  registered.value    = false
  registeredUser.value = null
  handleReset()
}
</script>
