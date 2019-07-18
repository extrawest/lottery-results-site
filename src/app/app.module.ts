import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from './components/home/home.module';
import {CoreModule} from './core/core.module';
import {ArchiveModule} from './components/archive/archive.module';
import {LotteryDetailsModule} from './components/lottery-details/lottery.details.module';
import {NgModule} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {RouterModule} from '@angular/router';
import {SharedModule} from './shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    HomeModule,
    LotteryDetailsModule,
    CoreModule,
    ArchiveModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    BrowserModule.withServerTransition({ appId: 'lucky-numbers' }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
