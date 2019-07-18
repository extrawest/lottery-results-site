import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YearComponent } from './year/year.component';
import { MonthComponent } from './month/month.component';
import { DayComponent } from './day/day.component';
import { ResultComponent } from './result/result.component';
import { ArchiveHolderComponent } from './archive-holder/archive-holder.component';

const routes: Routes = [
  {
    path: ':id/details/archive',
    component: ArchiveHolderComponent,
    children: [{ path: '', component: YearComponent, outlet: 'archive' }]
  },
  {
    path: ':id/details/archive/:year',
    component: ArchiveHolderComponent,
    children: [{ path: '', component: MonthComponent, outlet: 'archive' }]
  },
  {
    path: ':id/details/archive/:year/:month',
    component: ArchiveHolderComponent,
    children: [{ path: '', component: DayComponent, outlet: 'archive' }]
  },
  {
    path: ':id/details/archive/:year/:month/:day',
    component: ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchiveRoute {}
