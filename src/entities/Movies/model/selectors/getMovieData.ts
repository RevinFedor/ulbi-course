import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store/buildSelector';

export const [useMovieData, getMovieData] = buildSelector((state: StateSchema) => state.movie.data);
export const [useCounterData, getCounterData] = buildSelector(
  (state: StateSchema) => state.movie.counter,
);
