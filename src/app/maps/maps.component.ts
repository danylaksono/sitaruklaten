//Angular Core
import {
  Component,
  OnInit,
  NgModule,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Observable } from "rxjs";

//OpenLayers
import { register } from 'ol/proj/proj4'
import OlMap from 'ol/Map';
import { unByKey } from 'ol/Observable';
import { Draw, Modify, Snap } from 'ol/interaction';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import * as Extent from 'ol/Extent';
import Overlay from 'ol/Overlay';
import OlVectorLayer from 'ol/layer/Vector';
import TileWMS from 'ol/source/TileWMS';
import * as Control from 'ol/control';
import { Sidebar } from 'ol/control.js';
import SearchNominatim from 'ol-ext/control/SearchNominatim';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import { transform, getTransform, get, fromLonLat } from 'ol/proj';
import proj4 from 'proj4';
import OlGeoJSON from 'ol/format/GeoJSON';
import { Fill, Circle, Stroke, Style } from 'ol/style';
import OlVectorSource from 'ol/source/Vector';
import { SmoothScrollModule } from 'ngx-scrollbar/smooth-scroll';
import { applyTransform } from 'ol/extent';


//components & services
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CekizinComponent } from './../dialog/cekizin/cekizin.component';
import { BasemaplayerService } from '../service/basemaplayer.service';
import { OverlaylayerService } from './../service/overlaylayer.service';
import { CheckattributeService } from './../service/checkattribute.service';
import { DataitbxService } from './../service/dataitbx.service';
import { DaftarkegiatanService } from '../service/daftarkegiatan.service';
import { WarningSnackbarService } from './../dialog/warning-snackbar.service';
import { HighlightfeatureService } from '../service/highlightfeature.service'
import { CookieService } from 'ngx-cookie-service';
import { PencarianlayerService } from './../service/pencarianlayer.service';
import { AuthService } from './../service/auth.service';
import { PencarianComponent } from './../maps/pencarian/pencarian.component';
import { zoom } from 'ol/interaction/Interaction';



@NgModule({
  imports: [
    SmoothScrollModule
  ]
})

@Component({
  selector: 'app-maps',
  //encapsulation: ViewEncapsulation.None,
  templateUrl: './maps.component.html',
  styleUrls: [
    //'./ol-ext.scss',
    './maps.component.scss'
    //'./ol.scss',

  ]
})


export class MapsComponent implements OnInit, AfterViewInit {

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  wmsSource: TileWMS;
  VectorLayer: OlVectorLayer;
  sLayer: OlVectorLayer;
  editLayer: OlVectorLayer;

  linkServer: string = 'http://103.108.187.217/geoserver/';
  linkWMS: string = this.linkServer + 'sitaru/wms';


  //isLoggedIn: Boolean = false;

  isLoggedIn: Observable<boolean>;
  editMode: Boolean = false;
  drawInteraction: any;
  snapInteraction: any;
  showMarker: Boolean = false;


  clickEventKey: any;
  basemap: any[];
  overlay: {};
  list: any[];
  clickedfeature: any[];


  @ViewChild('switcher', { static: false }) switcher: ElementRef;

  constructor(
    public basemaplayers: BasemaplayerService,
    private overlaylayers: OverlaylayerService,
    private checkattribute: CheckattributeService,
    private dataitbx: DataitbxService,
    private daftarkegiatan: DaftarkegiatanService,
    private dialog: MatDialog,
    private hightlight: HighlightfeatureService,
    private smoothScroll: SmoothScrollModule,
    private warning: WarningSnackbarService,
    private cookie: CookieService,
    private auth: AuthService,
    private cariLayer: PencarianlayerService

  ) {
    this.isLoggedIn = auth.isLoggedIn();
  } // constructor





