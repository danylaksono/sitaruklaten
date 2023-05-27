import { CekAduanComponent } from './cek-aduan/cek-aduan.component';



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components to route into
import { MainViewComponent } from './main-view/main-view.component';
import { LandingComponent } from './landing/landing.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { LoginComponent } from './Auth/login/login.component';
import { PeraturanComponent} from '../app/peraturan/peraturan.component';
import { PengaduanComponent } from './pengaduan/pengaduan.component';


const routes: Routes = [
  { 
    path: 'home', 
    component: MainViewComponent,
    children: [
     // { path: 'print', component: HalamanCetakComponent }
    ] // put children route here { path: '', component: LoginComponent },
  },
  { 
    path: 'peraturan', 
    component: PeraturanComponent
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'signup', 
    component: SignUpComponent
  },
  {
    path: 'pengaduan', 
    component: PengaduanComponent
  },
  {  
    path: 'cekaduan', 
    component: CekAduanComponent
  },
  { path: '', component: LandingComponent}
  //{ path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



//https://blog.angularindepth.com/angular-routing-reusing-common-layout-for-pages-from-different-modules-440a23f86b57