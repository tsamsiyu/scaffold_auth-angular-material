import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SavedSearchesModule } from '../saved-searches/saved-searches.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'saved-searches',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('../saved-searches/saved-searches.module').then(m => m.SavedSearchesModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SavedSearchesModule,
  ],
})
export class ProtectedModule { }
