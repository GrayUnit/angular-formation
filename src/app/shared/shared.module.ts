import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { TemplateModule } from '../template/template.module';
import { BtnRedirectComponent } from './components/btn-redirect/btn-redirect.component';
import { TabListComponent } from './components/tab-list/tab-list.component';
import { TotalPipe } from './pipes/total.pipe';

@NgModule({
  declarations: [TabListComponent, BtnRedirectComponent, TotalPipe],
  imports: [CommonModule, RouterModule],
  exports: [
    TabListComponent,
    BtnRedirectComponent,
    TemplateModule,
    IconsModule,
    TotalPipe,
  ],
})
export class SharedModule {}
