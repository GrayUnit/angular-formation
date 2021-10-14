import { Action, ActionReducerMap, createReducer } from "@ngrx/store";
import { Order } from "../models/order";
import { OrdersListEffects } from "./effects/orders.effects";
import { orderFeatureKey, OrderStateEntity, orderReducer } from "./reducers/orders.reducer";


export const rootReducers: ActionReducerMap<AppState, Action> = {
  [orderFeatureKey]: orderReducer
}

export interface AppState {
  orders: OrderStateEntity;
}


export const appEffects = [OrdersListEffects];