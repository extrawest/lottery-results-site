import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BallsResultComponent} from "./balls-result.component";

@NgModule({
  declarations: [BallsResultComponent],
  exports: [
    BallsResultComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BallsResultModule {}
