import { orderFeatureKey, OrderStateEntity } from "./entities/order.entity";
import { orderReducer } from "./reducers/order.reducer";
import { Action, ActionReducerMap} from "@ngrx/store";
import { OrderEffects } from "./effects/order.effect";

export interface AppState {
    orders: OrderStateEntity,
    // clients: ClientStateEntity
}

export const rootReducers: ActionReducerMap<AppState, Action> = {
    [orderFeatureKey]: orderReducer
}

export const appEffects = [OrderEffects];