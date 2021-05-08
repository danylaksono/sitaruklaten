import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../service/sidenav.service';

@Component({
  selector: 'app-pengaduan',
  templateUrl: './pengaduan.component.html',
  styleUrls: ['./pengaduan.component.scss']
})
export class PengaduanComponent implements OnInit {

  @ViewChild('sidenav', {static: true}) public sidenav: MatSidenav;

  constructor(
    private sidenavService: SidenavService
  ) { }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
