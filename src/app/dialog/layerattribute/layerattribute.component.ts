import { Component, OnInit, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs';


export interface dataPolaBidang {
  atribut: string;
  keterangan: any;
}


@Component({
  selector: 'app-layerattribute',
  templateUrl: './layerattribute.component.html',
  styleUrls: ['./layerattribute.component.scss']
})



@NgModule({
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  imports: [
    MaterialModule
  ]
})


export class LayerattributeComponent implements OnInit {

  // modal dialog data
  modalTitle: string;
  atribut: string;
  image: string;
  isLoggedIn : Observable<boolean>;
  displayedColumns: string[] = ['position', 'name'];
  dataSource: dataPolaBidang[];



  constructor(
    public dialogRef: MatDialogRef<LayerattributeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public auth: AuthService
  ) {
    const ELEMENT_DATA: dataPolaBidang[] = [
      {atribut: 'Desa', keterangan: data.atribut.DESA},
      {atribut: 'Kecamatan', keterangan: data.atribut.KECAMATAN},
      
      {atribut: 'Rencana', keterangan: data.atribut.RENCANA},
      {atribut: 'Luas (ha)', keterangan: data.atribut.HECTARES.toFixed(2) },
    ];

    this.modalTitle = data.title;
    this.atribut = data.atribut.EXISTING;
    
    this.isLoggedIn = auth.isLoggedIn();
    this.dataSource =  ELEMENT_DATA;

    //console.log(data.atribut);
        
  }


  closeA() {
    this.closeDialog('A')
  }

  closeB() {
    this.closeDialog('B');
  }

  closeDialog(button: 'A' | 'B') {
    this.dialogRef.close(button);
  }



  //closeDialog(){
  //this.dialogRef.close();
  //console.log('buy');    
  //this.onTriggered.emit(true);
  // }

  ngOnInit() {
    

  }

}
