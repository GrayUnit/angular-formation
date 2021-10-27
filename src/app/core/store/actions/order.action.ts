import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Order } from "../../models/order";



export const LoadInitOrders = createAction(
    '[Orders] Load init'
);

export const SuccessInitOrders = createAction(
    '[Orders] Success init',
    props<{items: Order[]}>()
);

export const LoadAddOrder = createAction(
    '[Orders] Load Create',
    props<{item: Order}>()
);

export const SuccessAddOrder = createAction(
    '[Orders] Success Create',
    props<{item: Order}>()
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
    '[orders] Load Update Order',
    props<{order: Order}>()
);

export const SuccessUpdateOrderAction = createAction(
    '[orders] Success Update Order',
    props<{order: Order}>()
);

export const LoadError = createAction(
    '[error] Error Action',
    props<{error: HttpErrorResponse}>()
);
