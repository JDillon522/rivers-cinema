import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatCardModule, MatToolbarModule, MatMenuModule, MatIconModule, MatButtonModule, MatDialogModule, MatGridListModule,
  MatTooltipModule
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

@NgModule({
  declarations: [
    AppComponent,
    FourOFourComponent,
    DashboardComponent,
    NewListComponent
  ],
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      ListEffects
    ]),
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
    MatTooltipModule
  ],
  providers: [
    DialogService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    NewListComponent
  ]
})
export class AppModule { }
