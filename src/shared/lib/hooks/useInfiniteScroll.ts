import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScrollOptions {
  //! функция, вызываемая при пересечение элемента
  callback?: () => void;
  //! ref элемент который будет пересечен
  triggerRef: MutableRefObject<HTMLElement>;
  //! страница со скроллом
  wrapperRef: MutableRefObject<HTMLElement | null | undefined>;
}

export function useInfiniteScroll({
  callback,
  wrapperRef,
  triggerRef,
}: UseInfiniteScrollOptions) {
  useEffect(() => {
    //  замыкаем элементы, так как после демонтирование он пропадает
    let observer: IntersectionObserver | null = null;

    if (callback) {
      const options = {
        root: wrapperRef.current,
        rootMargin: '0px',
        threshold: 1.0,
      };

      //! вызывается в момент пересечея triggerRef
      observer = new IntersectionObserver(([entry]) => {
        //! entry - массив наблюдаемых элементов

        if (entry.isIntersecting) {
          // debugger;
          callback();
        }
      }, options);

      //! вызываем метод observe и указываем наблюдаемый элемент
      observer.observe(triggerRef.current);
    }

    //! отказываемся от наблюдения при демпонтирование компонента
    return () => {
      if (observer && triggerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(triggerRef.current);
      }
    };
  }, [callback, triggerRef, wrapperRef]);
}
