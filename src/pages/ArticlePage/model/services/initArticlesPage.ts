import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    getArticlesPageHasInited,
    getArticlesPageNum,
} from '../selectors/articlesPageSelectors';
import { fetchArticlesList } from './fetchArticlesList';
import { articlesPageActions } from '../slices/articlesPageSlice';
import { SortOrder } from '@/shared/types/sort';
import { ArticleSortField } from '@/entities/Article/model/types/article';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
    //!  проверка есть ли еще страницы и isLoading
    const { getState, dispatch } = thunkApi;
    const inited = getArticlesPageHasInited(getState());

    // ! проверяем инициализирован ли уже store
    if (!inited) {
        //! при загрузке страницы устанавливаем фильтры из URL
        const urlParamsMapping = {
            order: articlesPageActions.setOrder,
            sort: articlesPageActions.setSort,
            search: articlesPageActions.setSearch,
            view: articlesPageActions.setView,
        };
        Object.entries(urlParamsMapping).forEach(([urlParam, action]) => {
            const valueFromUrl = searchParams.get(urlParam);

            if (valueFromUrl) {
                dispatch(action(valueFromUrl));
            }
        });

        //! получаем и инициализируем режим отображения из localstorage
        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList({}));
    }
});
