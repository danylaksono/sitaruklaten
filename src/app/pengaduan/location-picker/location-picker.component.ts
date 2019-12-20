import { Component, OnInit, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


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


@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss']
})


@NgModule({
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  imports: [
    MaterialModule
  ]
})

export class LocationPickerComponent implements OnInit {
  
  map: OlMap;
  source: XYZ;
  layer: OlTileLayer;
  view: OlView;
  showMarker: boolean;
  mark: Overlay;

  lintang: Number;
  bujur: Number;

  constructor(
    public dialogRef: MatDialogRef<LocationPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    
    this.view = new OlView({
      center: fromLonLat([110.6164835, -7.6929626]),
      zoom: 15
      //projection: 'EPSG:4326'
    });

    // --map definitions --
    this.map = new OlMap({
      target: 'map2',
      controls: Control.defaults({
        rotate: false,
        zoom: false
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

  this.map.on('click', this.getInfoCallback);

  } //onInint

  
  getInfoCallback = (evt) => {
    var lonlat = toLonLat(evt.coordinate); 
    this.lintang = lonlat[1];
    this.bujur = lonlat[0];
    this.createMarkerPencarian(lonlat[1], lonlat[0]);

  };  //==onclick

  
  
  closeDialog(lintang, bujur) { 
    //console.log(this.geoOrUTM);
    let koordinat = 
    {
      lintang : lintang,
      bujur : bujur
    };

    this.dialogRef.close(koordinat);
  } //close and send data


  
  createMarkerPencarian(lat, long) {
    this.showMarker = true;
    var pos = fromLonLat([parseFloat(long), parseFloat(lat)]);
    this.mark = new Overlay({
      position: pos,
      element: document.getElementById('location-marker')
    });
    this.map.addOverlay(this.mark);
  }

}
