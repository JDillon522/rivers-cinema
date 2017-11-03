import { Component, OnInit } from '@angular/core';
import { DialogService } from '../services/dialog/dialog.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { NewListComponent } from '../dialogs/new-list/new-list.component';
import { Observable } from 'rxjs/Observable';
import { List } from '../core/models/list';
import * as fromRoot from '../core/application-state';
import * as ListActions from '../core/actions/list.actions';
import { Store } from '@ngrx/store';
import * as SearchActions from '../core/actions/search.action';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public newListDialogReference: MatDialogRef<NewListComponent>;
  public editListDialogReference: MatDialogRef<NewListComponent>;
  public movieLists$: Observable<List[]>;

  constructor(
    public dialogService: DialogService,
    public matDialog: MatDialog,
    public store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.movieLists$ = this.store.select(fromRoot.getMovieLists);
  }

  openCreateAMovieListDialog() {
    this.newListDialogReference = this.matDialog.open(NewListComponent, this.dialogService.config);
    this.newListDialogReference.afterClosed().subscribe(response => {
      this.store.dispatch(new SearchActions.ClearSearch());
    });
  }

  openEditAMovieListDialog(list) {
    const config = _.clone(this.dialogService.config);
    config.data = {
      editing: true,
      listName: list.name,
      movies: list.movies
    };

    this.editListDialogReference = this.matDialog.open(NewListComponent, config);
    this.editListDialogReference.afterClosed().subscribe(response => {
      this.store.dispatch(new SearchActions.ClearSearch());
    });
  }

  deleteList(list) {
    this.store.dispatch(new ListActions.DeleteList(list));
  }

  navToListDetails(list: List) {
    this.store.dispatch(new ListActions.SelectList(list.name));
  }

  getMoviePoster(poster): string {
    return poster !== 'N/A' ? poster : '../../assets/img/posterTemplate.jpg';
  }
}
