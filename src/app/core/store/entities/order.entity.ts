import { Order } from "../../models/order";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";


export interface OrderStateEntity extends EntityState<Order> {
    loading: boolean;
    loaded: boolean;
    selectOrder?: Order;
    logs?: {
        type: string;
        message: string;
    }
}

export const orderFeatureKey = 'orders';

export const OrderAdapter: EntityAdapter<Order> = createEntityAdapter<Order>({
    sortComparer: false
});


export const orderInitialState: OrderStateEntity = OrderAdapter.getInitialState({
    loading: false,
    loaded: false,
    logs: undefined,
    selectOrder: undefined
});

export const {
    selectIds: selectOrderIds,
    selectEntities: selectOrderEntities,
    selectAll: selectOrders,
    selectTotal: selectOrderTotal
} = OrderAdapter.getSelectors()