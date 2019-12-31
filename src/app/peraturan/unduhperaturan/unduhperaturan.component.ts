import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { PDFJSStatic } from 'pdfjs-dist';
import { PdfViewerComponent, PDFProgressData } from 'ng2-pdf-viewer';
//import { PdfViewerComponent } from 'ng2-pdf-viewer/ng2-pdf-viewer';
//PdfViewerComponent


export {
  PDFJSStatic,
  PDFDocumentProxy,
  PDFViewerParams,
  PDFPageProxy,
  PDFSource,
  PDFProgressData,
  PDFPromise
} from 'pdfjs-dist';


export interface dataPDF {
  nama: string;
  fileURL: any;
}



@Component({
  selector: 'app-unduhperaturan',
  templateUrl: './unduhperaturan.component.html',
  styleUrls: ['./unduhperaturan.component.scss']
})

@NgModule({
  imports: [
    MaterialModule
  ]
})


export class UnduhperaturanComponent implements OnInit {

  @ViewChild(PdfViewerComponent, { static: false }) private pdfComponent: PdfViewerComponent;

  dataSource: dataPDF[];

  pdfQuery = '';
  progressData: PDFProgressData;

  page: number = 1;
  nama: String;
  totalPages: number;
  isLoaded: boolean = false;
  showAll: boolean = true;
  src: String;
  zoomLevel: number = 1;
  loadPercentage: Number;
  percentLoad: number;



  constructor(
    //private pdfComponent: PdfViewerComponent,


  ) {
    const ELEMENT_DATA: dataPDF[] = [
      {
        nama: 'Perpres No. 70 Tahun 2014',
        fileURL: "/assets/pdf/PerpresNo70Th2014.pdf"
      },
      {
        nama: 'Lampiran I Perpres No 70 Tahun 2014',
        fileURL: '/assets/pdf/PerpresNo70Th2014LAMPIRAN-I.pdf'
      },
      {
        nama: 'Lampiran II Perpres No 70 Tahun 2014',
        fileURL: '/assets/pdf/PerpresNo70Th2014-LAMPIRAN-II.pdf'
      },
      {
        nama: 'Lampiran III Perpres No 70 Tahun 2014',
        fileURL: '/assets/pdf/PerpresNo70Th2014-LAMPIRAN-III.pdf'
      },
      {
        nama: 'Perda No 11 Tahun 2011',
        fileURL: '/assets/pdf/PERDA11TAHUN2011RTRWKLATEN.pdf' 
        //fileURL: 'http://geoportal.klatenkab.go.id/assets/pdf/PERDA11TAHUN2011RTRWKLATEN.pdf'
      }
    ];

    this.dataSource = ELEMENT_DATA;
    //console.log(this.dataSource);

  }


  ngOnInit() {
  }

  onChangeSelect(e) {
    this.src = e.fileURL;
    this.nama = e.nama;
    //console.log("file URL", this.src);
  }

  onError(error: any) {
    console.log(error);
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    //console.log('document loaded', pdfData)
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;

  }

  incrementZoom(amount: number) {
    console.log(amount);
    this.zoomLevel += amount;
  }

  onProgress(progressData: PDFProgressData) {

    this.progressData = progressData;
    //this.percentLoad = Math.floor(progressData.loaded / progressData.total * 100);
    //    this.isLoaded = progressData.loaded >= progressData.total;
    this.percentLoad = progressData.loaded / (1024*1024);
  
    /*
    console.log(
      "src", this.src,
      "loaded", progressData.loaded,
      "of total", progressData.total,
      "percent", this.percentLoad)
      */
     
  }


  print(value) {
    console.log(value);
  }




  searchQueryChanged(newQuery: string) {
    if (newQuery !== this.pdfQuery) {
      this.pdfQuery = newQuery;
      this.pdfComponent.pdfFindController.executeCommand('find', {
        query: this.pdfQuery,
        highlightAll: true
      });
    } else {
      this.pdfComponent.pdfFindController.executeCommand('findagain', {
        query: this.pdfQuery,
        highlightAll: true
      });
    }
  }




}
