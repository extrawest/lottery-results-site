import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../shared/material.module';
import { CommonModule } from '@angular/common';
import { TranslationModule } from 'angular-l10n';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, MaterialModule, TranslationModule, RouterModule],
  exports: [MaterialModule, HeaderComponent, FooterComponent]
})
export class CoreModule {}
