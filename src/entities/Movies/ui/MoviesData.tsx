import { useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Loader } from '@/shared/ui/Loader';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/hooksStore';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchMovieData } from '../model/services/fetchMovieData';
import { useCounterData, useMovieData } from '../model/selectors/getMovieData';
import { useMovieActions } from '../model/slice/movieSlice';

interface movieCardProps {
  className?: string;
}

export const MoviesData = ({ className }: movieCardProps) => {
  const dispatch = useAppDispatch();
  const data = useMovieData();
  const counter = useCounterData();
  const { addCounter } = useMovieActions();
  const error = useAppSelector((state: StateSchema) => state.movie.error);
  const isLoading = useAppSelector(
    (state: StateSchema) => state.movie.isLoading,
  );

console.log(useMovieActions());

  useEffect(() => {
    dispatch(fetchMovieData());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={classNames('hellow kitty', {}, [className])}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={classNames('flex flex-wrap', {}, [className])}>
      <button className="flex" onClick={(e) => addCounter(2)}>
        isCounter - 
        {counter}
      </button>

      {data?.results.map((movie: any) => (
        <div key={movie._id} className="">
          <h1>{movie.primaryImage?.caption?.plainText || ''}</h1>

          <img
            className="w-56"
            src={movie.primaryImage?.url || ''}
            alt="картинка кино"
          />
        </div>
      ))}
    </div>
  );
};
