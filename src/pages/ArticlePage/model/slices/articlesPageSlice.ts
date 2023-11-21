import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article, ArticleView } from '@/entities/Article';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import {
    fetchArticlesList,
    FetchArticlesListProps,
} from '../services/fetchArticlesList';
import { ArticlesPageSchema } from '../..';
import {
    ArticleSortField,
    ArticleType,
} from '@/entities/Article/model/types/article';
import { SortOrder } from '@/shared/types/sort';

type FetchArticlesListAction = PayloadAction<
    Article[],
    string,
    { arg: FetchArticlesListProps },
    never
>;

//! поле comment.id по которому будет идти нормализация данных, между экземлярами
const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

//! селектор для получения комментариев и если статей нету, то возвращаем дефолтный стейт
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState()
);

//! ids и entities по умолчанию идут из entitiAdapter
const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.SMALL,
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 9,
        sort: ArticleSortField.TITLE,
        search: '',
        order: 'asc',
        type: ArticleType.ALL,
    }),
    reducers: {
        //! устанавливает в localStorage режим отображения
        setView: (state, action: PayloadAction<ArticleView>) => {
            localStorage.setItem(
                ARTICLES_VIEW_LOCALSTORAGE_KEY,
                action.payload
            );
            state.view = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },

        //! механизсы сортировки
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },

        //! режим отображения и подгрузка колличества
        initState: (state) => {
            const view = localStorage.getItem(
                ARTICLES_VIEW_LOCALSTORAGE_KEY
            ) as ArticleView;
            state.view = view;

            state.limit = view === ArticleView.BIG ? 4 : 9;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
                //! при обнолвение фильтров мы чистим предыдущие данные, чтобы прорисовывался скелетон
                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state);
                }
            })
            .addCase(
                fetchArticlesList.fulfilled,
                // (state, action: PayloadAction<Article[]>)
                (state, action: FetchArticlesListAction) => {
                    state.isLoading = false;
                    //! проверяем есть ли еще статьи
                    state.hasMore = action.payload.length >= state.limit;
                    //! при обнолвение фильтров мы переписываем весь объект
                    if (action.meta.arg.replace) {
                        articlesAdapter.setAll(state, action.payload);
                    } else {
                        articlesAdapter.addMany(state, action.payload);
                    }
                }
            )
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articlesPageReducer, actions: articlesPageActions } =
    articlesPageSlice;
