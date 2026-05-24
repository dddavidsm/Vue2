<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">

        <h2 class="fw-bold text-center mb-1">Registre 1 — Validació Manual</h2>
        <p class="text-center text-muted mb-4">Composition API + composable <code>useRegister</code> → JSON Server</p>

        <div v-if="error" class="alert alert-danger alert-dismissible">
          {{ error }}
          <button type="button" class="btn-close" @click="reset"></button>
        </div>

        <!-- Missatge d'èxit -->
        <div v-if="success" class="card border-success text-center p-5 shadow-sm">
          <i class="bi bi-check-circle-fill text-success fs-1"></i>
          <h4 class="mt-3">Registre completat!</h4>
          <p class="text-muted">
            Benvingut/da, <strong>{{ savedUser?.nom }} {{ savedUser?.cognoms }}</strong>
            (ID: <code>{{ savedUser?.id }}</code>)
          </p>
          <button class="btn btn-primary" @click="resetForm">Nou registre</button>
        </div>

        <form v-if="!success" @submit.prevent="handleSubmit" class="card p-4 shadow-sm" novalidate>

          <!-- DADES PERSONALS -->
          <h6 class="text-primary fw-bold border-bottom pb-2 mb-3">Dades personals</h6>

          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label">Nom *</label>
              <input v-model.trim="form.nom" type="text" class="form-control"
                :class="fieldClass('nom')" placeholder="Joan" @blur="touch('nom')" />
              <div class="invalid-feedback">{{ errors.nom }}</div>
            </div>
            <div class="col-md-6">
              <label class="form-label">Cognoms *</label>
              <input v-model.trim="form.cognoms" type="text" class="form-control"
                :class="fieldClass('cognoms')" placeholder="García López" @blur="touch('cognoms')" />
              <div class="invalid-feedback">{{ errors.cognoms }}</div>
            </div>
          </div>

          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label">Email *</label>
              <input v-model.trim="form.email" type="email" class="form-control"
                :class="fieldClass('email')" placeholder="joan@exemple.cat" @blur="touch('email')" />
              <div class="invalid-feedback">{{ errors.email }}</div>
            </div>
            <div class="col-md-6">
              <label class="form-label">Telèfon *</label>
              <input v-model.trim="form.telefon" type="tel" class="form-control"
                :class="fieldClass('telefon')" placeholder="612345678"
                @blur="touch('telefon')" maxlength="9" />
              <div class="invalid-feedback">{{ errors.telefon }}</div>
              <div class="form-text">9 dígits, comença per 6, 7, 8 o 9</div>
            </div>
          </div>

          <div class="row g-3 mb-4">
            <div class="col-md-6">
              <label class="form-label">Data de Naixement *</label>
              <input v-model.trim="form.dataNaixement" type="text" class="form-control"
                :class="fieldClass('dataNaixement')" placeholder="DD/MM/YYYY"
                @blur="touch('dataNaixement')" maxlength="10" />
              <div class="invalid-feedback">{{ errors.dataNaixement }}</div>
              <div class="form-text">Format: DD/MM/YYYY</div>
            </div>
          </div>

          <!-- CONTRASENYA -->
          <h6 class="text-primary fw-bold border-bottom pb-2 mb-3">Contrasenya</h6>

          <div class="row g-3 mb-4">
            <div class="col-md-6">
              <label class="form-label">Contrasenya *</label>
              <div class="input-group">
                <input v-model="form.contrasenya"
                  :type="showPass ? 'text' : 'password'"
                  class="form-control" :class="fieldClass('contrasenya')"
                  placeholder="Mínim 12 caràcters" @blur="touch('contrasenya')" />
                <button class="btn btn-outline-secondary" type="button"
                  @click="showPass = !showPass" tabindex="-1">
                  <i :class="showPass ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
              <div class="invalid-feedback d-block"
                v-if="touched.contrasenya && errors.contrasenya">
                {{ errors.contrasenya }}
              </div>

              <div class="mt-2" v-if="form.contrasenya">
                <div class="progress mb-1" style="height:4px;">
                  <div class="progress-bar" :class="strengthBar.color"
                    :style="{ width: strengthBar.width }"></div>
                </div>
                <small :class="strengthBar.textColor">{{ strengthBar.label }}</small>

                <ul class="list-unstyled mt-1 small mb-0">
                  <li v-for="(ok, key) in checks" :key="key"
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
                <input v-model="form.verificacioContrasenya"
                  :type="showPass2 ? 'text' : 'password'"
                  class="form-control" :class="fieldClass('verificacioContrasenya')"
                  placeholder="Repeteix la contrasenya" @blur="touch('verificacioContrasenya')" />
                <button class="btn btn-outline-secondary" type="button"
                  @click="showPass2 = !showPass2" tabindex="-1">
                  <i :class="showPass2 ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
              <div class="invalid-feedback">{{ errors.verificacioContrasenya }}</div>
            </div>
          </div>

          <!-- ADREÇA -->
          <h6 class="text-primary fw-bold border-bottom pb-2 mb-3">Adreça</h6>

          <div class="mb-3">
            <label class="form-label">Adreça *</label>
            <input v-model.trim="form.adreca" type="text" class="form-control"
              :class="fieldClass('adreca')" placeholder="Carrer de la Pau, 42, 3r 1a"
              @blur="touch('adreca')" />
            <div class="invalid-feedback">{{ errors.adreca }}</div>
          </div>

          <div class="row g-3 mb-4">
            <div class="col-md-4">
              <label class="form-label">Província *</label>
              <select v-model="form.provincia" class="form-select"
                :class="fieldClass('provincia')" @blur="touch('provincia')">
                <option value="">-- Selecciona --</option>
                <option v-for="p in provinces" :key="p.id" :value="p.id">{{ p.name }}</option>
              </select>
              <div class="invalid-feedback">{{ errors.provincia }}</div>
            </div>
            <div class="col-md-4">
              <label class="form-label">Població *</label>
              <select v-model="form.poblacio" class="form-select"
                :class="fieldClass('poblacio')" :disabled="!form.provincia"
                @blur="touch('poblacio')">
                <option value="">-- Selecciona --</option>
                <option v-for="pop in availablePopulations" :key="pop" :value="pop">{{ pop }}</option>
              </select>
              <div class="invalid-feedback">{{ errors.poblacio }}</div>
            </div>
            <div class="col-md-4">
              <label class="form-label">Codi Postal *</label>
              <input v-model.trim="form.codiPostal" type="text" class="form-control"
                :class="fieldClass('codiPostal')" placeholder="08001"
                @blur="touch('codiPostal')" maxlength="5" />
              <div class="invalid-feedback">{{ errors.codiPostal }}</div>
              <div class="form-text" v-if="selectedProv">
                Ha de començar per {{ selectedProv.prefix }}
              </div>
            </div>
          </div>

          <!-- BOTONS -->
          <div class="d-flex justify-content-between pt-3 border-top">
            <button type="button" class="btn btn-outline-secondary" @click="resetForm">
              Esborrar
            </button>
            <button type="submit" class="btn btn-primary px-5" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
              {{ loading ? 'Enviant...' : 'Registrar-se' }}
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { provinces } from '../data/provinces.js'
import { useRegister } from '../composables/useRegister.js'

