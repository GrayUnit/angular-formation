import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { TemplateModule } from '../template/template.module';
import { BtnRedirectComponent } from './components/btn-redirect/btn-redirect.component';
import { TabListComponent } from './components/tab-list/tab-list.component';
import { StateDirective } from './directives/state.directive';
import { TotalPipe } from './pipes/total.pipe';
import { Total2Pipe } from './pipes/total2.pipe';

@NgModule({
  declarations: [
    TabListComponent,
    BtnRedirectComponent,
    TotalPipe,
    Total2Pipe,
    StateDirective,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    TabListComponent,
    BtnRedirectComponent,
    TemplateModule,
    ReactiveFormsModule,
    IconsModule,
    TotalPipe,
    Total2Pipe,
    StateDirective,
  ],
})
export class SharedModule {}
