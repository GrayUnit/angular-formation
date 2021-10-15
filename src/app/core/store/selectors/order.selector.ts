import { AppState } from "..";
import { selectOrders } from "../entities/order.entity";
import { createSelector } from "@ngrx/store";
import { Order } from "../../models/order";


export const selectOrderState$ = (state: AppState) => state.orders;

export const selectOrderListEntities$ = createSelector(
    selectOrderState$,
    selectOrders
);

export const getOrders$ = createSelector(
    selectOrderListEntities$,
    orders => orders.map(order => new Order(order))
)

export const selectOrderLoading$ = createSelector(
    selectOrderState$,
    (orders) => orders.loading
);


export const selectOrderLogs = createSelector(
    selectOrderState$,
    (orders) => orders.logs
)