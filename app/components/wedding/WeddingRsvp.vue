<script setup lang="ts">
import { z } from 'zod'
import type { RsvpAttendanceStatus, RsvpEntryRecord } from '~/types/wedding'

const props = defineProps<{
  initialGuestName: string
}>()

const { $swal } = useNuxtApp()

const rsvpSchema = z.object({
  guestName: z.string().min(2, 'Nama minimal 2 karakter'),
  attendance: z.enum(['ATTENDING', 'NOT_ATTENDING', 'UNCERTAIN']),
  totalGuests: z.coerce.number().min(1, 'Jumlah tamu minimal 1').max(5, 'Jumlah tamu maksimal 5'),
  message: z.string().min(3, 'Ucapan minimal 3 karakter').max(500, 'Ucapan maksimal 500 karakter')
})

const formData = reactive({
  guestName: props.initialGuestName || '',
  attendance: 'ATTENDING' as RsvpAttendanceStatus,
  totalGuests: 1,
  message: ''
})

watch(() => props.initialGuestName, (newVal) => {
  if (newVal && !formData.guestName) {
    formData.guestName = newVal
  }
})

const formErrors = ref<Record<string, string>>({})
const isSubmitting = ref(false)

// Inisialisasi daftar ucapan default dan simpan di LocalStorage
const defaultEntries: RsvpEntryRecord[] = [
  {
    id: 'rsvp-1',
    guestName: 'Keluarga Besar Bpk. Hendra',
    attendance: 'ATTENDING',
    totalGuests: 2,
    message: 'Selamat menempuh hidup baru untuk kedua mempelai. Semoga menjadi keluarga sakinah, mawaddah, warahmah.',
    createdAt: '2026-11-06 14:20'
  },
  {
    id: 'rsvp-2',
    guestName: 'Bima & Rara',
    attendance: 'ATTENDING',
    totalGuests: 2,
    message: 'Barakallahu lakum wa baraka alaikum. Bahagia selalu sampai akhir hayat ya teman-teman!',
    createdAt: '2026-11-06 16:45'
  }
]

const guestbookEntries = useLocalStorage<RsvpEntryRecord[]>('wedding_guestbook_entries', defaultEntries)

const generateRsvpKey = (name: string, msg: string) =>
  `rsvp_${name.trim().toLowerCase().replace(/\s+/g, '_')}_${msg.trim().toLowerCase().replace(/\s+/g, '_')}`

