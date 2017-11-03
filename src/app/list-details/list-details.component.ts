import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../core/application-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { List } from '../core/models/list';
import { Router } from '@angular/router';
import * as ListActions from '../core/actions/list.actions';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {
  public selectedList: List;
  public selectedMovie;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
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

  navToMovieDetails(movie) {
    this.store.dispatch(new ListActions.SelectMovie(movie));
  }

  clearSelectedMovie() {
    this.store.dispatch(new ListActions.DisselectMovie());
  }

  openAddMovieDialog() {

  }
}
