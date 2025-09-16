import { useTodoFormStore } from '@/features/todoDialog'
import { asYMD, ensureHMS, hms8, partsAtKST } from '@/shared/lib'
import { useEffect, useMemo, useRef, type ChangeEvent } from 'react'

export function useScheduleFields({ openedAt }: { openedAt?: number }) {
  const { dateSingle, timeSingle, setField, clearErrors } = useTodoFormStore((s) => s)

  const openedRef = useRef<number>(openedAt ?? Date.now())
  useEffect(() => {
    if (openedAt) openedRef.current = openedAt
  }, [openedAt])

  const bases = useMemo(() => {
    const base = partsAtKST(openedRef.current)
    const plus3 = partsAtKST(openedRef.current + 3 * 3600 * 1000)
    return { baseDate: base.date, baseTime: base.time, endDate: plus3.date, endTime: plus3.time }
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
      timeSingle: hms8(timeSingle),
    },
    handlers: {
      onChangeSingleDate,
      onChangeSingleTime,
    },
  }
}
