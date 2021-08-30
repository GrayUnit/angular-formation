import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { LoginModule } from '../login/login.module';
import { TemplateModule } from '../template/template.module';
import { IconsModule } from '../icons/icons.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    UiModule,
    LoginModule,
    TemplateModule,
    IconsModule
  ]
})
export class CoreModule { }
