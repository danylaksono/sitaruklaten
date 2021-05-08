import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../service/sidenav.service';

@Component({
  selector: 'app-cek-aduan',
  templateUrl: './cek-aduan.component.html',
  styleUrls: ['./cek-aduan.component.scss']
})
export class CekAduanComponent implements OnInit {

  @ViewChild('sidenav', {static: true}) public sidenav: MatSidenav;  
  
  constructor(
    private sidenavService: SidenavService
  ) { }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
