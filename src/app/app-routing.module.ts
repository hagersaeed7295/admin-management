import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AuthGuard } from './shared/helpers/guards/auth.guard';

const routes: Routes = [

  { path: '', loadChildren: () => import('./features-modules/authentication/authentication.module').then(m => m.AuthenticationModule) },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', loadChildren: () => import('./features-modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'users', loadChildren: () => import('./features-modules/users/users.module').then(m => m.UsersModule) },
    ]
  },
  {
    path: "404",
    component: NotFoundComponent,
  },

 
  {
    path: "**",
    redirectTo: '404',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

