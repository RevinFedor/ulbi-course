import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store/buildSelector';

export const [useArticleEditForm, getArticleEditForm] = buildSelector(
  (state: StateSchema) => state.articleEdit.form,
);
// export const [useCounterData, getCounterData] = buildSelector(
//   (state: StateSchema) => state.movie.counter,
// );