const { loading, error, success, savedUser, submitRegistration, reset } = useRegister()

const form = reactive({
  nom: '', cognoms: '', email: '', telefon: '', dataNaixement: '',
  contrasenya: '', verificacioContrasenya: '',
  adreca: '', provincia: '', poblacio: '', codiPostal: '',
})

const touched  = reactive({})
const showPass  = ref(false)
const showPass2 = ref(false)

const touch    = (field) => { touched[field] = true }
const touchAll = () => Object.keys(form).forEach(k => { touched[k] = true })

const selectedProv         = computed(() => provinces.find(p => p.id === form.provincia))
const availablePopulations = computed(() => selectedProv.value?.populations ?? [])

watch(() => form.provincia, () => {
  form.poblacio   = ''
  form.codiPostal = ''
})

const isValidDate = (v) => {
  const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!m) return false
  const [, dd, mm, yyyy] = m.map(Number)
  const d = new Date(yyyy, mm - 1, dd)
  return d.getDate() === dd && d.getMonth() === mm - 1 && d.getFullYear() === yyyy
}

const getAge = (v) => {
  const [, dd, mm, yyyy] = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/).map(Number)
  const today = new Date()
  let age = today.getFullYear() - yyyy
  if (today.getMonth() + 1 < mm || (today.getMonth() + 1 === mm && today.getDate() < dd)) age--
  return age
}

