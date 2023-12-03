import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

export enum ThemeIcon {
  CLEAR = 'Icon',
  INVERTED = 'inverted',
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  theme?: ThemeIcon;
}

export const Icon = memo((props: IconProps) => {
  const { className, Icon, theme = ThemeIcon.CLEAR, ...otherProps } = props;

  return (
    <Icon
      className={classNames(`${className}`, {}, [cls[theme || '']])}
      {...otherProps}
    />
  );
});
