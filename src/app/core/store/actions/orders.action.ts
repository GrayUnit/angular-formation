import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Order } from "../../models/order";

export const LoadInitOrdersAction = createAction(
    '[orders] Load Init Order'
);

export const SuccessInitOrdersAction = createAction(
    '[orders] Success Init Order',
    props<{items: Order[]}>()
);

export const LoadAddOrderAction = createAction(
    '[orders] Load Add Orders',
    props<{item: Order}>()
);

export const SuccessAddOrderAction = createAction(
    '[orders] Success Add Orders',
    props<{item: Order}>()
);

export const LoadDeleteOrderAction = createAction(
    '[orders] Load Delete Orders',
    props<{id: number}>()
);

export const SuccessDeleteOrderAction = createAction(
    '[orders] Success Delete Orders',
    props<{id: number}>()
);

export const LoadUpdateOrderAction = createAction(
    '[orders] Load Update Order',
    props<{order: Order}>()
);

export const SuccessUpdateOrderAction = createAction(
    '[orders] Success Update Order',
    props<{order: Order}>()
);

export const ErrorLoadAction = createAction(
    '[error] Error Action',
    props<{error: HttpErrorResponse}>()
);