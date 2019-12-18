import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
//import { PdfViewerComponent } from 'ng2-pdf-viewer/ng2-pdf-viewer';
//PdfViewerComponent




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

  // modal dialog data
  modalTitle: string;
  modalArticle: string;
  modalList: string[];
  src:any;

  
  constructor(
    //private pdfComponent: PdfViewerComponent,


  ) {
    const ELEMENT_DATA: dataPDF[] = [
      { 
        nama: 'Perpres No. 70 Tahun 2014', 
        fileURL: '../../../assets/pdf/PerpresNo70Th2014.pdf'
      },
      { 
        nama: 'Lampiran I Perpres No 70 Tahun 2014', 
        fileURL: '../../../assets/pdf/PerpresNo70Th2014LAMPIRAN-I.pdf' 
      },
      { 
        nama: 'Lampiran II Perpres No 70 Tahun 2014', 
        fileURL: '../../../assets/pdf/PerpresNo70Th2014-LAMPIRAN-II.pdf' 
      },
      { 
        nama: 'Lampiran III Perpres No 70 Tahun 2014', 
        fileURL: '../../../assets/pdf/PerpresNo70Th2014-LAMPIRAN-III.pdf' 
      },
      { 
        nama: 'Perda No 11 Tahun 2014', 
        fileURL: '../../../assets/pdf/PERDA11TAHUN2011RTRWKLATEN.pdf' 
      }
    ];

    this.dataSource = ELEMENT_DATA;
    //console.log(this.dataSource);

  }


  ngOnInit() {
  }

  onChangeSelect(e){
    console.log("changed", e);
    this.src = e.fileURL;
  }

  onError(error: any) {
    console.log(error);
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
