import { useState } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import { Icon } from '../../Icon/Icon';
import StarIcon from '@/shared/assets/icons/star.svg?react';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
  isEditing: boolean;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = (props: StarRatingProps) => {
  const {
    className,
    size = 30,
    selectedStars = 0,
    onSelect,
    isEditing,
  } = props;

  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars > 0));

  const onLeave = () => {
    if (!isEditing && !isSelected) {
      setCurrentStarsCount(-1);
    }
  };

  const onHover = (starsCount: number) => () => {
    if (!isEditing || !isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected || !isEditing) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
      setIsSelected(true);
    }
  };

  const mods: Mods = {
    [cls.selected]: isSelected,
  };

  return (
    <div className={classNames(cls.StarRating, {}, [className])}>
      {stars.map((star, starNumber) => (
        <Icon
          key={star}
          className={classNames('cursor-pointer', mods, [
            currentStarsCount >= starNumber ? cls.hovered : cls.normal,
          ])}
          Icon={StarIcon}
          onMouseLeave={onLeave}
          onMouseEnter={onHover(starNumber)}
          onClick={onClick(starNumber)}
        />
      ))}
    </div>
  );
};
