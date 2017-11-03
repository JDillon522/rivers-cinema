import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../core/application-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { List } from '../core/models/list';
import { Router } from '@angular/router';
import * as ListActions from '../core/actions/list.actions';
import { MatDialogRef, MatDialog } from '@angular/material';
import { NewListComponent } from '../dialogs/new-list/new-list.component';
import { DialogService } from '../services/dialog/dialog.service';
import { Movie } from '../core/models/movie';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {
  public selectedList: List;
  public selectedMovie;
  public editListDialogReference: MatDialogRef<NewListComponent>;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    public dialogService: DialogService,
    public matDialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.store.dispatch(new ListActions.DisselectMovie());

    this.store.select(fromRoot.getSelectedList).subscribe(list => {
      if (list) {
        this.selectedList = list;
      }
    });

    this.store.select(fromRoot.getSelectedMovie).subscribe(movie => {
      this.selectedMovie = movie ? true : false;
    });
  }

  getMoviePoster(poster): string {
    return poster !== 'N/A' ? poster : '../../assets/img/posterTemplate.jpg';
  }

  navToMovieDetails(movie) {
    this.store.dispatch(new ListActions.SelectMovie(movie));
  }

  clearSelectedMovie() {
    this.store.dispatch(new ListActions.DisselectMovie());
  }

  openAddMovieDialog() {
    const config = this.dialogService.config;
    config.data = {
      editing: true,
      listName: this.selectedList.name,
      movies: this.selectedList.movies
    };

    this.editListDialogReference = this.matDialog.open(NewListComponent, config);
    this.editListDialogReference.afterClosed().subscribe(response => {

    });
  }

  deleteMovie(movie: Movie) {
    this.store.dispatch(new ListActions.DeleteMovie({id: movie.imdbID, list: this.selectedList.name}));
  }
}
