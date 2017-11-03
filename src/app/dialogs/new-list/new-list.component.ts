import { Component, OnInit, ViewChild } from '@angular/core';
import * as fromRoot from '../../core/application-state';
import { Store } from '@ngrx/store';
import * as ListActions from '../../core/actions/list.actions';
import * as SearchActions from '../../core/actions/search.action';
import { Observable } from 'rxjs/Rx';
import { MovieSearch, Movie } from '../../core/models/movie';
import * as _ from 'lodash';
import { MatSelectionList, MatDialogRef } from '@angular/material';
import { List } from '../../core/models/list';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  public searchResults$: Observable<MovieSearch[]>;
  public searchError$: Observable<string>;
  public movieSelection$: Observable<MovieSearch[]>;

  public loading: boolean = false;

  @ViewChild(MatSelectionList) selectedMovies: MatSelectionList;

  private _listName: string = '';
  private _searchInput: string = '';
  private _keyedSearch: { [key: string]: Movie | MovieSearch };

  get searchInput(): string {
    return this._searchInput;
  }

  set searchInput(term) {
    this.store.dispatch(new SearchActions.SubmitSearch(term));
    this._searchInput = term;
  }

  get listName(): string {
    return this._listName;
  }

  set listName(name) {
    this._listName = _.replace(name, /\s/, '-');
  }

  constructor(
    private store: Store<fromRoot.State>,
    private dialogRef: MatDialogRef<NewListComponent>
  ) { }

  ngOnInit() {
    this.searchResults$ = this.store.select(fromRoot.getSearchRestuls);
    this.searchError$ = this.store.select(fromRoot.getSearchError);
    this.movieSelection$ = this.store.select(fromRoot.getSelection);

    // this.selectedMovies.selectedOptions.onChange.subscribe(list => {
    //   if (list.added.length) {
    //     this.store.dispatch(new SearchActions.AddToSelection(list.added[0].value));
    //   }
    //   if (list.removed.length) {
    //     this.store.dispatch(new SearchActions.RemoveFromSelection(list.removed[0].value));
    //   }
    // });
  }

  createList() {
    const list: List = {
      name: _.trimEnd(this.listName, '-_'),
      movies: [] // TBD
    };

    this.store.dispatch(new ListActions.CreateList(list));
    this.loading = true;
    this.dialogRef.close();
    this.store.dispatch(new SearchActions.ClearSearch());
  }

}
