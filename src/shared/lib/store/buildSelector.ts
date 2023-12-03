// Импортируем хук `useSelector` из библиотеки react-redux и тип `StateSchema` из вашего приложения
import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';

//! функция, которая достет что-то из state
//! можно еще сделать оболовчку для createSelector, если прилетает 2 и более значения

// Определяем обобщенные типы Selector и Result
type Selector<T> = (state: StateSchema) => T;
type Result<T> = [() => T, Selector<T>]

// Экспортируем функцию `buildSelector`, принимающую селектор и возвращающую кортеж
export function buildSelector<T>(selector: Selector<T>): Result<T> {
    // Определяем функцию хука `useSelector`, которая будет использовать переданный селектор
    const useSelectorHook = () => useSelector(selector);

    // Возвращаем кортеж, содержащий функцию `useSelectorHook` и переданный селектор
    return [useSelectorHook, selector];
}
