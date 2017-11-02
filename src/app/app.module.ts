import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatCardModule, MatToolbarModule, MatMenuModule, MatIconModule, MatButtonModule, MatDialogModule, MatGridListModule,
  MatTooltipModule, MatFormFieldModule, MatInputModule, MatListModule, MatExpansionModule, MatProgressSpinnerModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { FourOFourComponent } from './four-o-four/four-o-four.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewListComponent } from './dialogs/new-list/new-list.component';
import { DialogService } from './services/dialog/dialog.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './core/application-state';
import { ListEffects } from './core/effects/list.effect';
import { SearchService } from './services/search/search.service';
import { SearchEffects } from './core/effects/search.effect';
import { ServiceInterceptor } from './services/service.interceptor';
import { LogPipe } from './pipes/log/log.pipe';
import { ListDetailsComponent } from './list-details/list-details.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';


@NgModule({
  declarations: [
    AppComponent,
    FourOFourComponent,
    DashboardComponent,
    NewListComponent,
    LogPipe,
    ListDetailsComponent,
    MovieDetailsComponent
  ],
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      ListEffects,
      SearchEffects
    ]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    BrowserModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule,
    MatGridListModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  providers: [
    DialogService,
    SearchService,
    { provide: HTTP_INTERCEPTORS, useClass: ServiceInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    NewListComponent
  ]
})
export class AppModule { }
