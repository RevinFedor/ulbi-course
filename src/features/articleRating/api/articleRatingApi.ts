import { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetArticleRatingArg {
  userId: string;
  articleId: string;
}

export interface RateArticleArg {
  userId: string;
  articleId: string;
  rate: number;
  feedback?: string;
  id?: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<Rating[], GetArticleRatingArg>({
      query: ({ articleId, userId }) => ({
        url: '/article-ratings',
        params: {
          userId,
          articleId,
        },
      }),
      providesTags: ['Rating'],
    }),
    rateArticle: build.mutation<void, RateArticleArg>({
      query: (arg) => ({
        url: '/article-ratings',
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['Rating'],
    }),

    UpdateRateArticle: build.mutation<void, RateArticleArg>({
      query: (arg) => ({
        url: `/article-ratings/${arg.id}`,
        method: 'PUT',
        body: arg,
      }),
      invalidatesTags: ['Rating'],
    }),
  }),
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
export const useUpdateRateArticle = articleRatingApi.useUpdateRateArticleMutation;
