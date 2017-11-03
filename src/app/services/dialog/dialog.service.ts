import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material';

@Injectable()
export class DialogService {

  constructor() { }

  public config: MatDialogConfig = {
    panelClass: ['rc-dialog'],
    width: '500px',
    height: '600px'
  };

}
