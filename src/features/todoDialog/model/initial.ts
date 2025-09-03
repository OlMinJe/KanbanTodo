import { type TODO_FORM_STORE } from '@/entities/todo'

const DEFAULT_TIME_START = '10:30:00'
const DEFAULT_TIME_END = '11:30:00'

export const INITIAL_STATE: Pick<
  TODO_FORM_STORE,
  | 'mode'
  | 'title'
  | 'taskStatus'
  | 'priority'
  | 'description'
  | 'isRange'
  | 'dateSingle'
  | 'timeSingle'
  | 'dateStart'
  | 'timeStart'
  | 'dateEnd'
  | 'timeEnd'
  | 'editOpen'
  | 'editVariant'
  | 'errors'
> = {
  mode: 'create',
  title: '',
  taskStatus: '',
  priority: '',
  description: '',
  isRange: false,
  dateSingle: null,
  timeSingle: DEFAULT_TIME_START,
  dateStart: null,
  timeStart: DEFAULT_TIME_START,
  dateEnd: null,
  timeEnd: DEFAULT_TIME_END,
  editOpen: false,
  editVariant: '',
  errors: {},
}
