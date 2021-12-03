import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Order } from "../../models/order";

export const loadInitOrdersAction = createAction(
    '[orders] Load Init Order'
);

export const SuccessInitOrdersAction = createAction(
    '[orders] Success Init Orders',
    props<{items: Order[]}>() 
);

export const LoadAddOrderAction = createAction(
    '[orders] Load Add orders',
    props<{ item: Order }>()
);

export const SuccessAddOrderAction = createAction(
    '[orders] Success Add orders',
    props<{ item: Order }>()
);

export const LoadDeleteOrderAction = createAction(
    '[orders] Load Delete orders',
    props<{ id: number }>()
)

export const SuccessDeleteOrderAction = createAction(
    '[orders] Success Delete orders',
    props<{ id: number }>()
);

export const LoadUpdateOrderAction = createAction(
    '[orders] Load Update orders',
    props<{order: Order}>()
);

export const SuccessUpdateOrderAction = createAction(
    '[orders] Success Update orders',
    props<{order: Order}>()
);

export const ErrorLoadAction = createAction(
    '[error] Error Action',
    props<{error: HttpErrorResponse}>()
);