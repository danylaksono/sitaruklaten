import { Injectable } from '@angular/core';
import LayerGroup from 'ol/layer/Group';
import LayerTile from 'ol/layer/Tile';
import SourceWMS from 'ol/source/TileWMS';


@Injectable({
  providedIn: 'root'
})


export class OverlaylayerService {


  //linkGeoserver: string = 'http://geoportal.ppids.ft.ugm.ac.id/geoserver/klaten/wms';
  //linkGeoserver: string = 'https://geoserver.jogjakota.go.id/geoserver/sitaru/wms';
  linkGeoserver: string = 'http://103.108.187.217/geoserver/sitaru/wms'

  

  public overlay =  new LayerGroup({
    //@ts-ignore
    title: 'Layer Peta',
    openInLayerSwitcher: true,
    layers: [     
      
      new LayerTile({
        //@ts-ignore
        title: 'Batas Desa',
        maxResolution: 100,       
        visible: true,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          params: {'LAYERS': 'sitaru:batas_desa2', 'TILED': true},
          //params: {'LAYERS': 'klaten:klaten_rawa_poly', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      
      new LayerTile({
        //@ts-ignore
        title: 'Jalan Kereta Api',
        maxResolution: 5,       
        visible: true,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          params: {'LAYERS': 'sitaru:jalan_ka', 'TILED': true},
          //params: {'LAYERS': 'klaten:jaringan_energi', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),

      new LayerTile({
        //@ts-ignore
        title: 'Jaringan Energi',
        maxResolution: 5,       
        visible: true,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          params: {'LAYERS': 'sitaru:jaringan_energi', 'TILED': true},
          //params: {'LAYERS': 'klaten:Ibukota_desalurah', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Jaringan Jalan',
        maxResolution: 10,       
        visible: true,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          params: {'LAYERS': 'sitaru:jaringan_jalan', 'TILED': true},
          //params: {'LAYERS': 'klaten:Ibukota_desalurah', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Kawasan Rawan Bencana',  
        maxResolution: 10,            
        visible: true,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          params: {'LAYERS': 'sitaru:kawasan_rawan_bencana', 'TILED': true},
          //params: {'LAYERS': 'klaten:Ibukota_desalurah', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Kawasan Strategis Prambanan',
        maxResolution: 7,       
        visible: true,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          params: {'LAYERS': '	sitaru:kawasan_strategis_prambanan', 'TILED': true},
          //params: {'LAYERS': 'klaten:Ibukota_desalurah', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Persampahan',
        maxResolution: 5,       
        visible: true,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          params: {'LAYERS': 'sitaru:persampahan', 'TILED': true},
          //params: {'LAYERS': 'klaten:Ibukota_desalurah', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Pola Ruang',
        maxResolution: 10,       
        visible: true,
        opacity: 0.5,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          params: {'LAYERS': 'sitaru:pola_ruang', 'TILED': true},
          //params: {'LAYERS': 'klaten:Ibukota_desalurah', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Pusat Pemerintahan',     
        maxResolution: 5,       
        visible: true,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          params: {'LAYERS': 'sitaru:pusat_pemerintahan', 'TILED': true},
          //params: {'LAYERS': 'klaten:Ibukota_desalurah', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Rawa Jombor',
        maxResolution: 5,       
        visible: true,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          params: {'LAYERS': 'sitaru:rawa_jombor', 'TILED': true},
          //params: {'LAYERS': 'klaten:Ibukota_desalurah', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Sistem Pusat Kegiatan',
        maxResolution: 5,       
        visible: true,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          params: {'LAYERS': 'sitaru:sistem_pusat_kegiatan', 'TILED': true},
          //params: {'LAYERS': 'klaten:Ibukota_desalurah', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Sungai',
        maxResolution: 10,       
        visible: true,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          params: {'LAYERS': 'sitaru:sungai', 'TILED': true},
          //params: {'LAYERS': 'klaten:Ibukota_desalurah', 'TILED': true},
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
