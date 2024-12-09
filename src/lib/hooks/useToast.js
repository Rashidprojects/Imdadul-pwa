import { useState } from 'react';

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = (message, variant = 'success', duration = 3000) => {
    setToast({ message, variant });

    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  return {
    toast,
    showToast,
  };
}
