import { ReactNode } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import { useModal } from '@/shared/lib/hooks/useModal';

//! isOpen меняется при onClose или onOpen(которая находиться на верхнем уровне)
interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose, lazy } = props;

  const { closeHandler, isClosing, isMounted } = useModal({
    onClose,
    isOpen,
  });

  //! предотвращение закрытия модального окна по клику на него само
  // const contentClick = (e: React.MouseEvent) => {
  //     e.stopPropagation();
  // };

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  //! передаем theme
  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className || ''])}>
        <Overlay onClick={closeHandler} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
