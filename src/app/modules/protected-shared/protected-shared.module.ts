import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedLayoutComponent } from './protected-layout/protected-layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    ProtectedLayoutComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [
    ProtectedLayoutComponent,
  ]
})
export class ProtectedSharedModule { }
