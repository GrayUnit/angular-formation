import { OrdersListEffects } from "./effects/order.effect";
import { OrderStateEntity } from "./entities/order.entity";
import { orderReducer } from "./reducers/order.reducer";



export interface AppState {
    orders: OrderStateEntity
}

export const rootReducers = {
    orders: orderReducer
}

export const appEffects = [OrdersListEffects];