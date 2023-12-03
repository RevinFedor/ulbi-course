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

    addArticleBlock: (state, action: PayloadAction<ArticleBlock>) => {
      const newBlock = action.payload;

      state.form!.blocks = [...state.form!.blocks, newBlock];
    },
    updateArticleFields: (state, action) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    //! Используя оператор !, вы можете явно сообщить TypeScript, что state.form не может быть undefined.
    updateArticleBlock: (state, action) => {
      const updatedBlock = action.payload;

      const updatedBlocks = state.form!.blocks.map((block) => {
        // Если id блока совпадает с id обновленного блока, обновляем его
        if (block.id === updatedBlock.id) {
          return {
            ...block,
            ...updatedBlock,
          };
        }
        // В противном случае возвращаем оригинальный блок
        return block;
      });

      state.form = {
        ...state.form!,
        blocks: updatedBlocks,
      };
    },
    removeArticleBlock: (state, action) => {
      const blockIdToRemove = action.payload;

      // Предполагаем, что blockIdToRemove - это уникальный идентификатор блока, который нужно удалить
      const updatedBlocks = state.form!.blocks.filter((block) => block.id !== blockIdToRemove);

      state.form = {
        ...state.form!,
        blocks: updatedBlocks,
      };
    },
  },
});

export const {
  actions: articleEditActions,
  reducer: articleEditReducer,
  useActions: useArticleEditActions,
} = articleEditSlice;
