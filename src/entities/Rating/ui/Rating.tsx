import { useCallback, useEffect, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { StarRating } from '@/shared/ui/StarRating';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';

interface RatingCardProps {
  className?: string;
  title?: string;
  modalTitle?: string;
  hasHasmodal?: boolean;
  onCancel?: (starsCount: number) => void;
  onChangeRate?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
  isEditing: boolean;
}

//! переиспользуемый компонент без привязке к статье или профилю
//! содержит текст модалку и те же start
//! а вот потом мы создаем отдельные фичи, котоыре будут работать с back
export const Rating = (props: RatingCardProps) => {
  const {
    className,
    onAccept,
    modalTitle,
    hasHasmodal,
    onCancel,
    onChangeRate,
    title,
    rate = -1,
    isEditing,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  //! обновляем значение после создания
  useEffect(() => {
    setStarsCount(rate);
  }, [rate]);

  const onSelectStars = useCallback(
    (selectedStarCound: number) => {
      setStarsCount(selectedStarCound);
      if (!isEditing) {
        onChangeRate?.(selectedStarCound);
        return;
      }
      if (hasHasmodal && isEditing) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarCound);
      }
    },
    [onChangeRate, hasHasmodal, onAccept, isEditing],
  );

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <>
      <Text title={modalTitle} />
      <Input placeholder="Ваш отзыв" onChange={setFeedback} />
    </>
  );

  return (
    <div className={classNames('', {}, [className])}>
      <div className="flex flex-col items-center w-full gap-2">
        <Text title={title} />

        <StarRating
          size={40}
          onSelect={onSelectStars}
          selectedStars={starsCount}
          isEditing={isEditing}
        />
      </div>
      <BrowserView>
        <Modal isOpen={isModalOpen}>
          <div className="flex flex-col w-full gap-8">
            {modalContent}
            <div className="flex justify-end gap-2">
              <Button onClick={cancelHandle} theme={ThemeButton.OUTLINE_RED}>
                Закрыть
              </Button>
              <Button onClick={acceptHandle}>Отправить</Button>
            </div>
          </div>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
          <div className="flex flex-col w-full gap-8">
            {modalContent}
            <Button onClick={acceptHandle}>Отправить</Button>
          </div>
        </Drawer>
      </MobileView>
    </div>
  );
};
