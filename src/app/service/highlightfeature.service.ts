import { LayerattributeComponent } from './../dialog/layerattribute/layerattribute.component';
import { Injectable, ElementRef, ViewChild } from '@angular/core';
//import Popup from 'ol-popup';
import { Fill, Stroke, Style } from 'ol/style';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlGeoJSON from 'ol/format/GeoJSON';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { WarningSnackbarService } from './../dialog/warning-snackbar.service';
import { Overlay } from 'ol';
//import { MainqueryService } from './mainquery.service';


@Injectable({
  providedIn: 'root'
})

export class HighlightfeatureService {

  popup: any;
  VectorLayer: OlVectorLayer;
  overlay: Overlay;
  dialogRef;
  

  constructor(
    private warning: WarningSnackbarService,
    //private query: MainqueryService,
    public dialog: MatDialog
  ) { }

 
  checkFeature(features, coordinate, map) {
    //this.popup = new Popup();
    //map.addOverlay(this.popup);

    /*

    this.overlay = new Overlay({
      element: this.container.nativeElement,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    this.closer.nativeElement.onclick = function() {
      this.overlay.setPosition(undefined);
      this.closer.blur();
      return false;
    };

    map.addOverlay(this.overlay);

    this.content.nativeElement.innerHTML = '<p>You clicked here:</p><code>'+'the hash slinging' +  '</code>';
    */

        
    var attributeLayer = features.features[0].properties;
    //var ketBidang = features.features[1].properties;
    //console.log(ketBidang);
    //console.log(ketRDTR);
    //console.log(attributeLayer);
    this.highlightSelected(features, map);
    this.openModalShowAttribute(attributeLayer);

    /*
    if (features) {
      if (features.numberReturned <1) {
        //this.warning.open('Klik pada simbol Titik atau Bangunan');
      } else {       
        //this.openModalShowAttribute(attributeLayer);
        this.highlightSelected(features, map);
      }
    } */

  }; //check feature



  //======= clear selected highlight =======
  clearHighlight(map){
    if (this.VectorLayer) {
      map.removeLayer(this.VectorLayer);
    }
  }


  highlightSelected(feature, map) {
    if (this.VectorLayer) {
      map.removeLayer(this.VectorLayer);
    }
    var geom = feature.features[0];
    var format = new OlGeoJSON({
      dataProjection: 'EPSG:3857',
      featureProjection: 'EPSG:3857',
      geometryName: 'the_geom'
    });
    var vectorSource = new OlVectorSource({
      features: format.readFeatures(geom)
    });
    var style = new Style({
      fill: new Fill({
        color: 'yellow'
        

      }),
      stroke: new Stroke({
        color: 'red',
        width: 2
      })
    });
    this.VectorLayer = new OlVectorLayer({
      source: vectorSource,
      style: style,
      opacity: 0.7,
      renderMode: 'image',
      //@ts-ignore
      title: 'Zona Terpilih',
      name: 'Selected'
      //map: this.map
    });
    map.addLayer(this.VectorLayer);
    map.render();
  } // highlight selected feature

  

  openModalShowAttribute(attribute) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      disableClose : false,
      autoFocus : true,
      //height : '350px',
      width : '30vw',
      hasBackdrop: false      
    }
    dialogConfig.data = {
      id: 2,
      title: 'Keterangan RDTR dan Bidang',
      atribut: attribute,
      
      //article: 'Keluar dari Mode Administator?'

    };
    this.dialogRef = this.dialog.open(LayerattributeComponent, dialogConfig);
    //dialogRef.closeAll();
    this.dialogRef.afterClosed().subscribe(result => {
      if (result === 'A') {
        // handle A button close
        //console.log('A');
        //this.query.openModalCekIzin(rdtr, bidang);
      }
    
      if (result === 'B') {
        // handle B button close
        //console.log('B');
      }

      //if (result) {
        //console.log(result);
        
        
      //}
    });
  } //opendialog

}

/*
const closedA$ = dialogRef.afterClosed().pipe(filter(result => result === 'A'));
const closedB$ = dialogRef.afterClosed().pipe(filter(result => result === 'B'));

closedA$.subscribe( // handle A);
closedB$.subscribe( // handle B);
*/