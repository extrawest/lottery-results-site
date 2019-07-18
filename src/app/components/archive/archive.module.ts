import { NgModule } from '@angular/core';
import { YearComponent } from './year/year.component';
import { MonthComponent } from './month/month.component';
import { DayComponent } from './day/day.component';
import { ResultComponent } from './result/result.component';
import { ArchiveRoute } from './archive.route';
import { SharedModule } from '../../shared/shared.module';
import { ArchiveHolderComponent } from './archive-holder/archive-holder.component';
import { RouterModule } from '@angular/router';
import {LocalizationModule, TranslationModule} from "angular-l10n";
import {BallsResultModule} from "../balls-result/balls-result.module.module";

@NgModule({
  declarations: [
    YearComponent,
    MonthComponent,
    DayComponent,
    ResultComponent,
    ArchiveHolderComponent
  ],
    imports: [SharedModule, ArchiveRoute, RouterModule, TranslationModule, LocalizationModule, BallsResultModule],
  exports: [RouterModule]
})
export class ArchiveModule {
  constructor() {}
}
