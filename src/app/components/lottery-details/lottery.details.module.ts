import { NgModule } from '@angular/core';
import { LotteryDetailsComponent } from './lottery-details.component';
import { MaterialModule } from '../../shared/material.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TranslationModule } from 'angular-l10n';
import {BallsResultModule} from "../balls-result/balls-result.module.module";

@NgModule({
  declarations: [LotteryDetailsComponent],
  exports: [MaterialModule],
    imports: [SharedModule, RouterModule, TranslationModule, BallsResultModule]
})
export class LotteryDetailsModule {}
