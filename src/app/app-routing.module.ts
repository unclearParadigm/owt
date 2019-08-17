import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: 'track', loadChildren: './pages/track/track.module#TrackPageModule' },
  { path: 'monitor', loadChildren: './pages/monitor/monitor.module#MonitorPageModule' },
  { path: 'info', loadChildren: './pages/info/info.module#InfoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
