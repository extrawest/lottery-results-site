import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { TranslateModule } from './translate.module';

const sharedModules: any[] = [
  CommonModule,
  FormsModule,
  HttpClientModule,
  MaterialModule,
  TranslateModule
];

@NgModule({
  imports: [sharedModules],
  exports: [sharedModules]
})
export class SharedModule {}
