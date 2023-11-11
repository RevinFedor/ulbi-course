import { classNames } from '@/shared/lib/classNames/classNames';
import React, { memo } from 'react';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    Icon: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
            title?: string | undefined;
        }
    >;
}

export const Icon = memo((props: IconProps) => {
    const { className, Icon } = props;

    return <Icon className={classNames(cls.Icon, {}, [className])} />;
});
