import { Component, OnInit } from '@angular/core';
import { DialogService } from './services/dialog/dialog.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { NewListComponent } from './dialogs/new-list/new-list.component';
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from './core/application-state';
import { Store } from '@ngrx/store';
import * as ListActions from './core/actions/list.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public newListDialogReference: MatDialogRef<NewListComponent>;

  constructor(
    private dialogService: DialogService,
    private matDialog: MatDialog,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {

  }

  openCreateAMovieListDialog() {
    this.newListDialogReference = this.matDialog.open(NewListComponent, this.dialogService.config);
    this.newListDialogReference.afterClosed().subscribe(response => {

    });
  }
}
