import { useTodoFormStore } from '@/features/todoDialog'
import { asYMD, ensureHMS, hms8, msFromKST, partsAtKST } from '@/shared/lib'
import { useEffect, useMemo, useRef, type ChangeEvent } from 'react'

type Args = { openedAt?: number }

export function useScheduleFields({ openedAt }: Args) {
  const {
    isRange,
    dateSingle,
    timeSingle,
    dateStart,
    timeStart,
    dateEnd,
    timeEnd,
    setField,
    clearErrors,
  } = useTodoFormStore((s) => s)

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
    if (!isRange) {
      if (!dateSingle) setField('dateSingle', bases.baseDate)
      if (!timeSingle) setField('timeSingle', bases.baseTime)
    } else {
      if (!dateStart) setField('dateStart', bases.baseDate)
      if (!timeStart) setField('timeStart', bases.baseTime)
      if (!dateEnd) setField('dateEnd', bases.endDate)
      if (!timeEnd) setField('timeEnd', bases.endTime)
    }
    clearErrors?.(['date', 'time', 'dateStart', 'timeStart', 'dateEnd', 'timeEnd', 'range'])
  }, [isRange, bases.baseDate, bases.baseTime, bases.endDate, bases.endTime])

  // 기간 스위치
  const onToggleRange = (b: boolean) => {
    setField('isRange', b)
    clearErrors?.(['date', 'time', 'dateStart', 'timeStart', 'dateEnd', 'timeEnd', 'range'])

    if (b) {
      const sDate = dateStart || dateSingle || bases.baseDate
      const sTime = timeStart || timeSingle || bases.baseTime
      setField('dateStart', sDate)
      setField('timeStart', sTime)

      const sMs = msFromKST(asYMD(sDate), sTime)
      const { date, time } = partsAtKST(
        (Number.isNaN(sMs) ? openedRef.current : sMs) + 3 * 3600 * 1000
      )
      setField('dateEnd', dateEnd || date)
      setField('timeEnd', timeEnd || time)
    } else {
      if (!dateSingle) setField('dateSingle', bases.baseDate)
      if (!timeSingle) setField('timeSingle', bases.baseTime)
    }
  }

  // 종료 < 시작 방지
  useEffect(() => {
    if (!isRange) return
    if (!dateStart || !timeStart || !dateEnd || !timeEnd) return
    const sMs = msFromKST(asYMD(dateStart), timeStart)
    const eMs = msFromKST(asYMD(dateEnd), timeEnd)
    if (!Number.isNaN(sMs) && !Number.isNaN(eMs) && eMs < sMs) {
      const sParts = partsAtKST(sMs)
      if (asYMD(dateEnd ?? '') !== sParts.date) setField('dateEnd', sParts.date)
      if ((timeEnd ?? '') !== sParts.time) setField('timeEnd', sParts.time)
      clearErrors?.(['range'])
    }
  }, [isRange, dateStart, timeStart, dateEnd, timeEnd])

  // 필드 체인지 핸들러
  const onChangeSingleDate = (d: string | Date) => {
    setField('dateSingle', asYMD(d))
    clearErrors?.(['date'])
  }
  const onChangeSingleTime = (e: ChangeEvent<HTMLInputElement> | { target: { value: string } }) => {
    setField('timeSingle', ensureHMS(e.target.value))
    clearErrors?.(['time'])
  }
  const onChangeStartDate = (d: string | Date) => {
    setField('dateStart', asYMD(d))
    clearErrors?.(['dateStart', 'range'])
  }
  const onChangeStartTime = (e: ChangeEvent<HTMLInputElement>) => {
    setField('timeStart', ensureHMS(e.target.value))
    clearErrors?.(['timeStart', 'range'])
  }
  const onChangeEndDate = (d: string | Date) => {
    setField('dateEnd', asYMD(d))
    clearErrors?.(['dateEnd', 'range'])
  }
  const onChangeEndTime = (e: ChangeEvent<HTMLInputElement>) => {
    setField('timeEnd', ensureHMS(e.target.value))
    clearErrors?.(['timeEnd', 'range'])
  }

  return {
    state: { isRange, dateSingle, timeSingle, dateStart, timeStart, dateEnd, timeEnd },
    display: {
      timeSingle8: hms8(timeSingle),
      timeStart8: hms8(timeStart),
      timeEnd8: hms8(timeEnd),
    },
    handlers: {
      onToggleRange,
      onChangeSingleDate,
      onChangeSingleTime,
      onChangeStartDate,
      onChangeStartTime,
      onChangeEndDate,
      onChangeEndTime,
    },
  }
}
