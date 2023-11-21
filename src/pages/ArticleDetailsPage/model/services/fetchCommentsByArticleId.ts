import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
    >(
        'articleDetails/fetchCommentsByArticleId',
        async (articleId, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            if (!articleId) {
                return rejectWithValue('error');
            }

            try {
                const response = await extra.api.get<Comment[]>('/comments', {
                    params: {
                        articleId,
                        //! по userID получаем информаию по пользователю из user по query параметрам 
                        //! http://localhost:3001/comments?articleId=1&_expand=user (это заеб уе по бэку)
                        _expand: 'user',
                    },
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );
