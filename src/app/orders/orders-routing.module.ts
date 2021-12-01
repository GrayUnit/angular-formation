import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailOrderComponent } from './components/detail-order/detail-order.component';
import { OtherComponentComponent } from './components/other-component/other-component.component';
import { PageAddOrderComponent } from './pages/page-add-order/page-add-order.component';
import { PageEditOrderComponent } from './pages/page-edit-order/page-edit-order.component';
import { PageListOrdersComponent } from './pages/page-list-orders/page-list-orders.component';

const routes: Routes = [
  { 
    path: '',
    component: PageListOrdersComponent,
    data: { title: "Orders" },
    children: [
      { path: '', redirectTo: 'detail', pathMatch: 'full'},
      { path: 'detail', component: DetailOrderComponent },
      { path: 'other', component: OtherComponentComponent}
    ]
  },
  { path: 'add-order', component: PageAddOrderComponent },
  { 
    path: 'edit-order/:id',
    component: PageEditOrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
