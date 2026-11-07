import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiBase,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  // Global response error normalizer
  api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        const message = (error.response?.data as { message?: string } | undefined)?.message ?? error.message
        console.warn(`[Axios API Error] ${status ?? 'Network'}: ${message}`)
      }
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      api,
      axios: api
    }
  }
})
