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
import OlFeature from 'ol/Feature';
import Point from 'ol/geom/Point';
import OSM from 'ol/source/OSM';
import { Icon, Style } from 'ol/style';
import * as Control from 'ol/control';
import { transform, getTransform, get, fromLonLat, toLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
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
  mark: Overlay;
  showMarker: boolean;

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

  print(data, index) {
    console.log(data.lokasi);
    var bujur = data.lokasi.bujur;
    var lintang = data.lokasi.lintang;
    this.selectedData = data;
    //this.titel = this.selectedData.judul;
    this.selectedRow = index;
    this.zoomToLatLng(lintang, bujur);

  }

  zoomToLatLng(lat, long) {
    //this.map.getView().setCenter(transform([long, lat],'EPSG:4326','EPSG:3857'));
    console.log('lat', lat);
    console.log('long', long);
    this.map.getView().setCenter(fromLonLat([Number(long), Number(lat)]));
    this.map.getView().setZoom(18);
    this.createMarkerPencarian(lat, long);
  }


  createMarkerPencarian(lat, long) {

    var marker = [];
    this.showMarker = true;
    var pos = fromLonLat([parseFloat(long), parseFloat(lat)]);

    var iconFeature = new OlFeature({
      geometry: new Point(transform([long, lat], 'EPSG:4326', 'EPSG:3857'))
    });



    var iconStyle = new Style({
      image: new Icon(({
        anchor: [0.5, 1],
        src: "http://cdn.mapmarker.io/api/v1/pin?text=L&size=80&hoffset=1",
        crossOrigin: 'anonymous',
      }))
    });

    iconFeature.setStyle(iconStyle);
    marker.push(iconFeature);


    var vectorSource = new VectorSource({
      features: marker
    });

    var vectorLayer = new VectorLayer({
      source: vectorSource
    });
    
    this.map.addLayer(vectorLayer);


    this.mark = new Overlay({
      position: pos,
      element: document.getElementById('location-marker')
    });
    //this.map.addOverlay(this.mark);
  }


  ngOnInit() {
    //    this.datasource.sort = this.sort;
    this.datalaporan.getLaporan()
      .subscribe(
        (res: laporan[]) => {
          this.listOfReport = res;
          var hasill = res;
          this.datasource = new MatTableDataSource(res);
          this.datasource.paginator = this.paginator;
          this.datasource.sort = this.sort;
          //console.log(this.listOfReport);



          //console.log(features);




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


/*


          var features = [];


          Object.keys(hasill).forEach(function (key) {
            if (hasill[key].lokasi) {
              var lokasi = hasill[key].lokasi;
              console.table(lokasi);
              var longitude = lokasi.bujur;
              var latitude = lokasi.lintang;


              features.push(iconFeature);
            }

            //var longitude = this.listOfReport[lokasi];
            //var latitude = item.lat;

          }
          );

          */