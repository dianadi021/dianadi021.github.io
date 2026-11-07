export default defineEventHandler(() => {
  return {
    id: 1,
    title: 'Data demonstrasi internal Nitro server route',
    completed: true,
    source: 'internal-api',
    timestamp: new Date().toISOString()
  }
})
