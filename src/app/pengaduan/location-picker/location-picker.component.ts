import { Component, OnInit, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


import OlMap from 'ol/Map';
import XYZ from 'ol/source/XYZ';
import * as Extent from 'ol/Extent';
import OlTileLayer from 'ol/layer/Tile';
import OlVectorLayer from 'ol/layer/Vector';
import OlView from 'ol/View';
import SearchNominatim from 'ol-ext/control/SearchNominatim';
import OSM from 'ol/source/OSM';
import * as Control from 'ol/control';
import { transform, getTransform, get, fromLonLat, toLonLat } from 'ol/proj';
//import { MatDatepickerModule } from '@angular/material/datepicker';
import OlGeoJSON from 'ol/format/GeoJSON';
import { Fill, Circle, Stroke, Style } from 'ol/style';
import OlVectorSource from 'ol/source/Vector';
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

  sLayer: OlVectorLayer;

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

  this.map.on('click', this.getInfoCallback);


    // Search control
    let search = new SearchNominatim(
      {	//target: $(".options").get(0),
        polygon: true,
        reverse: true,
        position: true	// Search, with priority to geo position
      });



    this.map.addControl(search);
    // Move to the position on selection in the control list
    search.on('select', (e) => {

      if (this.sLayer) {
        this.map.removeLayer(this.sLayer);
      }

      // Current selection
      this.sLayer = new OlVectorLayer({
        //@ts-ignore
        title: 'Hasil Pencarian',
        source: new OlVectorSource(),
        style: new Style({
          image: new Circle({
            radius: 5,
            stroke: new Stroke({
              color: 'rgb(255,165,0)',
              width: 3
            }),
            fill: new Fill({
              color: 'rgba(255,165,0,.3)'
            })
          }),
          stroke: new Stroke({
            color: 'rgb(255,165,0)',
            width: 3
          }),
          fill: new Fill({
            color: 'rgba(255,165,0,.3)'
          })
        })
      });
      this.map.addLayer(this.sLayer);
      this.map.render();
      //console.log(e);
      this.sLayer.getSource().clear();
      // Check if we get a geojson to describe the search
      if (e.search.geojson) {
        var format = new OlGeoJSON();
        var f = format.readFeature(e.search.geojson, { dataProjection: "EPSG:4326", featureProjection: this.map.getView().getProjection() });
        this.sLayer.getSource().addFeature(f);
        var view = this.map.getView();
        var resolution = view.getResolutionForExtent(f.getGeometry().getExtent(), this.map.getSize());
        var zoom = view.getZoomForResolution(resolution);
        var center = Extent.getCenter(f.getGeometry().getExtent());
        // redraw before zoom
        setTimeout(function () {
          view.animate({
            center: center,
            zoom: Math.min(zoom, 16)
          });
        }, 100);
      }
      else {
        this.map.getView().animate({
          center: e.coordinate,
          zoom: Math.max(this.map.getView().getZoom(), 16)
        });
      }
    });






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
