import { rtkApi } from '@/shared/api/rtkApi';
import { Comment } from '@/entities/Comment';

interface CommentData {
  articleId: string | number;
  userId: string | number;
  text: string;
}

const commentApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    commentsByArticle: build.query({
      query: (articleId) => ({
        url: '/comments',
        params: {
          articleId,
          _expand: 'user',
        },
      }),
      providesTags: ['Comment'],
    }),
    addCommentForArticle: build.mutation<Comment, CommentData>({
      query: (body) => ({
        url: '/comments',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comment'],
    }),
    deleteCommentForArticle: build.mutation<Comment, string>({
      query: (comentID) => ({
        url: `/comments/${comentID}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const {
  useCommentsByArticleQuery,
  useAddCommentForArticleMutation,
  useDeleteCommentForArticleMutation,
} = commentApi;

// export const useDeleteCommentIs = () =>
//   createSelector(
//     commentApi.endpoints.deleteCommentForArticle.,
//     (usersResult) => usersResult,
//   );
