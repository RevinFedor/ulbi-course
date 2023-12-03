import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Listbox } from '@/shared/ui/Popups';
import { ArticleType } from '@/entities/Article';

interface ArticleTypeSelectProps {
  className?: string;
  value?: string;
  onChange?: (value: ArticleType) => void;
  readonly?: boolean;
}

const options = [
  { value: ArticleType.ECONOMICS, content: ArticleType.ECONOMICS },
  { value: ArticleType.IT, content: ArticleType.IT },
  { value: ArticleType.SCIENCE, content: ArticleType.SCIENCE },
];

export const ArticleTypeSelect = memo(
  ({ className, value, onChange, readonly }: ArticleTypeSelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as ArticleType);
      },
      [onChange],
    );

    return (
      <Listbox
        className={classNames('', {}, [className])}
        options={options}
        value={value}
        onChange={onChangeHandler}
        readonly={readonly}
        direction="bottom"
      />
    );
  },
);
