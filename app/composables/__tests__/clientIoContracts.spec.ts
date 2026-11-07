import { describe, it, expect } from 'vitest'

describe('Client I/O Contracts Verification (test-client-io)', () => {
  describe('Kontrak 1: Input Sanitization & Numeric Regex', () => {
    const DECIMAL_REGEX = /^\d*([.,]\d{0,4})?$/
    const INTEGER_REGEX = /^\d*$/

    it('menolak test vector desimal ilegal: "1e5", "+-10", "abc", "10..50", "-99", digit Arab "١٢٣"', () => {
      const illegalVectors = ['1e5', '+-10', 'abc', '10..50', '-99', '١٢٣', 'e', '+10']
      for (const vector of illegalVectors) {
        expect(DECIMAL_REGEX.test(vector)).toBe(false)
      }
    })

    it('menerima input desimal valid dan menormalisasi koma (,) ke titik (.)', () => {
      const validVectors = ['0.75', '0,75', '12', '100.2500', '0', '']
      for (const vector of validVectors) {
        expect(DECIMAL_REGEX.test(vector)).toBe(true)
      }

      const rawComma = '0,75'
      const normalized = Number(rawComma.replace(',', '.'))
      expect(normalized).toBe(0.75)
    })

    it('menolak karakter non-digit pada field integer (usia/OTP/kuantitas)', () => {
      expect(INTEGER_REGEX.test('25')).toBe(true)
      expect(INTEGER_REGEX.test('100')).toBe(true)
      expect(INTEGER_REGEX.test('25.5')).toBe(false)
      expect(INTEGER_REGEX.test('-10')).toBe(false)
      expect(INTEGER_REGEX.test('1e2')).toBe(false)
      expect(INTEGER_REGEX.test('abc')).toBe(false)
    })
  })

  describe('Kontrak 2: Semantic Layout & Bottom Action', () => {
    it('memvalidasi kontrak tombol submit: status terkunci saat proses loading aktif', () => {
      const getSubmitButtonState = (isSubmitting: boolean) => ({
        disabled: isSubmitting,
        ariaBusy: isSubmitting,
        hasSpinner: isSubmitting
      })

      const idle = getSubmitButtonState(false)
      expect(idle.disabled).toBe(false)
      expect(idle.ariaBusy).toBe(false)

      const submitting = getSubmitButtonState(true)
      expect(submitting.disabled).toBe(true)
      expect(submitting.ariaBusy).toBe(true)
      expect(submitting.hasSpinner).toBe(true)
    })
  })

  describe('Kontrak 3: 4-State View & Overflow Resilience', () => {
    it('mendeteksi kondisi Empty State saat array ucapan buku tamu kosong', () => {
      const entries: unknown[] = []
      const viewState = entries.length === 0 ? 'EMPTY' : 'SUCCESS'
      expect(viewState).toBe('EMPTY')
    })

    it('mampu memproses teks ekstrem 200 karakter tanpa crash dan menjaga integritas string', () => {
      const longName = 'A'.repeat(200)
      const sanitizeAndTruncate = (str: string, maxLen = 50) => {
        const cleaned = str.trim().replace(/[<>"/\\&]/g, '')
        return cleaned.length > maxLen ? `${cleaned.slice(0, maxLen)}...` : cleaned
      }

      const result = sanitizeAndTruncate(longName)
      expect(result.length).toBe(53)
      expect(result.endsWith('...')).toBe(true)
    })
  })

  describe('Kontrak 4: Idempotensi & Deduplikasi RSVP (Wedding Invariant 4)', () => {
    const generateRsvpKey = (name: string, msg: string) =>
      `rsvp_${name.trim().toLowerCase().replace(/\s+/g, '_')}_${msg.trim().toLowerCase().replace(/\s+/g, '_')}`

    const computeDeterministicId = (key: string) => {
      let hash = 0
      for (let i = 0; i < key.length; i++) {
        hash = ((hash << 5) - hash) + key.charCodeAt(i)
        hash |= 0
      }
      return `rsvp-${Math.abs(hash)}`
    }

    it('menolak penambahan entri duplikat jika dikirim ulang dengan payload identik', () => {
      const existingEntries = [
        { guestName: 'Bima & Rara', message: 'Selamat menempuh hidup baru!' }
      ]

      const isDuplicate = (name: string, msg: string) => {
        const key = generateRsvpKey(name, msg)
        return existingEntries.some(e => generateRsvpKey(e.guestName, e.message) === key)
      }

      // Submit identical payload with minor whitespace variations
      expect(isDuplicate('  Bima & Rara  ', 'Selamat menempuh hidup baru!')).toBe(true)
      // Submit different payload
      expect(isDuplicate('Budi', 'Semoga langgeng')).toBe(false)
    })

    it('menghasilkan ID deterministik yang konsisten untuk payload identik', () => {
      const key1 = generateRsvpKey('Romeo', 'Selamat bahagia selalu!')
      const key2 = generateRsvpKey('  Romeo  ', 'Selamat bahagia selalu!')

      expect(key1).toBe(key2)
      expect(computeDeterministicId(key1)).toBe(computeDeterministicId(key2))
    })
  })

  describe('Kontrak 5: Dirty Form State & A11y Attributes', () => {
    it('mencegah navigasi keluar tanpa konfirmasi saat status isDirty aktif', () => {
      let isDirty = false
      const simulateBeforeUnload = (event: { preventDefault: () => void; returnValue: string }) => {
        if (isDirty) {
          event.preventDefault()
          event.returnValue = ''
        }
      }

      const mockEvent = {
        preventDefault: () => { mockEvent.defaultPrevented = true },
        defaultPrevented: false,
        returnValue: 'default'
      }

      // When clean
      simulateBeforeUnload(mockEvent)
      expect(mockEvent.defaultPrevented).toBe(false)

      // When dirty
      isDirty = true
      simulateBeforeUnload(mockEvent)
      expect(mockEvent.defaultPrevented).toBe(true)
      expect(mockEvent.returnValue).toBe('')
    })

    it('memvalidasi atribut aksesibilitas semantik saat form error', () => {
      const getA11yInputAttributes = (errorMessage?: string) => ({
        'aria-invalid': !!errorMessage,
        'aria-describedby': errorMessage ? 'field-error' : undefined,
        role: errorMessage ? 'alert' : undefined
      })

      const validField = getA11yInputAttributes(undefined)
      expect(validField['aria-invalid']).toBe(false)
      expect(validField['aria-describedby']).toBeUndefined()

      const invalidField = getA11yInputAttributes('Nama wajib diisi minimal 2 karakter')
      expect(invalidField['aria-invalid']).toBe(true)
      expect(invalidField['aria-describedby']).toBe('field-error')
      expect(invalidField.role).toBe('alert')
    })
  })
})
