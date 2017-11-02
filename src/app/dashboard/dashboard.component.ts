import { Component, OnInit } from '@angular/core';
import { DialogService } from '../services/dialog/dialog.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { NewListComponent } from '../dialogs/new-list/new-list.component';
import { Observable } from 'rxjs/Observable';
import { List } from '../core/models/list';
import * as fromRoot from '../core/application-state';
import { Store } from '@ngrx/store';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public newListDialogReference: MatDialogRef<NewListComponent>;
  public movieList$: Observable<List[]>;

  constructor(
    public dialogService: DialogService,
    public matDialog: MatDialog,
    public store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.movieList$ = this.store.select(fromRoot.getMovieList);
  }

  openCreateAMovieListDialog() {
    this.newListDialogReference = this.matDialog.open(NewListComponent, this.dialogService.config);
    this.newListDialogReference.afterClosed().subscribe(response => {

    });
  }
}
