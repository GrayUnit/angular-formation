import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconNavComponent } from './components/icon-nav/icon-nav.component';
import { IconEditComponent } from './components/icon-edit/icon-edit.component';
import { IconCloseComponent } from './components/icon-close/icon-close.component';
import { IconDeleteComponent } from './components/icon-delete/icon-delete.component';


@NgModule({
  declarations: [
    IconNavComponent,
    IconEditComponent,
    IconCloseComponent,
    IconDeleteComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    IconNavComponent,
    IconEditComponent,
    IconCloseComponent,
    IconDeleteComponent
  ]
})
export class IconsModule { }
