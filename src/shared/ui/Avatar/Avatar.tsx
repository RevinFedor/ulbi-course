import { CSSProperties, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import UserIcon from '../../assets/icons/user-filled.svg?react';
import { Skeleton } from '../Skeleton';
import { AppImage } from '../AppImage';
import { Icon } from '../Icon';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar = ({ className, src, size, alt }: AvatarProps) => {
  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(
    () => ({
      width: size || 100,
      height: size || 100,
    }),
    [size],
  );
  const fallback = <Skeleton width={size} height={size} border="50%" />;
  const errorFallback = <Icon width={size} height={size} Icon={UserIcon} />;

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, mods, [className])}
    />
  );
};
