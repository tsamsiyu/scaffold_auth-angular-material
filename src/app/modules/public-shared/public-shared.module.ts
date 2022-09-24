import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PublicLayoutComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    PublicLayoutComponent,
  ],
})
export class PublicSharedModule { }
