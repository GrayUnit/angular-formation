import { Injectable } from "@angular/core";
import { NgrxOrderService } from "../../services/ngrx-order.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ErrorLoadAction, LoadAddOrderAction, LoadDeleteOrderAction, LoadInitOrdersAction, LoadUpdateOrderAction, SuccessAddOrderAction, SuccessDeleteOrderAction, SuccessInitOrdersAction, SuccessUpdateOrderAction } from "../actions/orders.action";
import { catchError, map, switchMap } from "rxjs/operators";
import { Order } from "../../models/order";
import { of } from "rxjs";


@Injectable()
export class OrderEffects {
    
    constructor(private orderService: NgrxOrderService, private actions$: Actions) {}

    loadOrders$ = createEffect(
        () => this.actions$.pipe(
            ofType(LoadInitOrdersAction),
            switchMap(() => this.orderService.getOrders().pipe(
                map((orders: Order[]) => SuccessInitOrdersAction({items: orders}))
            ))
        )
    );

    loadCreateOrder$ = createEffect(
        () => this.actions$.pipe(
            ofType(LoadAddOrderAction),
            switchMap((action) => this.orderService.addOrder(action.item).pipe(
                map((order: Order) => SuccessAddOrderAction({item: order})),
            ))
        )
    );

    loadDeleteOrder$ = createEffect(
        () => this.actions$.pipe(
            ofType(LoadDeleteOrderAction),
            switchMap((action) => this.orderService.deleteOrder(action.id).pipe(
                map((id: number) => SuccessDeleteOrderAction({id: id})),
                catchError(err => of(ErrorLoadAction({error: err})))
            ))
        )
    );

    loadUpdateOrder$ = createEffect(
        () => this.actions$.pipe(
            ofType(LoadUpdateOrderAction),
            switchMap((action) => this.orderService.updateOrder(action.order).pipe(
                map((order: Order) => SuccessUpdateOrderAction({order: order})),
                catchError(err => of(ErrorLoadAction({error: err})))
            ))
        )
    );
}

