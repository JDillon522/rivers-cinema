import { Component, OnInit } from '@angular/core';
import { DialogService } from '../services/dialog/dialog.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { NewListComponent } from '../dialogs/new-list/new-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public newListDialogReference: MatDialogRef<NewListComponent>;

  constructor(
    public dialogService: DialogService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openCreateAMovieListDialog() {
    this.newListDialogReference = this.matDialog.open(NewListComponent, this.dialogService.config);
    this.newListDialogReference.afterClosed().subscribe(response => {

    });
  }
}
