import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { OrderI } from "../../interfaces/order-i";
import { Order } from "../../models/order";




export interface OrderStateEntity extends EntityState<OrderI> {
    loading: boolean;
    loaded: boolean;
    selectOrder?: Order;
    logs?: {
        type: string;
        message: string;
    }
}

export const OrderAdapter: EntityAdapter<Order> = createEntityAdapter<OrderI>({
    sortComparer: false
});

export const orderInitialState: OrderStateEntity = OrderAdapter.getInitialState({
    loading: false,
    loaded: false,
    selectOrder: undefined,
    logs: undefined
});

export const {
    selectIds: selectOrdersIds,
    selectEntities: selectOrdersEntities,
    selectAll: selectOrders,
    selectTotal: selectOrdersTotal
} = OrderAdapter.getSelectors();