const errors = computed(() => {
  const e = {}

  if (!form.nom)                e.nom     = 'El nom és obligatori'
  else if (form.nom.length < 2) e.nom     = 'Mínim 2 caràcters'

  if (!form.cognoms)                  e.cognoms = 'Els cognoms són obligatoris'
  else if (form.cognoms.length < 2)   e.cognoms = 'Mínim 2 caràcters'

  if (!form.email)                                          e.email = "L'email és obligatori"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Format d'email invàlid"

  if (!form.telefon)                              e.telefon = 'El telèfon és obligatori'
  else if (!/^[6789]\d{8}$/.test(form.telefon))  e.telefon = '9 dígits, comença per 6-9'

  if (!form.dataNaixement)                   e.dataNaixement = 'La data és obligatòria'
  else if (!isValidDate(form.dataNaixement)) e.dataNaixement = 'Format incorrecte (DD/MM/YYYY)'
  else if (getAge(form.dataNaixement) < 16)  e.dataNaixement = 'Has de tenir almenys 16 anys'

  const p = form.contrasenya
  if (!p)                            e.contrasenya = 'La contrasenya és obligatòria'
  else if (p.length < 12)            e.contrasenya = 'Mínim 12 caràcters'
  else if (!/[A-Z]/.test(p))         e.contrasenya = 'Necessita almenys una majúscula'
  else if (!/[a-z]/.test(p))         e.contrasenya = 'Necessita almenys una minúscula'
  else if (!/[0-9]/.test(p))         e.contrasenya = 'Necessita almenys un número'
  else if (!/[^A-Za-z0-9]/.test(p))  e.contrasenya = 'Necessita almenys un caràcter especial'

  if (!form.verificacioContrasenya)                          e.verificacioContrasenya = 'La verificació és obligatòria'
  else if (form.verificacioContrasenya !== form.contrasenya) e.verificacioContrasenya = 'Les contrasenyes no coincideixen'

  if (!form.adreca || form.adreca.length < 5) e.adreca   = !form.adreca ? "L'adreça és obligatòria" : 'Mínim 5 caràcters'
  if (!form.provincia)                         e.provincia = 'La província és obligatòria'
  if (!form.poblacio)                          e.poblacio  = 'La població és obligatòria'

  if (!form.codiPostal)                       e.codiPostal = 'El codi postal és obligatori'
  else if (!/^\d{5}$/.test(form.codiPostal))  e.codiPostal = 'Han de ser exactament 5 dígits'
  else if (selectedProv.value && !form.codiPostal.startsWith(selectedProv.value.prefix))
    e.codiPostal = `Ha de començar per ${selectedProv.value.prefix} (${selectedProv.value.name})`

  return e
})

const checks = computed(() => ({
  length:  form.contrasenya.length >= 12,
  upper:   /[A-Z]/.test(form.contrasenya),
  lower:   /[a-z]/.test(form.contrasenya),
  digit:   /[0-9]/.test(form.contrasenya),
  special: /[^A-Za-z0-9]/.test(form.contrasenya),
}))

const checkLabels = {
  length: 'Mínim 12 caràcters', upper: 'Una majúscula',
  lower: 'Una minúscula', digit: 'Un número', special: 'Un caràcter especial',
}

const strengthBar = computed(() => {
  const score = Object.values(checks.value).filter(Boolean).length
  const bars = [
    { width: '20%',  color: 'bg-danger',  textColor: 'text-danger',  label: 'Molt feble' },
    { width: '40%',  color: 'bg-warning', textColor: 'text-warning', label: 'Feble' },
    { width: '60%',  color: 'bg-info',    textColor: 'text-info',    label: 'Acceptable' },
    { width: '80%',  color: 'bg-primary', textColor: 'text-primary', label: 'Bona' },
    { width: '100%', color: 'bg-success', textColor: 'text-success', label: "Excel·lent" },
  ]
  return bars[Math.max(0, score - 1)]
})

const fieldClass = (field) => {
  if (!touched[field]) return ''
  return errors.value[field] ? 'is-invalid' : 'is-valid'
}

const handleSubmit = async () => {
  touchAll()
  if (Object.keys(errors.value).length > 0) return
  await submitRegistration({ ...form })
}

const resetForm = () => {
  reset()
  Object.keys(form).forEach(k => { form[k] = '' })
  Object.keys(touched).forEach(k => { delete touched[k] })
}
</script>
