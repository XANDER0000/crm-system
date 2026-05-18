import type { Column } from '@/types';
import { Status } from './status';

export const BOARD_DATA: Column[] = [
  {
    id: Status.TODO,
    name: 'Входящие',
    items: [],
  },
  {
    id: Status.TO_BE_AGREED,
    name: 'На согласовании',
    items: [],
  },
  {
    id: Status.IN_PROGRESS,
    name: 'В работе',
    items: [],
  },
  {
    id: Status.PRODUCED,
    name: 'Произведено',
    items: [],
  },
  {
    id: Status.DONE,
    name: 'Готово',
    items: [],
  },
];