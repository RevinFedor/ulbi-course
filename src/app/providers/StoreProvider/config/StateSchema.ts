import { CounterSchema } from 'src/entities/Counter';
import { UserSchema } from 'src/entities/User';
import { LoginSchema } from 'src/features/AuthByUsername';
import { ProfileSchema } from 'src/entities/Profile';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    LoginForm: LoginSchema;
    Profile: ProfileSchema;
}
