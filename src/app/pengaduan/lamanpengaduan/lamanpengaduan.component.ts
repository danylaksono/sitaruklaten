import { LocationPickerComponent } from './../location-picker/location-picker.component';
import { Component, OnInit } from '@angular/core';
import OlMap from 'ol/Map';
import XYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import OSM from 'ol/source/OSM';
import * as Control from 'ol/control';
import { transform, getTransform, get, fromLonLat, toLonLat } from 'ol/proj';
//import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import Overlay from 'ol/Overlay';

import { HttpClient } from '@angular/common/http';
import { WarningSnackbarService } from 'src/app/dialog/warning-snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material';






@Component({
  selector: 'app-lamanpengaduan',
  templateUrl: './lamanpengaduan.component.html',
  styleUrls: ['./lamanpengaduan.component.scss']
})
export class LamanpengaduanComponent implements OnInit {


  judul: String;
  keterangan: String;
  email: String;
  nama: String;
  lokasi: {
    lintang: '',
    bujur: ''
  };
  tanggal: Date;

  //SERVER_URL = "http://103.108.187.217:3000/api/laporans";
  SERVER_URL = "http://localhost:3000/api/laporans";
  form: FormGroup;

  map: OlMap;
  source: XYZ;
  layer: OlTileLayer;
  view: OlView;

  showMarker:Boolean = true;
  clickEventKey: any;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private warning: WarningSnackbarService,
    private dialog: MatDialog,
    
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      judul: '',
      nama: '',
      email: '',
      keterangan: '',
      lokasi: '',
      tanggal: new Date
    })



  }



  ngOnInit() {

  }

  onSubmit() {
    /*
    const formData = new FormData();
    formData.append("judul", this.form.get('judul').value);
    formData.append("nama", this.form.get('nama').value);
    formData.append("email", this.form.get('email').value);
    formData.append("keterangan", this.form.get('keterangan').value);
    formData.append("lokasi", this.form.get('tanggal').value);
    formData.append("lokasi", this.form.get('lokasi').value);
    */

    var dataToSend = {
      "judul": this.judul,
      "nama": this.nama,
      "email": this.email,
      "keterangan": this.keterangan,
      "lokasi": this.lokasi,
      "tanggal": this.tanggal
    };


    this.httpClient.post<any>(this.SERVER_URL, dataToSend).subscribe(
      (res) => {
        console.log(res)
        const snackBarRef = this.warning.open('Data berhasil dilaporkan!');
        setTimeout(() => {    //<<<---    using ()=> syntax
          this.router.navigateByUrl('/home');
        }, 3000);

      },
      (err) => console.log(err)
    );
  }
 

  
  pickLocation() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      id: 1,
      title: 'Pencarian',
      article: 'the article'
    };
    const dialogRef = this.dialog.open(LocationPickerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //console.log("Dialog closed")
      console.log('hasil lengkap', result.lintang, result.bujur);
      this.lokasi = {
        bujur : result.bujur,
        lintang : result.lintang
      };

      //if (result.bujur && result.lintang) {
      //  this.zoomToLatLng(result.Y, result.X);
      //} else if (result.xUTM && result.yUTM) {
      //  this.zoomToXY(result.xUTM, result.yUTM);
      //}


    });
  }






}
