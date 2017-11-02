import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourOFourComponent } from './four-o-four/four-o-four.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list/:listId/details', component: ListDetailsComponent },
  { path: 'list/:listId/details/movie/:movieId', component: MovieDetailsComponent },
  { path: '**', component: FourOFourComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
