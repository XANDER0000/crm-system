export const uniqId = (prefix: string = 'id-'): string => `${prefix}${Math.random().toString(36).slice(2, 9)}`;
