import type { STATUS_TYPE } from '@/entities/todo'
import * as CONST from '@/features/todoDialog'

export const getStatusLabel = (code: STATUS_TYPE) => CONST.STATUS_LABELS[code]
