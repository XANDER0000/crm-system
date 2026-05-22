export const Status = {
  TODO: 'todo',
  TO_BE_AGREED: 'to-be-agreed',
  IN_PROGRESS: 'in-progress',
  PRODUCED: 'produced',
  DONE: 'done',
} as const;

export type StatusType = typeof Status[keyof typeof Status];