const handleSubmit = () => {
  formErrors.value = {}
  const parseResult = rsvpSchema.safeParse(formData)

  if (!parseResult.success) {
    const formatted = parseResult.error.format()
    if (formatted.guestName?._errors[0]) formErrors.value.guestName = formatted.guestName._errors[0]
    if (formatted.attendance?._errors[0]) formErrors.value.attendance = formatted.attendance._errors[0]
    if (formatted.totalGuests?._errors[0]) formErrors.value.totalGuests = formatted.totalGuests._errors[0]
    if (formatted.message?._errors[0]) formErrors.value.message = formatted.message._errors[0]
    return
  }

  // Idempotency & Deduplication Guard (Wedding Invariant 4)
  const payloadKey = generateRsvpKey(formData.guestName, formData.message)
  const isDuplicate = guestbookEntries.value.some(
    entry => generateRsvpKey(entry.guestName, entry.message) === payloadKey
  )

  if (isDuplicate) {
    if ($swal) {
      $swal.fire({
        icon: 'info',
        title: 'Konfirmasi Telah Tercatat 💌',
        text: 'Konfirmasi kehadiran dan ucapan doa restu Anda sudah berhasil tercatat sebelumnya.',
        confirmButtonColor: '#1C3026',
        background: '#FAF7F2',
        color: '#1C3026'
      })
    }
    return
  }

  isSubmitting.value = true

  // Deterministic ID hash
  let hash = 0
  for (let i = 0; i < payloadKey.length; i++) {
    hash = ((hash << 5) - hash) + payloadKey.charCodeAt(i)
    hash |= 0
  }
  const deterministicId = `rsvp-${Math.abs(hash)}`

  const newEntry: RsvpEntryRecord = {
    id: deterministicId,
    guestName: formData.guestName.trim(),
    attendance: formData.attendance,
    totalGuests: formData.totalGuests,
    message: formData.message.trim(),
    createdAt: new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  guestbookEntries.value = [newEntry, ...guestbookEntries.value]
  formData.message = ''
  isSubmitting.value = false

  if ($swal) {
    $swal.fire({
      icon: 'success',
      title: 'Terima Kasih! ✨',
      text: 'Konfirmasi kehadiran dan ucapan doa restu Anda telah berhasil tersimpan.',
      confirmButtonColor: '#1C3026',
      background: '#FAF7F2',
      color: '#1C3026'
    })
  }
}
</script>

<template>
  <section class="max-w-4xl mx-auto space-y-8 text-center">
    <div class="space-y-2">
      <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-serif font-semibold bg-[#E8D5CE]/40 text-[#1C3026] border border-[#C5A880]/30 shadow-xs">
        <span>💌</span>
        <span>Buku Tamu & RSVP</span>
      </div>
      <h2 class="text-3xl font-serif font-bold text-[#1C3026]">
        Konfirmasi Kehadiran & Doa Restu
      </h2>
      <p class="text-xs sm:text-sm text-[#1C3026]/75 font-serif max-w-md mx-auto">
        Kirimkan doa dan konfirmasi kehadiran Anda untuk membantu kami menyiapkan jamuan terbaik.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
      <!-- RSVP Form Card -->
      <div class="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#E6DAC3] shadow-md shadow-[#C5A880]/10 space-y-4">
        <h3 class="text-lg font-serif font-bold text-[#1C3026] flex items-center gap-2">
          <Icon name="heroicons:pencil-square-20-solid" class="w-5 h-5 text-[#D4AF37]" />
          <span>Isi Konfirmasi Kehadiran</span>
        </h3>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <!-- Guest Name -->
          <div class="space-y-1">
            <label for="rsvp-guest-name" class="block text-xs font-serif font-bold text-[#1C3026]">Nama Lengkap</label>
            <input
              id="rsvp-guest-name"
              v-model="formData.guestName"
              type="text"
              :aria-invalid="!!formErrors.guestName"
              :aria-describedby="formErrors.guestName ? 'rsvp-guest-name-error' : undefined"
              class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E6DAC3] bg-[#FAF7F2] text-[#1C3026] font-serif focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
              :class="formErrors.guestName ? 'border-rose-400 ring-1 ring-rose-400' : ''"
              placeholder="Nama Anda / Keluarga"
            >
            <span v-if="formErrors.guestName" id="rsvp-guest-name-error" role="alert" class="text-[11px] text-rose-600 block">{{ formErrors.guestName }}</span>
          </div>

          <!-- Attendance -->
          <div class="space-y-1">
            <label for="rsvp-attendance" class="block text-xs font-serif font-bold text-[#1C3026]">Konfirmasi Kehadiran</label>
            <select
              id="rsvp-attendance"
              v-model="formData.attendance"
              class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E6DAC3] bg-[#FAF7F2] text-[#1C3026] font-serif focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
            >
              <option value="ATTENDING">Ya, Saya Akan Hadir</option>
              <option value="UNCERTAIN">Masih Ragu / Belum Pasti</option>
              <option value="NOT_ATTENDING">Maaf, Tidak Bisa Hadir</option>
            </select>
          </div>

          <!-- Total Guests -->
          <div class="space-y-1">
            <label for="rsvp-total-guests" class="block text-xs font-serif font-bold text-[#1C3026]">Jumlah Tamu</label>
            <select
              id="rsvp-total-guests"
              v-model.number="formData.totalGuests"
              class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E6DAC3] bg-[#FAF7F2] text-[#1C3026] font-serif focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
            >
              <option :value="1">1 Orang</option>
              <option :value="2">2 Orang</option>
              <option :value="3">3 Orang</option>
              <option :value="4">4 Orang</option>
            </select>
          </div>

          <!-- Message -->
          <div class="space-y-1">
            <label for="rsvp-message" class="block text-xs font-serif font-bold text-[#1C3026]">Ucapan & Doa Restu</label>
            <textarea
              id="rsvp-message"
              v-model="formData.message"
              rows="3"
              :aria-invalid="!!formErrors.message"
              :aria-describedby="formErrors.message ? 'rsvp-message-error' : undefined"
              class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E6DAC3] bg-[#FAF7F2] text-[#1C3026] font-serif focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
              :class="formErrors.message ? 'border-rose-400 ring-1 ring-rose-400' : ''"
              placeholder="Tuliskan ucapan selamat dan doa untuk kedua mempelai..."
            />
            <span v-if="formErrors.message" id="rsvp-message-error" role="alert" class="text-[11px] text-rose-600 block">{{ formErrors.message }}</span>
          </div>

          <footer class="pt-2">
            <button
              type="submit"
              :disabled="isSubmitting"
              :aria-busy="isSubmitting"
              class="w-full min-h-[44px] py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A880] hover:from-[#c29e2e] hover:to-[#b3956d] text-white font-serif font-bold text-xs shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed select-none flex items-center justify-center gap-2"
            >
              <svg
                v-if="isSubmitting"
                class="h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>{{ isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi & Ucapan' }}</span>
            </button>
          </footer>
        </form>
      </div>

      <!-- Guestbook Live Feed -->
      <div class="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#E6DAC3] shadow-md shadow-[#C5A880]/10 flex flex-col justify-between space-y-4">
        <div class="space-y-3">
          <div class="flex items-center justify-between border-b border-[#E6DAC3]/60 pb-3">
            <h3 class="text-lg font-serif font-bold text-[#1C3026] flex items-center gap-2">
              <Icon name="heroicons:chat-bubble-left-right-20-solid" class="w-5 h-5 text-[#D4AF37]" />
              <span>Untaian Doa Tamu</span>
            </h3>
            <span class="text-xs px-3 py-1 rounded-full bg-[#FAF7F2] text-[#1C3026] border border-[#E6DAC3] font-serif font-bold">
              {{ guestbookEntries.length }} Pesan
            </span>
          </div>

          <!-- Entries Scroll List -->
          <div class="space-y-3 max-h-96 overflow-y-auto pr-1">
            <!-- Empty State (4-State View) -->
            <div
              v-if="guestbookEntries.length === 0"
              class="p-8 text-center rounded-2xl bg-[#FAF7F2] border border-dashed border-[#E6DAC3] space-y-2"
            >
              <span class="text-2xl block" aria-hidden="true">📜</span>
              <p class="text-xs font-serif font-bold text-[#1C3026]">Belum Ada Untaian Doa</p>
              <p class="text-[11px] font-serif text-[#1C3026]/70 leading-relaxed max-w-xs mx-auto">
                Jadilah tamu pertama yang mengirimkan konfirmasi kehadiran dan doa restu untuk kedua mempelai.
              </p>
            </div>

            <div
              v-for="entry in guestbookEntries"
              v-else
              :key="entry.id"
              class="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E6DAC3]/80 space-y-1.5"
            >
              <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-serif font-bold text-[#1C3026] truncate">
                  {{ entry.guestName }}
                </span>
                <span
                  class="text-[9px] font-serif font-bold px-2 py-0.5 rounded-full shrink-0 uppercase"
                  :class="{
                    'bg-[#1C3026]/10 text-[#1C3026] border border-[#1C3026]/20': entry.attendance === 'ATTENDING',
                    'bg-[#D4AF37]/15 text-[#91751d] border border-[#D4AF37]/30': entry.attendance === 'UNCERTAIN',
                    'bg-rose-100 text-rose-700 border border-rose-200': entry.attendance === 'NOT_ATTENDING',
                  }"
                >
                  {{ entry.attendance === 'ATTENDING' ? 'Hadir' : entry.attendance === 'UNCERTAIN' ? 'Ragu' : 'Berhalangan' }}
                </span>
              </div>
              <p class="text-xs text-[#1C3026]/85 font-serif leading-relaxed italic">
                "{{ entry.message }}"
              </p>
              <span class="text-[10px] text-[#1C3026]/50 font-serif block pt-0.5">
                {{ entry.createdAt }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
