import { useCallback, MutableRefObject, useRef } from 'react';

/**
 * Хук, который позволяет отменять предыдущий вызов функции пока не истечет delay
 * @param callback
 * @param delay - задержка в мс
 */


//! Гарантирует, что ресурсоемкие операции выполняются только после паузы в операции ввода.
//! до тех пор, пока таймер отчищается, функция не вызывается
export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timer = useRef() as MutableRefObject<any>;

  return useCallback(
    (...args: any[]) => {
      //! таймер будет сбрасываться каждый раз при вызове функции, и функция callback выполнится только после истечения задержки.
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}
