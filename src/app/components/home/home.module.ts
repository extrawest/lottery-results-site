import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoute } from './home.route';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import {BallsResultModule} from "../balls-result/balls-result.module.module";

@NgModule({
  declarations: [HomeComponent],
    imports: [SharedModule, HomeRoute, RouterModule, BallsResultModule]
})
export class HomeModule {
}
