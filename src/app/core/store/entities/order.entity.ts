import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Order } from "../../models/order";


export interface OrderStateEntity extends EntityState<Order> {
    loading: boolean;
    loaded: boolean;
    selectOrder?: Order;
    logs?: {
        type: string;
        message: string;
    }
}

export const OrderAdapter: EntityAdapter<Order> = createEntityAdapter<Order>({
    sortComparer: false
});

export const orderInitialState: OrderStateEntity = OrderAdapter.getInitialState({
    loading: false,
    loaded: false,
    selectOrder: undefined,
    logs: undefined
});

export const {
    selectIds: selectOrderIds,
    selectEntities: selectOrderEntities,
    selectAll: selectOrders,
    selectTotal: selectOrderTotal
} = OrderAdapter.getSelectors();