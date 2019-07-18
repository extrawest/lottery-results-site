import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LotteryDetailsComponent } from './components/lottery-details/lottery-details.component';
import { ArchiveHolderComponent } from './components/archive/archive-holder/archive-holder.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: ':id/details',
    component: LotteryDetailsComponent
  },
  {
    path: ':id/:name/details/archive',
    component: ArchiveHolderComponent
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
