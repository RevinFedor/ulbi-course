import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MoviesData.module.scss';
import { useTranslation } from 'react-i18next';

import { Input } from '@/shared/ui/Input/Input';

import { Loader } from '@/shared/ui/Loader/Loader';
import { Movie } from '../model/types/movie';
import {
    useAppDispatch,
    useAppSelector,
} from '@/shared/lib/hooks/hooksStore';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useEffect } from 'react';
import { fetchMovieData } from '../model/slice/fetchMovieData/fetchMovieData';

interface movieCardProps {
    className?: string;
}

export const MoviesData = ({ className }: movieCardProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const data = useAppSelector((state: StateSchema) => state.movie.data);
    const error = useAppSelector((state: StateSchema) => state.movie.error);
    const isLoading = useAppSelector(
        (state: StateSchema) => state.movie.isLoading
    );

    useEffect(() => {
        dispatch(fetchMovieData());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className={classNames(cls.movieCard, {}, [className])}>
                <Loader />
            </div>
        );
    }

    return (
        <div className={classNames('flex flex-wrap', {}, [className])}>
            {/* профиль, кнопка редактировать */}

            {data?.results.map((movie) => {
                return (
                    <div key={movie._id} className="">
                        <h1>{movie.primaryImage?.caption?.plainText || ''}</h1>

                        <img
                            className="w-56"
                            src={movie.primaryImage?.url || ''}
                        />
                    </div>
                );
            })}
        </div>
    );
};
