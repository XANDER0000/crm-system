export function useModClasses(baseClass, mod) {
  return mod?.toLowerCase().split(' ').map((modificator) => `${baseClass}--${modificator}`)?.join(' ');
}
