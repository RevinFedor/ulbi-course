import type { PayloadAction } from '@reduxjs/toolkit';
import { ArticleEditSchema } from '../types/articleEditSchema';
import { Article, ArticleBlock } from '@/entities/Article';
import { buildSlice } from '@/shared/lib/store/buildSlice';

const initialState: ArticleEditSchema = {
  readonly: true,
  form: undefined,
};

export const articleEditSlice = buildSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },
    cancelEdit: (state, action: PayloadAction<Article>) => {
      state.readonly = true;
      state.form = action.payload;
    },
    initArticle: (state, action: PayloadAction<Article>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },

    //! новый блок в статье
    addArticleBlock: (state, action: PayloadAction<ArticleBlock>) => {
      const newBlock = action.payload;

      state.form!.blocks = [...state.form!.blocks, newBlock];
    },
    //! поля в самой статье
    updateArticleFields: (state, action) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    //! Используя оператор !, вы можете явно сообщить TypeScript, что state.form не может быть undefined.
    updateArticleBlock: (state, action: PayloadAction<ArticleBlock>) => {
      const updatedBlock = action.payload;
      const index = state.form!.blocks.findIndex((block) => block.id === updatedBlock.id);

      if (index !== -1) {
        state.form!.blocks[index] = { ...state.form!.blocks[index], ...updatedBlock };
      }
    },

    removeArticleBlock: (state, action: PayloadAction<string>) => {
      const blockIdToRemove = action.payload;
      // Фильтруем блоки, оставляя только те, у которых id не совпадает с blockIdToRemove
      state.form!.blocks = state.form!.blocks.filter((block) => block.id !== blockIdToRemove);
    },
  },
});

export const {
  actions: articleEditActions,
  reducer: articleEditReducer,
  useActions: useArticleEditActions,
} = articleEditSlice;