  ngOnInit() {
    //getting itbx data
    //console.log(this.dataitbx.getITBX());
    this.daftarkegiatan.getKegiatan().subscribe(
      res => {
        this.list = res;
        //console.log(this.list);
      }
    );


    //getting gsb data
    //this.checkattribute.getJSONP();

    // for get featureinfo
    this.wmsSource = new TileWMS({
      url: this.linkWMS,
      params: {
        'LAYERS': '	sitaru:pola_ruang',
        //'FORMAT': 'image/png8',
        'TILED': true,
        'VERSION': '1.1.1',
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    });

    this.view = new OlView({
      center: fromLonLat([110.6164835, -7.6929626]),
      zoom: 15
      //projection: 'EPSG:4326'
    });

    // --map definitions --
    this.map = new OlMap({
      target: 'map',
      controls: Control.defaults({
        rotate: false,
        zoom: true
      }),
      layers: [
        this.basemaplayers.basemap,
        this.overlaylayers.overlay
      ],
      view: this.view
    });


    // map sidebar
    var sidebar = new Sidebar({ element: 'sidebar', position: 'right' });
    var scale = new Control.ScaleLine;
    this.map.addControl(sidebar);
    this.map.addControl(scale);


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






  } // oninint



  ngAfterViewInit() {

    var toc = this.switcher.nativeElement; // getting switcher DOM    
    //LayerSwitcher.renderPanel(this.map, toc); // should be located in ngAfterViewInit instead of onInit

    // Add a layer switcher outside the map
    var switcher = new LayerSwitcher(
      {
        target: toc,
        show_progress: true,
        extent: true

      });
    this.map.addControl(switcher);

    this.activateInfoMode();

  } // afterview init


  //=============================================================================================


  activateInfoMode() {
    this.clearSelected();
    this.editMode = false;
    //this.hideEditBar();
    if (this.drawInteraction) {
      this.map.removeInteraction(this.drawInteraction);
      this.map.removeInteraction(this.snapInteraction);
    }

    this.clickEventKey = this.map.on('click', this.getInfoCallback);
    this.warning.open('Mode Info Diaktifkan!');

  }

  activateEditMode() {
    this.clearSelected();
    this.editMode = true;
    unByKey(this.clickEventKey);
    this.addInteractions();
    this.warning.open('Mode Edit Diaktifkan!');
    //this.showEditBar();
  }

  addInteractions() {
    var source = new OlVectorSource();
    this.editLayer = new OlVectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: 'red',
          width: 5
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33'
          })
        })
      })
    });
    //var draw, snap; // global so we can remove them later
    this.drawInteraction = new Draw({
      source: source,
      //@ts-ignore
      type: 'Polygon'
    });
    this.map.addInteraction(this.drawInteraction);
    this.map.addLayer(this.editLayer);
    this.snapInteraction = new Snap({ source: source });
    this.map.addInteraction(this.snapInteraction);
  }



  getInfoCallback = (evt) => {
    // test call modal

    var viewResolution = /** @type {number} */ (this.view.getResolution());
    var url = this.wmsSource.getGetFeatureInfoUrl(
      evt.coordinate, viewResolution, this.view.getProjection(),//'EPSG:3857',
      {
        'INFO_FORMAT': 'application/json',
        'QUERY_LAYERS': 'sitaru:pola_ruang',
        'FEATURE_COUNT': 1
      });

    // getting GetFeatureInfo data
    this.checkattribute.getResponse(url).subscribe(
      res => {
        this.clickedfeature = res;
        this.hightlight.checkFeature(this.clickedfeature, evt.coordinate, this.map);
      });
  };  //==onclick



  clearSelected() {
    this.hightlight.clearHighlight(this.map);
    this.map.removeLayer(this.sLayer);
    this.map.removeLayer(this.editLayer);
  }


  cariKoordinat() {
    this.cariLayer.openDialog();
  }


  openDialogCari() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      id: 1,
      title: 'Pencarian',
      article: 'the article'
    };
    const dialogRef = this.dialog.open(PencarianComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //console.log("Dialog closed")
      console.log('hasil lengkap', result);

      if (result.bujur && result.lintang) {
        this.zoomToLatLng(result.Y, result.X);
      } else if (result.xUTM && result.yUTM) {
        this.zoomToXY(result.xUTM, result.yUTM);
      }


    });
  }

  zoomToLatLng(lat, long) {
    //this.map.getView().setCenter(transform([long, lat],'EPSG:4326','EPSG:3857'));
    //console.log('lat', lat);
    //console.log('long', long);
    this.map.getView().setCenter(fromLonLat([Number(long), Number(lat)]));
    this.map.getView().setZoom(18);
    this.createMarkerPencarian(lat, long);
    this.warning.open('Tampilan diperbesar ke koordinat ' + lat + ',' + long );
  }

  zoomToXY(X, Y) {
    var UTM49S = 'EPSG:32749';
    proj4.defs(UTM49S, '+proj=utm +zone=49 +south +datum=WGS84 +units=m +no_defs');
    register(proj4);
    if (!get(UTM49S)) {
      console.error("Failed to register projection in OpenLayers");
    } else {
      console.log(get(UTM49S));
    }
    var newUTMProj = get(UTM49S);
    var fromLonLat = getTransform('EPSG:4326', UTM49S);
    var extent = applyTransform(
      [0.0, 108.0, -80.0, 114.0], fromLonLat);
    newUTMProj.setExtent(extent);
    var result = transform([parseFloat(X), parseFloat(Y)], newUTMProj, 'EPSG:4326');
    this.zoomToLatLng(result[1], result[0]);
  }

  createMarkerPencarian(lat, long) {
    this.showMarker = true;
    var pos = fromLonLat([parseFloat(long), parseFloat(lat)]);
    var mark = new Overlay({
      position: pos,
      element: document.getElementById('location-marker')
    });
    this.map.addOverlay(mark);
  }


  openModal(list) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Jenis Kegiatan',
      article: 'the article',
      list: list
    };
    const dialogRef = this.dialog.open(CekizinComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //console.log("Dialog closed")
      console.log(result)
    });
  }






}
