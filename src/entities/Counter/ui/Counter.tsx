
import { decrement, increment } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/hooksStore';

export const Counter = () => {
    const dispatch = useAppDispatch();
    const counterValue = useAppSelector(getCounterValue);

    const incrementHundler = () => {
        dispatch(increment());
    };

    const decrementHundler = () => {
        dispatch(decrement());
    };
    return (
        <div>
            <h1>value = {counterValue}</h1>
            <button onClick={incrementHundler}>increment</button>
            <button onClick={decrementHundler}>decrement</button>
        </div>
    );
};
