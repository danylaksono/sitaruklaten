
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator'
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';


import { CookieService } from 'ngx-cookie-service';

import { MainViewComponent } from './main-view/main-view.component';
import { LandingComponent } from './landing/landing.component';
import { MapsComponent } from './maps/maps.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule } from "@angular/material";
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { CekizinComponent } from './dialog/cekizin/cekizin.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { YesnoComponent } from './dialog/yesno/yesno.component';
import { LayerattributeComponent } from './dialog/layerattribute/layerattribute.component';
import { DialogIntensitasComponent } from './dialog/dialog-intensitas/dialog-intensitas.component';
import { HalamanCetakComponent } from './dialog/halaman-cetak/halaman-cetak.component';
import { PeraturanComponent } from './peraturan/peraturan.component';
import { PencarianComponent } from './maps/pencarian/pencarian.component';



@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    LandingComponent,
    MapsComponent,
    NavComponent,
    HeaderComponent,
    SidenavListComponent,
    CekizinComponent,
    LoginComponent,
    SignUpComponent,
    YesnoComponent,
    LayerattributeComponent,
    DialogIntensitasComponent,
    HalamanCetakComponent,
    PeraturanComponent,
    PencarianComponent
    
    
    
  ],
  entryComponents: [
    CekizinComponent,
    YesnoComponent,
    LayerattributeComponent,
    DialogIntensitasComponent,
    PencarianComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatPaginatorModule,
    NgScrollbarModule
   

  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }