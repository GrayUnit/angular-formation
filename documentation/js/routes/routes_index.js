var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","redirectTo":"/sign-in","pathMatch":"full"},{"path":"list-clients","loadChildren":"./clients/clients.module#ClientsModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/clients/clients-routing.module.ts","module":"ClientsRoutingModule","children":[{"path":"","component":"PageListClientsComponent"},{"path":"add-client","component":"PageListClientsComponent"},{"path":"edit-client","component":"PageListClientsComponent"}],"kind":"module"}],"module":"ClientsModule"}]},{"path":"list-orders","loadChildren":"./orders/orders.module#OrdersModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/orders/orders-routing.module.ts","module":"OrdersRoutingModule","children":[{"path":"","component":"PageListOrdersComponent"},{"path":"add-order","component":"PageAddOrderComponent"},{"path":"edit-order","component":"PageEditOrderComponent"}],"kind":"module"}],"module":"OrdersModule"}]},{"path":"**","loadChildren":"./page-not-found/page-not-found.module#PageNotFoundModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/page-not-found/page-not-found-routing.module.ts","module":"PageNotFoundRoutingModule","children":[{"path":"","component":"PageNotFoundComponent"}],"kind":"module"}],"module":"PageNotFoundModule"}]}],"kind":"module"}]}
