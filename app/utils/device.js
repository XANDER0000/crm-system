const isIOS = () => {
  // Проверяем, что код выполняется на клиенте
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  
  return ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) || 
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document));
};

const isTouchDevice = () => {
  // Проверяем, что код выполняется на клиенте
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  
  return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0));
};

export { isIOS, isTouchDevice };