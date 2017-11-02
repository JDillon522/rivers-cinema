import { Component, OnInit } from '@angular/core';
import { DialogService } from './services/dialog/dialog.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { NewListComponent } from './dialogs/new-list/new-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

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
