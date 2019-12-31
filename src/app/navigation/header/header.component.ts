import { YesnoComponent } from './../../dialog/yesno/yesno.component';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule, } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DisclaimerComponent } from 'src/app/disclaimer/disclaimer.component';
import { SidenavService } from 'src/app/service/sidenav.service';

import * as introJs from 'intro.js/intro.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule
  ]
})

export class HeaderComponent implements OnInit {

  isLoggedIn: Observable<boolean>;
  currentUser: String;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private cookie: CookieService,
    public dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private sidenav: SidenavService
  ) {
    this.isLoggedIn = auth.isLoggedIn();
  }


  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Log Out Admin',
      article: 'Keluar dari Mode Administrator?'

    };
    const dialogRef = this.dialog.open(YesnoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logOut();
        this.router.navigateByUrl('');
      }
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  //move to service on refactoring
  disclaimer() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Jenis Kegiatan',
      article: 'the article',
    };
    const dialogRef = this.dialog.open(DisclaimerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {

      //console.log("Dialog closed")
      //  console.log(result)
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  showHelp(){
    
    introJs()
    .onchange((element) => {  
      //console.log(element);
      switch(element.getAttribute("data-step")){
        case "1": this.sidenav.open(); break;
        case "2": this.sidenav.open(); break;
      }
  })
  .setOptions({
    exitOnOverlayClick: 'false',
    skipLabel: 'Lewati', nextLabel: 'Lanjut',  prevLabel: 'Sebelumnya', doneLabel: 'Selesai'

  })
  .start();

    
  }

  onClicked() {
    //console.log('clicked');
    this.sidenavToggle.emit();
  }

  logOut() {
    this.auth.logOut();

  }

  ngOnInit() {


  }


}

