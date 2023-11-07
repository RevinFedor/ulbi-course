// наружу выходит лишь 1 компонент, 1 тип, и 1 редусер для подключения

export { LoginModal } from './ui/LoginModal/LoginModal';
export type { LoginSchema } from './model/types/loginSchema';
export { loginReducer } from './model/slice/loginSlice';
