import { SidenavService } from 'src/app/service/sidenav.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';



import { MaterialModule } from '../material/material.module';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})

@NgModule({
  imports: [
    MaterialModule

  ]
})


export class MainViewComponent implements OnInit {
  
  @ViewChild('sidenav', {static: true}) public sidenav: MatSidenav;

  
  constructor(
    private sidenavService: SidenavService
  ) { }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
