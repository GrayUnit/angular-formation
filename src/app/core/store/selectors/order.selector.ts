import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { Order } from "../../models/order";
import { selectOrders } from "../entities/order.entity";



export const selectOrderState$ = (state: AppState) => state.orders;

export const selectOrderListEntities$ = createSelector(
    selectOrderState$,
    selectOrders
);

export const selectOrderLoading$ = createSelector(
    selectOrderState$,
    (orders) => orders.loading
);

export const selectOrderObject$ = createSelector(
    selectOrderListEntities$,
    (orders: Order[]) => orders.map(
        (item) => new Order(item)
    ) 
);

export const selectOrderError$ = createSelector(
    selectOrderState$,
    (orders) => orders.logs
);