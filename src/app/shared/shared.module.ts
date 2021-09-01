import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { TemplateModule } from '../template/template.module';
import { BtnRedirectComponent } from './components/btn-redirect/btn-redirect.component';
import { TabListComponent } from './components/tab-list/tab-list.component';

@NgModule({
  declarations: [TabListComponent, BtnRedirectComponent],
  imports: [CommonModule, RouterModule],
  exports: [
    TabListComponent,
    BtnRedirectComponent,
    TemplateModule,
    IconsModule,
  ],
})
export class SharedModule {}
