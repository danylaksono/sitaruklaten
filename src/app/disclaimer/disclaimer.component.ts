import { MaterialModule } from './../material/material.module';
import { Component, OnInit, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

import * as introJs from 'intro.js/intro.js';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss']
})


@NgModule({
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  imports: [
    MaterialModule
  ]
})


export class DisclaimerComponent implements OnInit {


  isSetuju: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DisclaimerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cookie: CookieService
  ) { }

  ngOnInit() {
  }

  
  closeDialog() { 
    introJs().goToStepNumber(8).start();
    var disclaim = this.cookie.get('disclaimer');
    if(!disclaim) {
      this.cookie.set('disclaimer', 'setuju', 0.05);
      
    }
   
    //console.log(this.geoOrUTM);
    this.dialogRef.close();
  } //close and send data



}
