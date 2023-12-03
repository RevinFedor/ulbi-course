import { useCallback, useRef } from 'react';

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
  //! будет ли работать функция
  const throttleRef = useRef(false);

  //! чтобы callback функция создавалась только один раз
  //! указываем функцию с аргументами any
  return useCallback(
    (...args: any[]) => {
      //! вызов функции и задержка
      if (!throttleRef.current) {
        callback(...args);
        throttleRef.current = true;

        setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    },
    [callback, delay],
  );
}
