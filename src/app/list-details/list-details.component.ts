import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../core/application-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { List } from '../core/models/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {
  public selectedList: List;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
  ) {
    this.store.select(fromRoot.getSelectedList).subscribe(list => {
      if (list) {
        this.selectedList = list;
      } else {
        this.router.navigate(['dashboard']);
      }
    });
  }

  ngOnInit() {
  }

}
