import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Portal } from '../Portal/Portal';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANUMATION_DELATE = 200;

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose, lazy } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timeRef = useRef<ReturnType<typeof setTimeout>>();

    // настройка lazy для времени отображения компонента для ref
    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        } else {
            setIsMounted(false);
        }
    }, [isOpen]);

    // useRef обеспечивает сохранение ссылки на таймер между рендерами компонента.
    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timeRef.current = setTimeout(() => {
                // Оператор ?. проверяет, существует ли onClose и вызывает его, если он определен.
                onClose();
                setIsClosing(false);
            }, ANUMATION_DELATE);
        }
    }, [onClose]);

    // предотвращение закрытия модального окна по клику на него само
    const contentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // useCallbak отвечает вроде как за меморизацию
    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeHandler();
            }
        },
        [closeHandler]
    );
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearTimeout(timeRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    // передаем theme
    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className || ''])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={contentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
