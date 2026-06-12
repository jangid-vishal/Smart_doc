/** Display name with a single "Dr." prefix (seed data may already include it). */
export function formatDoctorName(name, { withPrefix = true } = {}) {
  if (!name || typeof name !== 'string') {
    return withPrefix ? 'Doctor' : ''
  }
  const cleaned = name.replace(/^dr\.?\s*/i, '').trim()
  if (!cleaned) return withPrefix ? 'Doctor' : ''
  return withPrefix ? `Dr. ${cleaned}` : cleaned
}
