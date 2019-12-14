import { PencarianComponent } from './../maps/pencarian/pencarian.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';



@Injectable({
  providedIn: 'root'
})

export class PencarianlayerService {

  constructor(
    public dialog: MatDialog
  ) { }

  
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Pencarian',
      article: 'the article'
    };
    const dialogRef = this.dialog.open(PencarianComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //console.log("Dialog closed")
      console.log(result);

      

    });
  }



}








