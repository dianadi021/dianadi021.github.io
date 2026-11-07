import { describe, it, expect } from 'vitest'
import { useTopsis } from '../useTopsis'
import type { Criterion, Alternative } from '~/types/topsis'

describe('useTopsis Composable', () => {
  const { calculate } = useTopsis()

  it('mengembalikan status INSUFFICIENT_DATA jika kriteria < 1 atau alternatif < 2', () => {
    const emptyCriteria: Criterion[] = []
    const singleAlternative: Alternative[] = [{ id: 'a1', name: 'Alt 1', values: [10] }]

    const res1 = calculate(emptyCriteria, singleAlternative)
    expect(res1.state).toBe('INSUFFICIENT_DATA')
    expect(res1.bestAlternative).toBeNull()
    expect(res1.rankedAlternatives).toHaveLength(0)

    const singleCriteria: Criterion[] = [{ id: 'c1', name: 'Kriteria 1', weight: 1, impact: 'benefit' }]
    const res2 = calculate(singleCriteria, singleAlternative)
    expect(res2.state).toBe('INSUFFICIENT_DATA')
  })

  it('mengembalikan status INVALID_PARAMETERS jika total bobot <= 0 atau ada bobot negatif', () => {
    const criteriaWithZeroWeight: Criterion[] = [
      { id: 'c1', name: 'Kriteria 1', weight: 0, impact: 'benefit' }
    ]
    const alternatives: Alternative[] = [
      { id: 'a1', name: 'Alt 1', values: [10] },
      { id: 'a2', name: 'Alt 2', values: [20] }
    ]

    const res1 = calculate(criteriaWithZeroWeight, alternatives)
    expect(res1.state).toBe('INVALID_PARAMETERS')

    const criteriaWithNegativeWeight: Criterion[] = [
      { id: 'c1', name: 'Kriteria 1', weight: -2, impact: 'benefit' }
    ]
    const res2 = calculate(criteriaWithNegativeWeight, alternatives)
    expect(res2.state).toBe('INVALID_PARAMETERS')
  })

  it('mengembalikan status INVALID_PARAMETERS jika matriks memuat nilai non-finite', () => {
    const criteria: Criterion[] = [{ id: 'c1', name: 'Kriteria 1', weight: 1, impact: 'benefit' }]
    const alternatives: Alternative[] = [
      { id: 'a1', name: 'Alt 1', values: [Number.NaN] },
      { id: 'a2', name: 'Alt 2', values: [20] }
    ]

    const res = calculate(criteria, alternatives)
    expect(res.state).toBe('INVALID_PARAMETERS')
    expect(res.errorMessage).toContain('non-angka')
  })

  it('mengembalikan status INVALID_PARAMETERS jika norma kolom bernilai nol (zero-divisor guard)', () => {
    const criteria: Criterion[] = [{ id: 'c1', name: 'Kriteria 1', weight: 1, impact: 'benefit' }]
    const alternatives: Alternative[] = [
      { id: 'a1', name: 'Alt 1', values: [0] },
      { id: 'a2', name: 'Alt 2', values: [0] }
    ]

    const res = calculate(criteria, alternatives)
    expect(res.state).toBe('INVALID_PARAMETERS')
    expect(res.errorMessage).toContain('Norma kolom kriteria bernilai nol')
  })

  it('berhasil menghitung peringkat TOPSIS dengan status READY_AND_RANKED', () => {
    const criteria: Criterion[] = [
      { id: 'c1', name: 'Korelasi', weight: 0.25, impact: 'benefit' },
      { id: 'c2', name: 'R-Squared', weight: 0.25, impact: 'benefit' },
      { id: 'c3', name: 'RMSE', weight: 0.25, impact: 'cost' },
      { id: 'c4', name: 'Akurasi', weight: 0.25, impact: 'benefit' }
    ]

    const alternatives: Alternative[] = [
      { id: 'a1', name: 'Model A', values: [0.79, 0.62, 1.25, 60.89] },
      { id: 'a2', name: 'Model B', values: [0.66, 0.44, 2.89, 63.07] },
      { id: 'a3', name: 'Model C', values: [0.56, 0.31, 1.57, 62.87] },
      { id: 'a4', name: 'Model D', values: [0.82, 0.67, 2.68, 70.19] },
      { id: 'a5', name: 'Model E', values: [0.75, 0.56, 1.30, 80.39] }
    ]

    const res = calculate(criteria, alternatives)
    expect(res.state).toBe('READY_AND_RANKED')
    expect(res.rankedAlternatives).toHaveLength(5)
    expect(res.bestAlternative).not.toBeNull()

    // Verifikasi peringkat 1..N terurut
    expect(res.rankedAlternatives[0]?.rank).toBe(1)
    expect(res.rankedAlternatives[1]?.rank).toBe(2)
    expect(res.rankedAlternatives[2]?.rank).toBe(3)
    expect(res.rankedAlternatives[3]?.rank).toBe(4)
    expect(res.rankedAlternatives[4]?.rank).toBe(5)

    // Skor berada dalam rentang [0, 1]
    for (const alt of res.rankedAlternatives) {
      expect(alt.score).toBeGreaterThanOrEqual(0)
      expect(alt.score).toBeLessThanOrEqual(1)
    }

    // Skor peringkat 1 harus lebih besar atau sama dengan peringkat 2
    expect(res.rankedAlternatives[0]!.score).toBeGreaterThanOrEqual(res.rankedAlternatives[1]!.score)
  })
})
