import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPropertiesComponent } from './search-properties/search-properties.component';
import { PublicSharedModule } from '../public-shared/public-shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SearchPropertiesComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('../login/login.module').then(m => m.LoginModule),
  },
];


@NgModule({
  declarations: [
    SearchPropertiesComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    PublicSharedModule,
  ]
})
export class PublicModule { }
