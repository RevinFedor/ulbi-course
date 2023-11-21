import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import ListIcon from '@/shared/assets/icons/list-24-24.svg?react';
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg?react';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '../../model/types/article';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: TiledIcon,
    },
    {
        view: ArticleView.BIG,
        icon: ListIcon,
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    //! принимает ArticleView и передает ее выше родителю
    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
                <Button
                    theme={ThemeButton.CLEAR}
                    onClick={onClick(viewType.view)}
                    key={viewType.view}
                >
                    <Icon
                        Icon={viewType.icon}
                        className={classNames(
                            '',
                            {
                                [cls.selected]: viewType.view === view,
                            },
                            []
                        )}
                    />
                </Button>
            ))}
        </div>
    );
});
