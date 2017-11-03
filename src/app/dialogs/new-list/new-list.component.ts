import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import * as fromRoot from '../../core/application-state';
import { Store } from '@ngrx/store';
import * as ListActions from '../../core/actions/list.actions';
import * as SearchActions from '../../core/actions/search.action';
import { Observable } from 'rxjs/Rx';
import { MovieSearch, Movie } from '../../core/models/movie';
import * as _ from 'lodash';
import { MatSelectionList, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { List } from '../../core/models/list';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  public searchError$: Observable<string>;
  public loading: boolean = false;
  public editing: boolean = false;

  private _listName: string = '';
  private _searchInput: string = '';
  private _keyedSearch: { [key: string]: Movie | MovieSearch };
  private _searchResults: MovieSearch[] = [];
  private _selectedMovies: MovieSearch[] = [];

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

  get searchResults(): MovieSearch[] {
    return this._searchResults;
  }

  set searchResults(results) {
    this._searchResults = results;
  }

  get selectedMovies(): MovieSearch[] {
    return this._selectedMovies;
  }

  set selectedMovies(movies) {
    this._selectedMovies = movies;
  }

  constructor(
    private store: Store<fromRoot.State>,
    private dialogRef: MatDialogRef<NewListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      editing: boolean,
      listName: string,
      movies: Movie[]
    }
  ) { }

  ngOnInit() {
    if (this.data && this.data.editing) {
      this.editing = true;
      this.listName = this.data.listName;
      this.store.dispatch(new SearchActions.PrepEditList(this.data));
    }

    this.store.select(fromRoot.getSearchRestuls).subscribe(results => {
      this.searchResults = results;
    });
    this.searchError$ = this.store.select(fromRoot.getSearchError);
    this.store.select(fromRoot.getSelection).subscribe(results => {
      this.selectedMovies = results;
    });
  }

  createList() {
    const list = {
      name: _.trimEnd(this.listName, '-_'),
      movies: this.selectedMovies
    };

    this.store.dispatch(new ListActions.CreateList({list: list, editing: this.editing, changedName: _.get(this.data, 'listName')}));
    this.loading = true;
    this.dialogRef.close();
  }

  movieSelected(event, movie) {
      if (event.checked) {
        this.store.dispatch(new SearchActions.SearchMovie(movie.imdbID));
        this.store.dispatch(new SearchActions.AddToSelection(movie));
      } else {
        this.store.dispatch(new SearchActions.RemoveFromSelection(movie));
      }
  }

}
