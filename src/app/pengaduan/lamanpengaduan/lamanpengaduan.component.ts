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
  lokasi: any;
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

    this.view = new OlView({
      center: fromLonLat([110.6164835, -7.6929626]),
      zoom: 13
      //projection: 'EPSG:4326'
    });

    // --map definitions --
    this.map = new OlMap({
      target: 'map2',
      controls: Control.defaults({
        rotate: false,
        zoom: true
      }),
      layers: [
        new OlTileLayer({
          source:
          new XYZ({
            //@ts-ignore
            url: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}',
            //https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection/
            //@ts-ignore
            transparent: true,
            //@ts-ignore
            wrapx: false
          })
        })
      ],
      view: this.view
    });
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

  pickLocation(){
    this.clickEventKey = this.map.on('click', this.getInfoCallback);
  }

  getInfoCallback = (evt) => {
       
    var lonlat = toLonLat(evt.coordinate); 
    //this.createMarkerPencarian(lonlat[1], lonlat[0]);
     
  };  //==onclick


  createMarkerPencarian(lat, long) {
    this.showMarker = true;
    var pos = fromLonLat([parseFloat(long), parseFloat(lat)]);
    var mark = new Overlay({
      position: pos,
      element: document.getElementById('location-marker')
    });
    this.map.addOverlay(mark);
  }






}
