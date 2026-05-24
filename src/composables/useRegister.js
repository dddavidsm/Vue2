import { ref } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:3001/users'

export function useRegister() {
  const loading   = ref(false)
  const error     = ref(null)
  const success   = ref(false)
  const savedUser = ref(null)

  const submitRegistration = async (formData) => {
    loading.value = true
    error.value   = null

    try {
      const { contrasenya, verificacioContrasenya, ...rest } = formData

      const response = await axios.post(API_URL, {
        ...rest,
        passwordHash: '[protected]',
        createdAt: new Date().toISOString(),
      })

      savedUser.value = response.data
      success.value   = true
    } catch (err) {
      error.value = err.code === 'ERR_NETWORK'
        ? "No es pot connectar. Executa 'npm run api' en un altre terminal."
        : err.response?.data?.message || err.message || 'Error desconegut'
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    loading.value   = false
    error.value     = null
    success.value   = false
    savedUser.value = null
  }

  return { loading, error, success, savedUser, submitRegistration, reset }
}
