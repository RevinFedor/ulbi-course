import { classNames } from 'src/shared/lib/classNames/classNames';
import  {
    InputHTMLAttributes,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react';
import cls from './Input.module.scss';


// забираем все props из типа InputHTMLAttributes, исключая value и  onChange
type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    
}
 
export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        ...otherProps
    } = props;
    const ref = useRef<HTMLInputElement>(null);
    // отображение коретки (мерцающей строчки) и позиция в зависимости от ввода
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);

    // автофокус при открытие модального окна
    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // если onChange передан, то функция будет вызываться и изменять value input
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };

    // показ коретки и местоположение в зависимости от выбранного текста    
    const onBlur = () => {
        setIsFocused(false);
    };
    const onFocus = () => {
        setIsFocused(true);
    };
    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0);
    };

    // каждая буква это span и в нем стоит коретка
    return (
        <div className={classNames(cls.InputWrapper, {}, [className || ''])}>
            {placeholder && (
                <div className={cls.placeholder}>{`${placeholder}>`}</div>
            )}
            <div className={cls.caretWrapper}>
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    className={cls.input}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    {...otherProps}
                />
                {isFocused && (
                    <span
                        className={cls.caret}
                        style={{ left: `${caretPosition * 9}px` }}
                    />
                )}
            </div>
        </div>
    );
});
