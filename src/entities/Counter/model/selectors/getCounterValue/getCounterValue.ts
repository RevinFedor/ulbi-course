import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'src/app/providers/StoreProvider/config/StateSchema';
import { getCounter } from '../getCounter/getCounter';
import { CounterSchema } from '../../types/CounterShema';

// counter - это аргумент, оплучаемвый из getCounter
export const getCounterValue = createSelector(
    getCounter,
    (counter: CounterSchema) => {
        return counter.value;

    }
    
    
);
