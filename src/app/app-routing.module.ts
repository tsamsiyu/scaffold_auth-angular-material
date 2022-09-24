import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuest, CanActivateUser } from './services/auth-token-manager.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule),
    canActivate: [CanActivateGuest],
  },
  {
    // must go after public module not to have conflict with guards redirects
    path: '',
    loadChildren: () => import('./modules/protected/protected.module').then(m => m.ProtectedModule),
    canActivate: [CanActivateUser],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateGuest, CanActivateUser],
})
export class AppRoutingModule { }
