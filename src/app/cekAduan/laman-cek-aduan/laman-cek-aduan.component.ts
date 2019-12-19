import { DataLaporanService } from './../../service/data-laporan.service';
import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
//import { map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatTableDataSource, MatPaginator, MatPaginatorModule, MatSort } from '@angular/material';
import { MaterialModule } from 'src/app/material/material.module';


import OlMap from 'ol/Map';
import XYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import OSM from 'ol/source/OSM';
import * as Control from 'ol/control';
import { transform, getTransform, get, fromLonLat, toLonLat } from 'ol/proj';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import Overlay from 'ol/Overlay';

export interface laporan {
  judul: String;
  nama: String;
  email: String;
  keterangan: String;
  lokasi: any;
  tanggal: Date
  id: String;
}


@NgModule({
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  imports: [
    MaterialModule,
    MatPaginatorModule,
    MatSort
  ]
})

@Component({
  selector: 'app-laman-cek-aduan',
  templateUrl: './laman-cek-aduan.component.html',
  styleUrls: ['./laman-cek-aduan.component.scss']
})


export class LamanCekAduanComponent implements OnInit {

  map: OlMap;
  source: XYZ;
  layer: OlTileLayer;
  view: OlView;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  listOfReport: {};
  laporan: laporan[];
  datasource;
  selectedRow: Number;
  selectedData = {
    judul: "",
    nama: '',
    email: '',
    keterangan: '',
    lokasi: '',
    tanggal: '',
    id: ''

  }; 

  displayedColumns: string[] =
    [
      'tanggal',
      'judul',
      'nama',

      //'keterangan'
    ];

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private datalaporan: DataLaporanService,
  ) { }




  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  print(data, index){
    //console.log(data, index);
    this.selectedData = data;
    //this.titel = this.selectedData.judul;
    this.selectedRow = index;

  }


  ngOnInit() {
//    this.datasource.sort = this.sort;
    this.datalaporan.getLaporan()
      .subscribe(
        (res: laporan[]) => {
          this.listOfReport = res;
          this.datasource = new MatTableDataSource(res);
          this.datasource.paginator = this.paginator;
          this.datasource.sort = this.sort;
          console.log(this.listOfReport);
        }
      );

      this.view = new OlView({
        center: fromLonLat([110.6164835, -7.6929626]),
        zoom: 13
        //projection: 'EPSG:4326'
      });
  
      // --map definitions --
      this.map = new OlMap({
        target: 'map3',
        controls: Control.defaults({
          rotate: false,
          zoom: true
        }),
        layers: [
          new OlTileLayer({
            source: new OSM()
          })
        ],
        view: this.view
      });
    
    


    //console.log(this.cookie.get('currentUser'));
    //var token = this.cookie.get('currentUser');
    //let params = new HttpParams().set('access_token', token);
    //var params2 = params.toString();
    //this.http.get("http://103.108.187.217:3000/api/laporans", { params })
    //this.http.get("http://localhost:3000/api/laporans", { params })
    //  .subscribe((res) => {
    //    console.log(res);
    //    this.listOfReport = res;

    //  })
    //.pipe(
    //  tap(data => {
    //    console.log(data);
    //  })
    //)
  }

}
