
import { StateSchema } from "src/app/providers/StoreProvider/config/StateSchema";

export const getCounter = ((state: StateSchema) => state.counter);
