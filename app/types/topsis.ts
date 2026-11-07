export type CriterionImpact = 'benefit' | 'cost'

export interface Criterion {
  id?: string
  name: string
  weight: number
  impact: CriterionImpact
}

export interface Alternative {
  id?: string
  name: string
  values: number[]
}

export interface RankedAlternative extends Alternative {
  score: number
  rank: number
  positiveDistance: number
  negativeDistance: number
}

export type TopsisState =
  | 'INSUFFICIENT_DATA'
  | 'INVALID_PARAMETERS'
  | 'READY_AND_RANKED'

export interface TopsisCalculationResult {
  state: TopsisState
  rankedAlternatives: RankedAlternative[]
  bestAlternative: RankedAlternative | null
  totalWeight: number
  summary: string
  errorMessage?: string
}

/**
 * Signature skeleton kontrak untuk utilitas kalkulator TOPSIS.
 * Implementasi logika bisnis akan dieksekusi pada tahap sdlc-delivery.
 */
export type TopsisCalculatorFn = (
  criteria: readonly Criterion[],
  alternatives: readonly Alternative[]
) => TopsisCalculationResult
