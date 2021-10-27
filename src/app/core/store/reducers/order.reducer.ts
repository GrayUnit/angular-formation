import { HttpErrorResponse } from "@angular/common/http";
import { ActionReducer, createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { Order } from "../../models/order";
import { LoadAddOrder, LoadDeleteOrderAction, LoadError, LoadInitOrders, LoadUpdateOrderAction, SuccessAddOrder, SuccessDeleteOrderAction, SuccessInitOrders, SuccessUpdateOrderAction } from "../actions/order.action";
import { OrderAdapter, orderInitialState, OrderStateEntity } from "../entities/order.entity";


export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state, action) {
        console.log('state :', state);
        console.log('action :', action);

        return reducer(state, action)
    }
}

export const orderReducer = createReducer(
    orderInitialState,
    on(
        LoadInitOrders,
        (state: OrderStateEntity): OrderStateEntity => {
            return {
                ...state,
                loading: true
            }
        }
    ),
    on(
        SuccessInitOrders,
        (state: OrderStateEntity, {items}: {items: Order[]}): OrderStateEntity => {
            return {
                ...OrderAdapter.addMany(items, state),
                loading: false,
                loaded: true
            }
        }
    ),
    on(
        LoadAddOrder,
        (state: OrderStateEntity, {item}: {item: Order}): OrderStateEntity => {
            return {
                ...state,
                loading: true
            }
        }
    ),
    on(
        SuccessAddOrder,
        (state: OrderStateEntity, {item}: {item: Order}): OrderStateEntity => {
            return {
                ...OrderAdapter.addOne(item, state),
                loading: false,
                logs: {type: "Success", message: "Ajout réussi"}
            }
        }
    ),
    on(
        LoadDeleteOrderAction,
        (state: OrderStateEntity, {id}: {id: number}): OrderStateEntity => {
            return {
                ...state,
                loading: true
            }
        }
    ),
    on(
        SuccessDeleteOrderAction,
        (state: OrderStateEntity, {id}: {id: number}): OrderStateEntity => {
            return {
                ...OrderAdapter.removeOne(id, state),
                loading: false,
                logs: {type: "Success", message: "Suppression réussie"}
            }
        }
    ),
    on(
        LoadUpdateOrderAction,
        (state: OrderStateEntity, {order}: {order: Order}): OrderStateEntity => {
            return {
                ...state,
                loading: true
            }
        }
    ),
    on(
        SuccessUpdateOrderAction,
        (state: OrderStateEntity, {order}: {order: Order}): OrderStateEntity => {
            return {
                ...OrderAdapter.updateOne({id: order.id, changes: order}, state),
                loading: false,
                logs: {type: "Success", message: "Modification réussie"}
            }
        }
    ),
    on(
        LoadError,
        (state: OrderStateEntity, {error}: {error: HttpErrorResponse}): OrderStateEntity => {
            return {
                ...state,
                logs: {type: "Error", message: error.message},
                loading: true
            }        
        }
    )

)