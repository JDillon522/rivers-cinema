import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../core/application-state';
import { Store } from '@ngrx/store';
import * as ListActions from '../../core/actions/list.actions';
import * as SearchActions from '../../core/actions/search.action';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  private _searchInput: string = '';

  get searchInput(): string {
    return this._searchInput;
  }

  set searchInput(term) {
    console.log('INPUT', term)
    this.store.dispatch(new SearchActions.SubmitSearch(term));
    this._searchInput = term;
  }

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {

  }

  createList() {
    console.log('create baby');
  }
}
