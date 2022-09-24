import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavedSearchesListComponent } from './saved-searches-list/saved-searches-list.component';
import { SavedSearchesNewComponent } from './saved-searches-new/saved-searches-new.component';
import { RouterModule, Routes } from '@angular/router';
import { ProtectedSharedModule } from '../protected-shared/protected-shared.module';

const routes: Routes = [
  {
    path: "saved-searches",
    component: SavedSearchesListComponent,
  },
  {
    path: "saved-searches/new",
    component: SavedSearchesNewComponent,
  }
];

@NgModule({
  declarations: [
    SavedSearchesListComponent,
    SavedSearchesNewComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ProtectedSharedModule,
  ],
})
export class SavedSearchesModule { }
