import {
  ImgHTMLAttributes,
  memo,
  ReactElement,
  useLayoutEffect,
  useState,
} from 'react';

//! наследование от html атрибутов для корректной передачи props
interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  // загрузка
  fallback?: ReactElement;
  errorFallback?: ReactElement;
}

export const AppImage = memo((props: AppImageProps) => {
  const {
    className,
    src,
    alt = 'image',
    errorFallback,
    fallback,
    ...otherProps
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  //  синхронно перед монтированием
  useLayoutEffect(() => {
    const img = new Image();
    img.src = src ?? '';
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  if (isLoading && fallback) {
    return fallback;
  }

  if (hasError && errorFallback) {
    return errorFallback;
  }

  return <img className={className} src={src} alt={alt} {...otherProps} />;
});
