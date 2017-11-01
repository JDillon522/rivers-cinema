import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatCardModule, MatToolbarModule, MatMenuModule, MatIconModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { AppComponent } from './app.component';
import { FourOFourComponent } from './four-o-four/four-o-four.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewListComponent } from './dialogs/new-list/new-list.component';
import { DialogService } from './services/dialog/dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    FourOFourComponent,
    DashboardComponent,
    NewListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    BrowserModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule
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
