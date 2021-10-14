import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { Order } from "../../models/order";
import { NgrxOrderService } from "../../services/ngrx-order.service";
import { ErrorLoadAction, LoadAddOrderAction, LoadDeleteOrderAction, loadInitOrdersAction, SuccessAddOrderAction, SuccessDeleteOrderAction, SuccessInitOrdersAction } from "../actions/orders.actions";

@Injectable()
export  class  OrdersListEffects {

    constructor(private orderService: NgrxOrderService, private actions$: Actions) {}

    loadOrders$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadInitOrdersAction),
            switchMap(() => this.orderService.getOrders().pipe(
                map((orders: Order[]) => {
                    orders = orders.map((o) => new Order(o))
                    return SuccessInitOrdersAction({items: orders})
                }),
            ))
        )
    );

    loadCreateOrder$ = createEffect(
        () => this.actions$.pipe(
            ofType(LoadAddOrderAction),
            switchMap((action) => this.orderService.addOrder(action.item).pipe(
                map((order: Order) => SuccessAddOrderAction({item: order})),
                catchError(err => of(ErrorLoadAction({error: err})))
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
    
}