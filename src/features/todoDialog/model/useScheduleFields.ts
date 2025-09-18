import { useTodoFormStore } from '@/features/todoDialog'
import { asYMD, ensureHMS, fromServerTZ } from '@/shared/lib'
import { useEffect, useMemo, useRef, type ChangeEvent } from 'react'

export function useScheduleFields({ openedAt }: { openedAt?: number }) {
  const { dateSingle, timeSingle, setField, clearErrors } = useTodoFormStore((s) => s)

  const openedRef = useRef<number>(openedAt ?? Date.now())
  useEffect(() => {
    if (openedAt) openedRef.current = openedAt
  }, [openedAt])

  const bases = useMemo(() => {
    const base = fromServerTZ(String(openedRef.current))
    const plus3 = fromServerTZ(String(openedRef.current + 3 * 3600 * 1000))
    return {
      baseDate: base.dateYMD,
      baseTime: base.timeHMS,
      endDate: plus3.dateYMD,
      endTime: plus3.timeHMS,
    }
  }, [openedRef.current])

  useEffect(() => {
    if (!dateSingle) setField('dateSingle', bases.baseDate)
    if (!timeSingle) setField('timeSingle', bases.baseTime)
    clearErrors?.(['dateSingle', 'timeSingle'])
  }, [bases.baseDate, bases.baseTime])

  // 필드 체인지 핸들러
  const onChangeSingleDate = (d: string | Date) => {
    setField('dateSingle', asYMD(d))
    clearErrors?.(['dateSingle'])
  }
  const onChangeSingleTime = (e: ChangeEvent<HTMLInputElement> | { target: { value: string } }) => {
    setField('timeSingle', ensureHMS(e.target.value))
    clearErrors?.(['timeSingle'])
  }

  return {
    state: { dateSingle, timeSingle },
    display: {
      timeSingle: timeSingle,
    },
    handlers: {
      onChangeSingleDate,
      onChangeSingleTime,
    },
  }
}
