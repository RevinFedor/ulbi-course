import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import { ArticleType } from '@/entities/Article';

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation();

    //! данные для сортировки в tabs
    const tabItemsData = [
        { value: ArticleType.ALL, content: 'Все статьи' },
        { value: ArticleType.IT, content: 'Айти' },
        { value: ArticleType.ECONOMICS, content: 'Экономика' },
        { value: ArticleType.SCIENCE, content: 'Наука' },
    ];

    const typeTabs = useMemo(
        () =>
            tabItemsData.map((item) => ({ ...item, content: t(item.content) })),
        [t]
    );

    //! в tab попадает название и значение ArticleType
    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.value as ArticleType);
        },
        [onChangeType]
    );

    return (
        <Tabs
            tabs={typeTabs}
            value={value}
            onTabClick={onTabClick}
            className={classNames('', {}, [className])}
        />
    );
});
