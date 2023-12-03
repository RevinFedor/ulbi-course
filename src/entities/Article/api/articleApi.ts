import { createSelector } from '@reduxjs/toolkit';
import { rtkApi } from '@/shared/api/rtkApi';
import { Article } from '..';

const articleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    //! типа данные с сервера, и типа параметров (нет)
    getArticleById: build.query<Article, string>({
      query: (articleId) => ({
        url: `/articles/${articleId}`,
        params: {
          _expand: 'user',
        },
      }),
      providesTags: ['Article'],
    }),
    addArticleById: build.mutation<void, Article>({
      query: (articleForm) => ({
        url: '/articles',
        method: 'POST',
        body: articleForm,
      }),
      invalidatesTags: ['Article'],
    }),
    updateArticleById: build.mutation<void, Article>({
      query: (articleForm) => ({
        url: `/articles/${articleForm.id}`,
        method: 'PUT',
        body: articleForm,
      }),
      invalidatesTags: ['Article'],
    }),
    deleteArticleById: build.mutation({
      query: (articleId) => ({
        url: `/articles/${articleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Article'],
    }),
  }),
});

export const {
  useGetArticleByIdQuery,
  useAddArticleByIdMutation,
  useUpdateArticleByIdMutation,
  useDeleteArticleByIdMutation,
} = articleApi;

//! получение из store
export const useGetArticleById = (articleId: string) =>
  createSelector(
    articleApi.endpoints.getArticleById.select(articleId),
    (usersResult) => usersResult.data,
  );

// export const getCanEditArticle = (articleId: string) =>
//   createSelector(
//     articleApi.endpoints.getArticleById.select(articleId),
//     getUserAuthData,
//     (article, user) => {
//       if (!article || !user) {
//         return false;
//       }

//       return article.user.id === user.id;
//     },
//   );
