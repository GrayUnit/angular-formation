import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { Order } from "../../models/order";
import { selectOrders } from "../entities/order.entity";


export const selectOrderState$ = (state: AppState) => state.orders;

export const selectOrderListEntities$ = createSelector(
    selectOrderState$,
    selectOrders
);

export const getOrders$ = createSelector(
    selectOrderListEntities$,
    orders => orders.map(order => new Order(order))
);

export const selectOrdersError$ = createSelector(
    selectOrderState$,
    orders => orders.logs
);

export const getById$ = (id: number) => createSelector(
    selectOrderListEntities$,
    orders => orders.find((o) => o.id == id)
);
