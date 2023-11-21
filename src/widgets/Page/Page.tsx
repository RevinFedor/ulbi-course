import { classNames } from '@/shared/lib/classNames/classNames';
import {
    memo,
    MutableRefObject,
    ReactNode,
    UIEvent,
    UIEventHandler,
    useEffect,
    useRef,
} from 'react';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import cls from './Page.module.scss';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/hooksStore';
import { getUIScrollByPath, uiActions } from '@/features/UI';
import { useLocation } from 'react-router-dom';
import { useThrottle } from '@/shared/lib/hooks/useTrottle';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const scrollValue = useAppSelector((state) =>
        getUIScrollByPath(state, pathname)
    );

    useEffect(() => {
        wrapperRef.current.scrollTop = scrollValue;
    }, []);

    useInfiniteScroll({
        callback: onScrollEnd,

        triggerRef,
        wrapperRef,
    });

    //! доделать логику чтобы срабатывал только при клике 
    const onScroll = useThrottle((e: UIEvent<HTMLElement>) => {
        dispatch(
            uiActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: pathname,
            })
        );
    },500);

    return (
        <section
            onScroll={onScroll}
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
        >
            {children}
            {onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
        </section>
    );
});
