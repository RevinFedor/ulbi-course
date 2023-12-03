import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Listbox } from '@/shared/ui/Popups';
import { ArticleBlockType } from '@/entities/Article';

interface ArticleTypeBlockSelectProps {
  className?: string;
  value?: string;
  onChange?: (value: ArticleBlockType) => void;
  readonly?: boolean;
}

const options = [
  { value: ArticleBlockType.CODE, content: ArticleBlockType.CODE },
  { value: ArticleBlockType.IMAGE, content: ArticleBlockType.IMAGE },
  { value: ArticleBlockType.TEXT, content: ArticleBlockType.TEXT },
];

export const ArticleTypeBlockSelect = memo(
  ({ className, value, onChange, readonly }: ArticleTypeBlockSelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as ArticleBlockType);
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
        direction="top"
      />
    );
  },
);
