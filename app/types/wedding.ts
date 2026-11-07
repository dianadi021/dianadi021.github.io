export type InvitationGateState = 'LOCKED_COVER' | 'OPENED_UNLOCKED'

export type AudioPlaybackState = 'PAUSED' | 'PLAYING' | 'MUTED' | 'BLOCKED_AUTOPLAY'

export type RsvpAttendanceStatus = 'ATTENDING' | 'NOT_ATTENDING' | 'UNCERTAIN'

export interface GuestContext {
  readonly guestName: string
  readonly isVip: boolean
  readonly invitationCode?: string
}

export interface CoupleProfile {
  readonly groomName: string
  readonly groomFullName: string
  readonly groomBio: string
  readonly groomParents: string
  readonly brideName: string
  readonly brideFullName: string
  readonly brideBio: string
  readonly brideParents: string
}

export interface WeddingEventSchedule {
  readonly id: string
  readonly title: string
  readonly date: string
  readonly time: string
  readonly venue: string
  readonly address: string
  readonly mapUrl: string
  readonly calendarUrl: string
}

export interface RsvpSubmissionPayload {
  readonly guestName: string
  readonly attendance: RsvpAttendanceStatus
  readonly totalGuests: number
  readonly message: string
}

export interface RsvpEntryRecord extends RsvpSubmissionPayload {
  readonly id: string
  readonly createdAt: string
}

export interface DigitalGiftAccount {
  readonly bankName: string
  readonly accountNumber: string
  readonly holderName: string
  readonly qrCodeUrl?: string
}

export interface CountdownTimeRemaining {
  readonly days: number
  readonly hours: number
  readonly minutes: number
  readonly seconds: number
  readonly isPassed: boolean
}

/**
 * Skeleton Signature: Parser parameter tamu dari query string URL.
 * Implementasi logika bisnis dieksekusi pada tahap sdlc-delivery.
 */
export type GuestParameterParserFn = (
  searchParams: Record<string, string | string[] | undefined>
) => GuestContext

/**
 * Skeleton Signature: Penghitung hitung mundur waktu resepsi/akad.
 * Implementasi logika bisnis dieksekusi pada tahap sdlc-delivery.
 */
export type CountdownCalculatorFn = (
  targetDateIso: string,
  nowInstance: Date
) => CountdownTimeRemaining
