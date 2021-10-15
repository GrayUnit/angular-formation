import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Order } from "../../models/order";
import { orderFeatureKey, orderReducer, OrderStateEntity } from "../reducers/orders.reducer";
import * as OrderReducer from '../reducers/orders.reducer';
import { AppState } from "..";

// createFeatureSelector permet de créer des selectors qui vont nous permettre de récupérer une portion de notre
// state. la portion qui nous interesse c'est la clé orders de notre state global
// le type de data qu'on attend c'est orderState (qui correspond au type de la clé todos sur index.ts)
// le paramètre que l'on passe à createFeatureSelector doit correspondre à un nom de clé de l'obj rootReducers (index.ts)

export const selectOrderState$ = (state: AppState) => state.orders;

export const selectOrderListEntities$ = createSelector(
    selectOrderState$,
    OrderReducer.selectOrders
);

export const getOrders$ = createSelector(
    selectOrderListEntities$,
    orders => orders.map(order => new Order(order))
)

export const selectOrderLoading$ = createSelector(
    selectOrderState$,
    (orders) => orders.loaded
);

export const selectOrdersLoaded$ = createSelector(
    selectOrderState$, 
    (orders) => orders.loaded
);

export const selectOrdersErrors$ = createSelector(
    selectOrderState$,
    (orders) => orders.logs
);