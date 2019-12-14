import { Component, OnInit, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
//import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs';
import {MatTabChangeEvent, VERSION} from '@angular/material';

@Component({
  selector: 'app-pencarian',
  templateUrl: './pencarian.component.html',
  styleUrls: ['./pencarian.component.scss']
})

@NgModule({
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  imports: [
    MaterialModule
  ]
})

export class PencarianComponent implements OnInit {

  version = VERSION;
  modalTitle:string = '';
  geoOrUTM : string = 'Geo';
  lintang: Number = null;
  bujur: Number = null;
  xUTM: Number = null;
  yUTM: Number = null;
  
  constructor(
    public dialogRef: MatDialogRef<PencarianComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.data = data;
    this.modalTitle = data.title;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    //console.log('tabChangeEvent => ', tabChangeEvent);
    //console.log('index => ', tabChangeEvent.index);
    //console.log('index => ', tabChangeEvent.index);
    if(tabChangeEvent.index==1){
      //console.log('UTM');
      //this.geoOrUTM = 'UTM';
      this.lintang = null;
      this.bujur = null;
    } else {
      //console.log('LatLong');
      //this.geoOrUTM = 'Geo';
      this.xUTM = null;
      this.yUTM = null;
    }
  }  

  
  closeDialog(lintang, bujur, xUTM, yUTM) {
    
    //console.log(this.geoOrUTM);
    let koordinat = 
    {
      lintang : lintang,
      bujur : bujur,
      xUTM: xUTM,
      yUTM: yUTM
    };

    this.dialogRef.close(koordinat);
  }

  ngOnInit() {
  }

}
