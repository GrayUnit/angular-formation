import { Action, ActionReducerMap, createReducer, MetaReducer } from "@ngrx/store";
import { Order } from "../models/order";
import { OrdersListEffects } from "./effects/orders.effects";
import { orderFeatureKey, OrderStateEntity, orderReducer, debug } from "./reducers/orders.reducer";


export const rootReducers: ActionReducerMap<AppState, Action> = {
  [orderFeatureKey]: orderReducer
}

export interface AppState {
  orders: OrderStateEntity;
}

export const metaReducers: MetaReducer<any>[] = [debug];



export const appEffects = [OrdersListEffects];