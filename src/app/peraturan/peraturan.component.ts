import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../service/sidenav.service';

@Component({
  selector: 'app-peraturan',
  templateUrl: './peraturan.component.html',
  styleUrls: ['./peraturan.component.scss']
})
export class PeraturanComponent implements OnInit {

  @ViewChild('sidenav', {static: true}) public sidenav: MatSidenav;  

  constructor(
    private sidenavService: SidenavService
  ) { }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
