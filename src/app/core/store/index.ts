import { Action, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { OrderListEffects } from "./effects/order.effect";
import { OrderStateEntity } from "./entities/order.entity";
import { debug, orderReducer} from "./reducers/order.reducer";


export interface AppState {
    orders: OrderStateEntity;
}

export const rootReducers: ActionReducerMap<AppState, Action> = {
    ['orders']: orderReducer
}

export const appEffects = [OrderListEffects]

export const metaReducers: MetaReducer<any>[] = [debug];