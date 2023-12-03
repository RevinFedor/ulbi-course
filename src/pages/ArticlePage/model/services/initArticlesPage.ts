import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortOrder } from '@/shared/types/sort';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import {
  getArticlesPageHasInited,
} from '../selectors/articlesPageSelectors';
import { fetchArticlesList } from './fetchArticlesList';
import { articlesPageActions } from '../slices/articlesPageSlice';

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
    const orderFromUrl = searchParams.get('order') as SortOrder;
    const sortFromUrl = searchParams.get('sort') as ArticleSortField;
    const searchFromUrl = searchParams.get('search');
    const typeFromUrl = searchParams.get('type') as ArticleType;

    if (orderFromUrl) {
      dispatch(articlesPageActions.setOrder(orderFromUrl));
    }
    if (sortFromUrl) {
      dispatch(articlesPageActions.setSort(sortFromUrl));
    }
    if (searchFromUrl) {
      dispatch(articlesPageActions.setSearch(searchFromUrl));
    }
    if (typeFromUrl) {
      dispatch(articlesPageActions.setType(typeFromUrl));
    }

    //! получаем и инициализируем режим отображения из localstorage
    dispatch(articlesPageActions.initState());
    dispatch(fetchArticlesList({}));
  }
});
