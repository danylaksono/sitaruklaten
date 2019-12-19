import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { PDFJSStatic } from 'pdfjs-dist';
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

  dataSource: dataPDF[];

  pdfQuery = '';

  page: number = 1;
  nama: String;
  totalPages: number;
  isLoaded: boolean = false;
  showAll: boolean = true;
  src:String;
  zoomLevel:number = 1;

  
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
        nama: 'Perda No 11 Tahun 2014', 
        fileURL: '/assets/pdf/PERDA11TAHUN2011RTRWKLATEN.pdf' 
      }
    ];

    this.dataSource = ELEMENT_DATA;
    //console.log(this.dataSource);

  }


  ngOnInit() {
  }

  onChangeSelect(e){
    this.src = e.fileURL;
    this.nama = e.nama;
    console.log("file URL", this.src);
  }

  onError(error: any) {
    console.log(error);
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
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

  print(value){
    console.log(value);
  }



  /*
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

  */


}
