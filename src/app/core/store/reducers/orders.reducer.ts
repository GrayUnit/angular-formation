import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState, Update } from "@ngrx/entity";
import { Order } from "../../models/order";
import * as OrdersAction from '../actions/orders.actions';
import { HttpErrorResponse } from "@angular/common/http";

export interface OrderStateEntity extends EntityState<Order> {
    loading: boolean;
    loaded: boolean;
    selectOrder?: Order;
    logs?: {
        type: string;
        message: string;
    }
}

// nous permet d'utiliser cette constante comme clé sur notre fichier d'index dans rootReducers
export const orderFeatureKey = 'orders';

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
    selectIds: selectOrdersIds,
    selectEntities: selectOrdersEntities,
    selectAll: selectOrders,
    selectTotal: selectTotalOrders
} = OrderAdapter.getSelectors();

// après avoir créé nos action, on les utilise dans OrderReducer qui effectuera une modif de OrderState en fonction de l'action
export const orderReducer = createReducer(
    orderInitialState,
    // on() c'est comme un eventListner qui écoute si une action est dispatch
    on(
        OrdersAction.loadInitOrdersAction,
        (state: OrderStateEntity): OrderStateEntity => {
            return {
                ...state,
                loading: true
            }
        }
    ),
    on(
        OrdersAction.SuccessInitOrdersAction,
        // 2e param est une fn qui va etre appelée si addOrderAction est dispatch
        // cette fn prend 2 params. Le premier est le state à modifier. le deuxième c'est le payload entier { item: Order }
        (state: OrderStateEntity, { items }: {items: Order[]}): OrderStateEntity => {
            return {
                ...OrderAdapter.addMany(items, state),
                loading: false,
                loaded: true
            }
        }
    ),
    on(
        OrdersAction.LoadDeleteOrderAction,
        (state: OrderStateEntity, { id }: { id: number }): OrderStateEntity => {    
          return {
            ...state,
            loading: true
          };
        }
    ),
    on(
        OrdersAction.SuccessDeleteOrderAction,
        (state: OrderStateEntity, {id} : {id: number}): OrderStateEntity => {
            return {
                ...OrderAdapter.removeOne(id, state),
                logs: {type: 'SUCCESS', message: 'La commande a été supprimée avec succès'},
                loading: false
            }
        }
    ),
    on(
        OrdersAction.LoadAddOrderAction,
        (state: OrderStateEntity, {item}: {item: Order}): OrderStateEntity => {
            return {
                ...state,
                loading: true
            }
        }
    ),
    on(
        OrdersAction.SuccessAddOrderAction,
        (state: OrderStateEntity, {item}: {item: Order}): OrderStateEntity => {
            return {
                ...OrderAdapter.addOne(item, state),
                loading: false,
                loaded: true
            }
        }
    ),
    on(
        OrdersAction.LoadUpdateOrderAction,
        (state: OrderStateEntity, {order}: {order: Order}): OrderStateEntity => {
            return {
                ...state,
                loading: true
            }
        }
    ),
    on(
        OrdersAction.SuccessUpdateOrderAction,
        (state: OrderStateEntity, {order}: {order: Order}): OrderStateEntity => {
            return {
                ...OrderAdapter.updateOne({id: order.id, changes: order}, state),
                loading: false,
                logs: {type: 'SUCCESS', message: 'La commande a été modifiée avec succès'},
            }
        }
    ),
    on(
        OrdersAction.ErrorLoadAction,
        (state: OrderStateEntity, {error}: {error: HttpErrorResponse}): OrderStateEntity => {
            return {
                ...state,
                logs: { type: 'ERROR', message: error.message },
                loading: false
            }
        }
    ),
    
)