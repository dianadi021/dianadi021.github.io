import { useSwal, useLoading } from '@/utils/notification'
import { useToast as toastr } from 'vue-toastification'

export default function useNotify() {
  return { useSwal, useLoading, toastr }
}
