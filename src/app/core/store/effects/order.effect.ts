import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { Order } from "../../models/order";
import { NgrxOrderService } from "../../services/ngrx-order.service";
import { LoadAddOrder, LoadDeleteOrderAction, LoadError, LoadInitOrders, LoadUpdateOrderAction, SuccessAddOrder, SuccessDeleteOrderAction, SuccessInitOrders, SuccessUpdateOrderAction } from "../actions/order.action";

@Injectable()
export class OrderListEffects {

    constructor(private orderService: NgrxOrderService, private actions$: Actions) {}

    loadOrders$ = createEffect(
        () => this.actions$.pipe(
            ofType(LoadInitOrders),
            switchMap(() => this.orderService.getOrders().pipe(
                map((orders: Order[]) => SuccessInitOrders({items: orders}))
            ))
        )
    );

    loadCreateOrders$ = createEffect(
        () => this.actions$.pipe(
            ofType(LoadAddOrder),
            switchMap((payload) => this.orderService.addOrder(payload.item).pipe(
                map((order: Order) => SuccessAddOrder({item: order})),
                catchError(err => of(LoadError({error: err})))
            ))
        )
    );

    loadDeleteOrders$ = createEffect(
        () => this.actions$.pipe(
            ofType(LoadDeleteOrderAction),
            switchMap((payload) => this.orderService.deleteOrder(payload.id).pipe(
                map((id: number) => SuccessDeleteOrderAction({id: id})),
                catchError(err => of(LoadError({error: err})))
            ))
        )
    );

    loadUpdateOrders$ = createEffect(
        () => this.actions$.pipe(
            ofType(LoadUpdateOrderAction),
            switchMap((payload) => this.orderService.updateOrder(payload.order).pipe(
                map((order: Order) => SuccessUpdateOrderAction({order: order}))
            ))
        )
    );
}