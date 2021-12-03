import { HttpErrorResponse } from "@angular/common/http";
import { createReducer, on } from "@ngrx/store";
import { Order } from "../../models/order";
import { ErrorLoadAction, LoadAddOrderAction, LoadDeleteOrderAction, loadInitOrdersAction, LoadUpdateOrderAction, SuccessAddOrderAction, SuccessDeleteOrderAction, SuccessInitOrdersAction, SuccessUpdateOrderAction } from "../actions/orders.action";
import { OrderAdapter, orderInitialState, OrderStateEntity } from "../entities/order.entity";


export const orderReducer = createReducer(
    orderInitialState,
    on(
        loadInitOrdersAction,
        (state: OrderStateEntity): OrderStateEntity => {
            return {
                ...state,
                loading: true
            }
        }
    ),
    on(
        SuccessInitOrdersAction,
        (state: OrderStateEntity, {items}: {items: Order[]}): OrderStateEntity => {
            return {
                ...OrderAdapter.addMany(items, state),
                loading: false,
                loaded: true
            }
        }
    ),
    on(
        LoadAddOrderAction,
        (state: OrderStateEntity, {item}: {item: Order}): OrderStateEntity => {
            return {
                ...state,
                loading: true
            }
        }
    ),
    on(
        SuccessAddOrderAction,
        (state: OrderStateEntity, {item}: {item: Order}): OrderStateEntity => {
            return {
                ...OrderAdapter.addOne(item, state),
                loading: false
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
                loading: false
            }
        }
    ),
    on(
        ErrorLoadAction,
        (state: OrderStateEntity, {error}: {error: HttpErrorResponse}): OrderStateEntity => {
            return {
                ...state,
                logs: {type: 'ERROR', message: error.message},
                loading: false
            }
        }
    )
)