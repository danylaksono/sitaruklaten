import { Injectable } from '@angular/core';
import LayerGroup from 'ol/layer/Group';
import LayerTile from 'ol/layer/Tile';
import SourceWMS from 'ol/source/TileWMS';


@Injectable({
  providedIn: 'root'
})


export class OverlaylayerService {


  linkGeoserver: string = 'http://geoportal.ppids.ft.ugm.ac.id/geoserver/klaten/wms';
  //linkGeoserver: string = 'https://geoserver.jogjakota.go.id/geoserver/sitaru/wms';

  

  public overlay =  new LayerGroup({
    //@ts-ignore
    title: 'Layer Peta',
    openInLayerSwitcher: true,
    layers: [
      new LayerTile({
        //@ts-ignore
        title: 'Batas Desa',       
        visible: false,
        opacity: 0.2,
        preload: Infinity,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          params: {'LAYERS': 'klaten:ADMIN_DESA_adj_poly', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
          
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Pola Ruang',       
        visible: true,
        opacity: 0.8,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          params: {'LAYERS': 'klaten:pola_ruang_klaten_new', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Jaringan Jalan',       
        visible: true,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          //params: {'LAYERS': 'sitaru:jalan_gsb', 'TILED': true},
          params: {'LAYERS': '	klaten:JALAN_EKSISTING_FINAL', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Pusat Kegiatan',       
        visible: true,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          //params: {'LAYERS': 'sitaru:jalan_gsb', 'TILED': true},
          params: {'LAYERS': 'klaten:sistem_pusat_kegiatan', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Sungai',       
        visible: true,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          //params: {'LAYERS': 'sitaru:jalan_gsb', 'TILED': true},
          params: {'LAYERS': 'klaten:SUNGAI', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      })
    ]
  });


  overlayServgices(){
    return this.overlay;
  }

  constructor() { }
}
