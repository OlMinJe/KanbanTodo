export const fromISO = (iso?: string | null) => {
  if (!iso) return { date: undefined, time: undefined }
  const date = iso.slice(0, 10) // YYYY-MM-DD
  const time = iso.slice(11, 19) // HH:mm:ss
  return { date, time }
}

export const toISO = (d: Date | null, t: string) => {
  if (!d) return null
  const [hh, mm, ss = '00'] = t.split(':')
  const out = new Date(d)
  out.setHours(Number(hh || 0), Number(mm || 0), Number(ss || 0), 0)
  return out.toISOString()
}
