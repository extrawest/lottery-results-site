import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MATERIAL_SANITY_CHECKS, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

const materialModules: any[] = [
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  MatRadioModule,
  MatIconModule,
  MatMenuModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules,
  providers: [
    {
      provide: MATERIAL_SANITY_CHECKS,
      useValue: false
    }
  ]
})
export class MaterialModule {}
