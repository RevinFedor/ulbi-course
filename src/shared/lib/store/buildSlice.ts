// Импортируем необходимые функции и хуки из библиотек
import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit/dist';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

// Объявляем обобщенную функцию `buildSlice`
export function buildSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
  // Создаем срез Redux с использованием переданных опций
  const slice = createSlice(options);

  // оборачиваем все action в dispatch
  const useActions = () => {
    const dispatch = useDispatch();

    /* 
    [K in keyof typeof slice.actions]: Это TypeScript синтаксис, который используется для создания нового типа, перебирая ключи (K) из объекта slice.actions.

    (payload?: any) => void;: Это определение типа значения в объекте UseActions. Здесь указывается, что каждый ключ (K) в объекте UseActions должен быть функцией, принимающей опциональный аргумент payload любого типа (any) и не возвращающей ничего (void).

    Таким образом, тип UseActions представляет объект, где каждый ключ соответствует ключу из slice.actions, и каждое значение - это функция, которая принимает опциональный аргумент и не возвращает значения.
     */
    type UseActions = {
      [K in keyof typeof slice.actions]: (payload?: any) => void;
    };

    // Используем bindActionCreators с типом any
    const boundActions: UseActions = bindActionCreators(slice.actions as any, dispatch);

    return useMemo(() => boundActions, [boundActions]);
  };
  // Возвращаем объект, содержащий срез и функцию `useActions`
  return {
    ...slice,
    useActions,
  };
}
